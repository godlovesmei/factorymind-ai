import { Router } from "express";
import { sensorLogPayloadSchema } from "@factorymind/shared";
import { MachineStatus as PrismaMachineStatus } from "@factorymind/database";
import { getDatabase } from "../services/database.service.js";
import { parseLimit } from "./query-params.js";

export const sensorLogRouter = Router();

// GET /api/sensor-logs - paginated list with machine filter
sensorLogRouter.get("/", async (request, response, next) => {
  try {
    const db = getDatabase();
    const limit = parseLimit(request.query.limit);
    const cursor = request.query.cursor as string | undefined;
    const machineId = request.query.machineId as string | undefined;

    const logs = await db.sensorLog.findMany({
      where: machineId ? { machineId } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      include: {
        machine: { select: { code: true, name: true } }
      }
    });

    const hasMore = logs.length > limit;
    const items = hasMore ? logs.slice(0, limit) : logs;

    response.json({
      items: items.map((log) => ({
        id: log.id,
        machineId: log.machineId,
        machineCode: log.machine.code,
        machineName: log.machine.name,
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

// GET /api/sensor-logs/latest - latest reading per machine
sensorLogRouter.get("/latest", async (_request, response, next) => {
  try {
    const db = getDatabase();

    // Get all machines with their latest sensor log
    const machines = await db.machine.findMany({
      include: {
        sensorLogs: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });

    const result = machines
      .filter((m) => m.sensorLogs.length > 0)
      .map((m) => {
        const log = m.sensorLogs[0];
        return {
          id: log.id,
          machineId: log.machineId,
          machineCode: m.code,
          machineName: m.name,
          temperature: log.temperature,
          vibration: log.vibration,
          pressure: log.pressure,
          productionCount: log.productionCount,
          status: log.status,
          createdAt: log.createdAt.toISOString()
        };
      });

    response.json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/sensor-logs - accept sensor data, validate, save, update machine
sensorLogRouter.post("/", async (request, response, next) => {
  try {
    const db = getDatabase();
    const payload = sensorLogPayloadSchema.parse(request.body);

    // Accept either the database id or the public machine code from MQTT/API examples.
    const machine = await db.machine.findFirst({
      where: {
        OR: [{ id: payload.machineId }, { code: payload.machineId }]
      }
    });

    if (!machine) {
      response.status(404).json({ error: "Machine not found" });
      return;
    }

    // Determine status from thresholds if not provided
    const status: PrismaMachineStatus = payload.status
      ? PrismaMachineStatus[payload.status as keyof typeof PrismaMachineStatus]
      : deriveStatus(payload.temperature, payload.vibration);

    // Create sensor log
    const log = await db.sensorLog.create({
      data: {
        machineId: machine.id,
        temperature: payload.temperature,
        vibration: payload.vibration,
        pressure: payload.pressure,
        productionCount: payload.productionCount,
        status,
        createdAt: payload.timestamp ? new Date(payload.timestamp) : new Date()
      }
    });

    // Update machine lastSeenAt and status
    const healthScore = deriveHealthScore(payload.temperature, payload.vibration);
    await db.machine.update({
      where: { id: machine.id },
      data: {
        lastSeenAt: log.createdAt,
        status,
        healthScore
      }
    });

    // Check for alert conditions
    const alert = await checkAndCreateAlert(
      db,
      machine.id,
      log.id,
      payload.temperature,
      payload.vibration
    );

    response.status(201).json({
      id: log.id,
      machineId: log.machineId,
      machineCode: machine.code,
      temperature: log.temperature,
      vibration: log.vibration,
      pressure: log.pressure,
      productionCount: log.productionCount,
      status: log.status,
      createdAt: log.createdAt.toISOString(),
      alert: alert
        ? {
            id: alert.id,
            severity: alert.severity,
            title: alert.title
          }
        : null
    });
  } catch (error) {
    next(error);
  }
});

// Helpers

function deriveStatus(temperature: number, vibration: number): PrismaMachineStatus {
  if (temperature > 85 && vibration > 5) return PrismaMachineStatus.CRITICAL;
  if (temperature > 78 || vibration > 4) return PrismaMachineStatus.WARNING;
  return PrismaMachineStatus.NORMAL;
}

function deriveHealthScore(temperature: number, vibration: number): number {
  let score = 100;
  if (temperature > 85) score -= 30;
  else if (temperature > 78) score -= 15;
  if (vibration > 5) score -= 30;
  else if (vibration > 4) score -= 15;
  return Math.max(0, Math.min(100, score));
}

async function checkAndCreateAlert(
  db: ReturnType<typeof getDatabase>,
  machineId: string,
  sensorLogId: string,
  temperature: number,
  vibration: number
) {
  let severity: "WARNING" | "CRITICAL" | null = null;
  let title = "";
  let message = "";

  if (temperature > 85 && vibration > 5) {
    severity = "CRITICAL";
    title = "Temperature and vibration exceeded limit";
    message = "Immediate inspection required. Check bearing and cooling system.";
  } else if (temperature > 78 && vibration > 4) {
    severity = "WARNING";
    title = "Elevated temperature and vibration";
    message = "Monitor closely for the next 30 minutes.";
  } else if (temperature > 85) {
    severity = "WARNING";
    title = "High temperature detected";
    message = `Temperature ${temperature} deg C exceeds safe threshold.`;
  } else if (vibration > 5) {
    severity = "WARNING";
    title = "High vibration detected";
    message = `Vibration ${vibration} mm/s exceeds safe threshold.`;
  }

  if (!severity) return null;

  return db.alert.create({
    data: {
      machineId,
      sensorLogId,
      severity,
      title,
      message,
      isResolved: false
    }
  });
}
