import { Router } from "express";
import { getDatabase } from "../services/database.service.js";
import { parseLimit } from "./query-params.js";

export const machineRouter = Router();

// GET /api/machines - list all machines with latest sensor reading
machineRouter.get("/", async (_request, response, next) => {
  try {
    const db = getDatabase();
    const machines = await db.machine.findMany({
      orderBy: { code: "asc" },
      include: {
        sensorLogs: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });

    const result = machines.map((m) => {
      const latest = m.sensorLogs[0];
      return {
        id: m.id,
        code: m.code,
        name: m.name,
        location: m.location,
        type: m.type,
        status: m.status,
        healthScore: m.healthScore,
        lastSeenAt: m.lastSeenAt?.toISOString() ?? null,
        temperature: latest?.temperature ?? null,
        vibration: latest?.vibration ?? null,
        pressure: latest?.pressure ?? null,
        productionCount: latest?.productionCount ?? null,
        lastUpdated: latest?.createdAt.toISOString() ?? null
      };
    });

    response.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/machines/:id - single machine with recent sensor logs
machineRouter.get("/:id", async (request, response, next) => {
  try {
    const db = getDatabase();
    const machine = await db.machine.findUnique({
      where: { id: request.params.id },
      include: {
        sensorLogs: {
          orderBy: { createdAt: "desc" },
          take: 20
        }
      }
    });

    if (!machine) {
      response.status(404).json({ error: "Machine not found" });
      return;
    }

    response.json({
      id: machine.id,
      code: machine.code,
      name: machine.name,
      location: machine.location,
      type: machine.type,
      status: machine.status,
      healthScore: machine.healthScore,
      lastSeenAt: machine.lastSeenAt?.toISOString() ?? null,
      createdAt: machine.createdAt.toISOString(),
      updatedAt: machine.updatedAt.toISOString(),
      sensorLogs: machine.sensorLogs.map((log) => ({
        id: log.id,
        temperature: log.temperature,
        vibration: log.vibration,
        pressure: log.pressure,
        productionCount: log.productionCount,
        status: log.status,
        createdAt: log.createdAt.toISOString()
      }))
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/machines/:id/sensor-logs - paginated sensor log history
machineRouter.get("/:id/sensor-logs", async (request, response, next) => {
  try {
    const db = getDatabase();
    const machineId = request.params.id;
    const limit = parseLimit(request.query.limit);
    const cursor = request.query.cursor as string | undefined;

    const machine = await db.machine.findUnique({ where: { id: machineId } });
    if (!machine) {
      response.status(404).json({ error: "Machine not found" });
      return;
    }

    const logs = await db.sensorLog.findMany({
      where: { machineId },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {})
    });

    const hasMore = logs.length > limit;
    const items = hasMore ? logs.slice(0, limit) : logs;

    response.json({
      items: items.map((log) => ({
        id: log.id,
        machineId: log.machineId,
        temperature: log.temperature,
        vibration: log.vibration,
        pressure: log.pressure,
        productionCount: log.productionCount,
        status: log.status,
        createdAt: log.createdAt.toISOString()
      })),
      nextCursor: hasMore ? items[items.length - 1].id : null
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/machines/:id/alerts - alerts for a specific machine
machineRouter.get("/:id/alerts", async (request, response, next) => {
  try {
    const db = getDatabase();
    const machineId = request.params.id;
    const limit = parseLimit(request.query.limit);

    const machine = await db.machine.findUnique({ where: { id: machineId } });
    if (!machine) {
      response.status(404).json({ error: "Machine not found" });
      return;
    }

    const alerts = await db.alert.findMany({
      where: { machineId },
      orderBy: { createdAt: "desc" },
      take: limit
    });

    response.json(
      alerts.map((a) => ({
        id: a.id,
        machineId: a.machineId,
        sensorLogId: a.sensorLogId,
        severity: a.severity,
        title: a.title,
        message: a.message,
        isResolved: a.isResolved,
        resolvedAt: a.resolvedAt?.toISOString() ?? null,
        createdAt: a.createdAt.toISOString()
      }))
    );
  } catch (error) {
    next(error);
  }
});
