export const machineStatuses = [
  "NORMAL",
  "WARNING",
  "CRITICAL",
  "DOWNTIME",
  "MAINTENANCE"
] as const;

export type MachineStatus = (typeof machineStatuses)[number];

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
