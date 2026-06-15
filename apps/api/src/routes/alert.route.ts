import { Router } from "express";
import { getDatabase } from "../services/database.service.js";
import { parseLimit } from "./query-params.js";

export const alertRouter = Router();

// GET /api/alerts - list alerts with severity/resolved filter
alertRouter.get("/", async (request, response, next) => {
  try {
    const db = getDatabase();
    const limit = parseLimit(request.query.limit);
    const severity = request.query.severity as string | undefined;
    const isResolved = request.query.isResolved as string | undefined;

    const where: Record<string, unknown> = {};
    if (severity) where.severity = severity;
    if (isResolved !== undefined) where.isResolved = isResolved === "true";

    const alerts = await db.alert.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        machine: { select: { code: true, name: true } }
      }
    });

    response.json(
      alerts.map((a) => ({
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
        createdAt: a.createdAt.toISOString()
      }))
    );
  } catch (error) {
    next(error);
  }
});

// GET /api/alerts/:id - single alert
alertRouter.get("/:id", async (request, response, next) => {
  try {
    const db = getDatabase();
    const alert = await db.alert.findUnique({
      where: { id: request.params.id },
      include: {
        machine: { select: { code: true, name: true } }
      }
    });

    if (!alert) {
      response.status(404).json({ error: "Alert not found" });
      return;
    }

    response.json({
      id: alert.id,
      machineId: alert.machineId,
      machineCode: alert.machine.code,
      machineName: alert.machine.name,
      sensorLogId: alert.sensorLogId,
      severity: alert.severity,
      title: alert.title,
      message: alert.message,
      isResolved: alert.isResolved,
      resolvedAt: alert.resolvedAt?.toISOString() ?? null,
      createdAt: alert.createdAt.toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/alerts/:id/resolve - mark alert as resolved
alertRouter.patch("/:id/resolve", async (request, response, next) => {
  try {
    const db = getDatabase();
    const alert = await db.alert.findUnique({
      where: { id: request.params.id }
    });

    if (!alert) {
      response.status(404).json({ error: "Alert not found" });
      return;
    }

    if (alert.isResolved) {
      response.json({
        id: alert.id,
        isResolved: true,
        resolvedAt: alert.resolvedAt?.toISOString() ?? null,
        message: "Alert was already resolved"
      });
      return;
    }

    const updated = await db.alert.update({
      where: { id: request.params.id },
      data: {
        isResolved: true,
        resolvedAt: new Date()
      }
    });

    response.json({
      id: updated.id,
      isResolved: updated.isResolved,
      resolvedAt: updated.resolvedAt?.toISOString() ?? null
    });
  } catch (error) {
    next(error);
  }
});
