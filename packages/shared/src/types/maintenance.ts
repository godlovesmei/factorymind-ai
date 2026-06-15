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
