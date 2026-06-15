import { z } from "zod";

export const maintenanceTicketStatuses = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED"
] as const;

export const maintenancePriorities = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL"
] as const;

export type MaintenanceTicketStatus =
  (typeof maintenanceTicketStatuses)[number];

export type MaintenancePriority = (typeof maintenancePriorities)[number];

export const maintenanceTicketStatusSchema = z.enum(maintenanceTicketStatuses);
export const maintenancePrioritySchema = z.enum(maintenancePriorities);

export type MaintenanceTicketEntry = {
  id: string;
  machineId: string;
  alertId: string | null;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceTicketStatus;
  assignedTo: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
};
