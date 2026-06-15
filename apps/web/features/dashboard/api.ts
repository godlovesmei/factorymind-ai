import { api } from "@/lib/api";
import type { DashboardSummary } from "@factorymind/shared";
import {
  dashboardMachines as fallbackMachines,
  dashboardAlerts as fallbackAlerts,
  sensorTrend as fallbackTrend
} from "./data";

export type DashboardSummaryResult = DashboardSummary & {
  source: "live" | "fallback";
  error?: string;
};

export async function fetchDashboardSummary(): Promise<DashboardSummaryResult> {
  try {
    const summary = await api.get<DashboardSummary>("/api/dashboard/summary");
    return {
      ...summary,
      source: "live"
    };
  } catch (error) {
    console.warn("Failed to fetch dashboard summary, using fallback data:", error);
    const message = error instanceof Error ? error.message : "Unknown API error";

    // Return fallback static data when API is unavailable
    return {
      totalMachines: fallbackMachines.length,
      runningMachines: fallbackMachines.filter(
        (m) => m.status !== "DOWNTIME" && m.status !== "MAINTENANCE"
      ).length,
      warningMachines: fallbackMachines.filter((m) => m.status === "WARNING").length,
      criticalMachines: fallbackMachines.filter((m) => m.status === "CRITICAL").length,
      downtimeMachines: fallbackMachines.filter((m) => m.status === "DOWNTIME").length,
      totalProduction: fallbackMachines.reduce((sum, m) => sum + m.productionCount, 0),
      machines: fallbackMachines,
      alerts: fallbackAlerts.map((a) => ({
        id: a.id,
        machineId: a.machineCode,
        sensorLogId: null,
        severity: a.severity,
        title: a.title,
        message: a.message,
        isResolved: false,
        resolvedAt: null,
        createdAt: a.createdAt,
        machine: { code: a.machineCode, name: a.machineName }
      })),
      sensorTrend: fallbackTrend,
      source: "fallback",
      error: message
    };
  }
}
