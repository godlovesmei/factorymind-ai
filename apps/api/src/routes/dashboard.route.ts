import { Router } from "express";
import { getDatabase } from "../services/database.service.js";

export const dashboardRouter = Router();

// GET /api/dashboard/summary - aggregated dashboard data
dashboardRouter.get("/summary", async (_request, response, next) => {
  try {
    const db = getDatabase();

    // Get all machines with latest sensor log
    const machines = await db.machine.findMany({
      orderBy: { code: "asc" },
      include: {
        sensorLogs: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });

    // Get unresolved alerts (most recent 10) with machine info
    const alerts = await db.alert.findMany({
      where: { isResolved: false },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        machine: { select: { code: true, name: true } }
      }
    });

    // Get sensor trend: average readings per time bucket (last 7 intervals)
    const recentLogs = await db.sensorLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 21 // 3 machines x 7 intervals
    });

    // Group by time bucket (round to 15 min intervals) and average
    const trendMap = new Map<
      string,
      { temp: number[]; vib: number[]; press: number[] }
    >();

    for (const log of recentLogs) {
      const time = log.createdAt;
      const bucket = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        time.getHours(),
        Math.floor(time.getMinutes() / 15) * 15,
        0
      );
      const key = bucket.toISOString();

      if (!trendMap.has(key)) {
        trendMap.set(key, { temp: [], vib: [], press: [] });
      }
      const entry = trendMap.get(key)!;
      entry.temp.push(log.temperature);
      entry.vib.push(log.vibration);
      entry.press.push(log.pressure);
    }

    const sensorTrend = Array.from(trendMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, data]) => ({
        time: new Date(time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }),
        temperature: Math.round(
          (data.temp.reduce((a, b) => a + b, 0) / data.temp.length) * 10
        ) / 10,
        vibration: Math.round(
          (data.vib.reduce((a, b) => a + b, 0) / data.vib.length) * 10
        ) / 10,
        pressure: Math.round(
          (data.press.reduce((a, b) => a + b, 0) / data.press.length) * 10
        ) / 10
      }));

    // Calculate counts
    const totalMachines = machines.length;
    const runningMachines = machines.filter(
      (m) => m.status !== "DOWNTIME" && m.status !== "MAINTENANCE"
    ).length;
    const warningMachines = machines.filter((m) => m.status === "WARNING").length;
    const criticalMachines = machines.filter((m) => m.status === "CRITICAL").length;
    const downtimeMachines = machines.filter((m) => m.status === "DOWNTIME").length;

    // Total production from latest readings
    const totalProduction = machines.reduce((sum, m) => {
      const latest = m.sensorLogs[0];
      return sum + (latest?.productionCount ?? 0);
    }, 0);

    // Format machines for dashboard
    const dashboardMachines = machines.map((m) => {
      const latest = m.sensorLogs[0];
      return {
        id: m.id,
        code: m.code,
        name: m.name,
        type: m.type,
        location: m.location,
        status: m.status,
        healthScore: m.healthScore,
        temperature: latest?.temperature ?? 0,
        vibration: latest?.vibration ?? 0,
        pressure: latest?.pressure ?? 0,
        productionCount: latest?.productionCount ?? 0,
        lastUpdated: latest?.createdAt
          ? latest.createdAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            })
          : "N/A"
      };
    });

    // Format alerts for dashboard
    const dashboardAlerts = alerts.map((a) => ({
      id: a.id,
      machineId: a.machineId,
      machineCode: a.machine.code,
      machineName: a.machine.name,
      sensorLogId: a.sensorLogId,
      severity: a.severity,
      title: a.title,
      message: a.message,
      isResolved: a.isResolved,
      resolvedAt: a.resolvedAt?.toISOString() ?? null,
      createdAt: a.createdAt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })
    }));

    response.json({
      totalMachines,
      runningMachines,
      warningMachines,
      criticalMachines,
      downtimeMachines,
      totalProduction,
      machines: dashboardMachines,
      alerts: dashboardAlerts,
      sensorTrend
    });
  } catch (error) {
    next(error);
  }
});
