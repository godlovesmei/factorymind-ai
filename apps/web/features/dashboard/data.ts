import type { MachineStatus, AlertSeverity } from "@factorymind/shared";

// Static fallback data used when API is unavailable (demo/offline mode)

export type FallbackMachine = {
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

export type FallbackAlert = {
  id: string;
  machineCode: string;
  machineName: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  createdAt: string;
};

export const dashboardMachines: FallbackMachine[] = [
  {
    id: "machine-1",
    code: "MCH-001",
    name: "Conveyor Line",
    type: "Material Handling",
    location: "Assembly Hall A",
    status: "NORMAL",
    healthScore: 96,
    temperature: 72.5,
    vibration: 2.3,
    pressure: 101.4,
    productionCount: 1280,
    lastUpdated: "10:24"
  },
  {
    id: "machine-2",
    code: "MCH-002",
    name: "CNC Machine",
    type: "Precision Cutting",
    location: "Machining Cell B",
    status: "WARNING",
    healthScore: 78,
    temperature: 84.9,
    vibration: 4.8,
    pressure: 103.1,
    productionCount: 912,
    lastUpdated: "10:23"
  },
  {
    id: "machine-3",
    code: "MCH-003",
    name: "Packaging Machine",
    type: "Final Packaging",
    location: "Packaging Line C",
    status: "CRITICAL",
    healthScore: 52,
    temperature: 91.2,
    vibration: 6.1,
    pressure: 108.7,
    productionCount: 645,
    lastUpdated: "10:22"
  }
];

export const sensorTrend = [
  { time: "09:00", temperature: 71, vibration: 2.1, pressure: 100 },
  { time: "09:15", temperature: 73, vibration: 2.3, pressure: 101 },
  { time: "09:30", temperature: 76, vibration: 3.1, pressure: 101 },
  { time: "09:45", temperature: 79, vibration: 3.9, pressure: 102 },
  { time: "10:00", temperature: 83, vibration: 4.7, pressure: 103 },
  { time: "10:15", temperature: 87, vibration: 5.4, pressure: 106 },
  { time: "10:30", temperature: 91, vibration: 6.1, pressure: 109 }
];

export const dashboardAlerts: FallbackAlert[] = [
  {
    id: "ALT-1024",
    machineCode: "MCH-003",
    machineName: "Packaging Machine",
    severity: "CRITICAL",
    title: "Temperature and vibration exceeded limit",
    message: "Inspect motor bearing and cooling airflow before next batch.",
    createdAt: "10:22"
  },
  {
    id: "ALT-1023",
    machineCode: "MCH-002",
    machineName: "CNC Machine",
    severity: "WARNING",
    title: "Vibration above baseline",
    message: "Monitor spindle vibration trend for the next 30 minutes.",
    createdAt: "10:17"
  },
  {
    id: "ALT-1022",
    machineCode: "MCH-002",
    machineName: "CNC Machine",
    severity: "WARNING",
    title: "Temperature drift detected",
    message: "Average temperature increased by 12% over the last hour.",
    createdAt: "09:58"
  }
];

export const aiInsight = {
  title: "Machine C needs immediate review",
  summary:
    "The packaging machine shows a combined rise in temperature and vibration. Prioritize bearing inspection and keep production on a reduced load until maintenance confirms the issue.",
  confidence: "High confidence mock insight"
};
