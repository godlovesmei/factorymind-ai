import { z } from "zod";

export const alertSeverities = ["WARNING", "CRITICAL"] as const;

export type AlertSeverity = (typeof alertSeverities)[number];

export const alertSeveritySchema = z.enum(alertSeverities);

export type AlertEntry = {
  id: string;
  machineId: string;
  machineCode?: string;
  machineName?: string;
  sensorLogId: string | null;
  severity: AlertSeverity;
  title: string;
  message: string;
  isResolved: boolean;
  resolvedAt: string | null;
  createdAt: string;
  machine?: {
    code: string;
    name: string;
  };
};

export const createAlertSchema = z.object({
  machineId: z.string().min(1),
  sensorLogId: z.string().optional(),
  severity: alertSeveritySchema,
  title: z.string().min(1),
  message: z.string().min(1)
});

export const resolveAlertSchema = z.object({
  isResolved: z.literal(true).optional().default(true)
});

export type CreateAlertInput = z.infer<typeof createAlertSchema>;
