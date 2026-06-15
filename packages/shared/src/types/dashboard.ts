import type { MachineStatus } from "./machine.js";
import type { AlertEntry } from "./alert.js";

export type DashboardMachine = {
  id: string;
  code: string;
  name: string;
  type: string;
  location: string;
  status: MachineStatus;
  healthScore: number;
  temperature: number;
  vibration: number;
  pressure: number;
  productionCount: number;
  lastUpdated: string;
};

export type SensorTrendPoint = {
  time: string;
  temperature: number;
  vibration: number;
  pressure: number;
};

export type DashboardSummary = {
  totalMachines: number;
  runningMachines: number;
  warningMachines: number;
  criticalMachines: number;
  downtimeMachines: number;
  totalProduction: number;
  machines: DashboardMachine[];
  alerts: AlertEntry[];
  sensorTrend: SensorTrendPoint[];
};
