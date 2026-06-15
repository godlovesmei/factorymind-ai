import { z } from "zod";

export const machineStatuses = [
  "NORMAL",
  "WARNING",
  "CRITICAL",
  "DOWNTIME",
  "MAINTENANCE"
] as const;

export type MachineStatus = (typeof machineStatuses)[number];

export const machineStatusSchema = z.enum(machineStatuses);

export type MachineSummary = {
  id: string;
  code: string;
  name: string;
  location: string;
  type: string;
  status: MachineStatus;
  healthScore: number;
  lastSeenAt: string | null;
};

export type MachineDetail = MachineSummary & {
  createdAt: string;
  updatedAt: string;
};

export type SensorLogEntry = {
  id: string;
  machineId: string;
  temperature: number;
  vibration: number;
  pressure: number;
  productionCount: number;
  status: MachineStatus;
  createdAt: string;
};

export const sensorLogPayloadSchema = z.object({
  machineId: z.string().min(1),
  temperature: z.number().finite(),
  vibration: z.number().finite(),
  pressure: z.number().finite(),
  productionCount: z.number().int().nonnegative(),
  status: machineStatusSchema.optional(),
  timestamp: z.string().datetime().optional()
});

export type SensorLogPayload = z.infer<typeof sensorLogPayloadSchema>;
