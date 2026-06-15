import { PrismaClient, MachineStatus, AlertSeverity } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FactoryMind database...");

  // Upsert machines

  const machine1 = await prisma.machine.upsert({
    where: { code: "MCH-001" },
    update: {},
    create: {
      code: "MCH-001",
      name: "Conveyor Line",
      location: "Assembly Hall A",
      type: "Material Handling",
      status: MachineStatus.NORMAL,
      healthScore: 96,
      lastSeenAt: new Date()
    }
  });

  const machine2 = await prisma.machine.upsert({
    where: { code: "MCH-002" },
    update: {},
    create: {
      code: "MCH-002",
      name: "CNC Machine",
      location: "Machining Cell B",
      type: "Precision Cutting",
      status: MachineStatus.WARNING,
      healthScore: 78,
      lastSeenAt: new Date()
    }
  });

  const machine3 = await prisma.machine.upsert({
    where: { code: "MCH-003" },
    update: {},
    create: {
      code: "MCH-003",
      name: "Packaging Machine",
      location: "Packaging Line C",
      type: "Final Packaging",
      status: MachineStatus.CRITICAL,
      healthScore: 52,
      lastSeenAt: new Date()
    }
  });

  console.log("Created machines:", machine1.code, machine2.code, machine3.code);

  // Sensor logs (last 7 intervals, 15 min apart)

  const now = new Date();
  const intervals = 7;

  const sensorData = [
    { time: 0, temp: 71, vib: 2.1, press: 100, prod: 1200, status: MachineStatus.NORMAL },
    { time: 1, temp: 73, vib: 2.3, press: 101, prod: 1220, status: MachineStatus.NORMAL },
    { time: 2, temp: 76, vib: 3.1, press: 101, prod: 1240, status: MachineStatus.NORMAL },
    { time: 3, temp: 79, vib: 3.9, press: 102, prod: 1250, status: MachineStatus.NORMAL },
    { time: 4, temp: 83, vib: 4.7, press: 103, prod: 1260, status: MachineStatus.WARNING },
    { time: 5, temp: 87, vib: 5.4, press: 106, prod: 1270, status: MachineStatus.WARNING },
    { time: 6, temp: 91, vib: 6.1, press: 109, prod: 1280, status: MachineStatus.CRITICAL }
  ];

  // Delete old sensor logs for clean seeding
  await prisma.sensorLog.deleteMany({
    where: { machineId: { in: [machine1.id, machine2.id, machine3.id] } }
  });

  const createdLogs = [];
  for (let i = 0; i < intervals; i++) {
    const data = sensorData[i];
    const createdAt = new Date(now.getTime() - (intervals - 1 - i) * 15 * 60 * 1000);

    // Machine 1: normal readings
    const log1 = await prisma.sensorLog.create({
      data: {
        machineId: machine1.id,
        temperature: data.temp - 2 + Math.random() * 2,
        vibration: Math.max(0.5, data.vib - 1.5 + Math.random() * 0.5),
        pressure: data.press - 1 + Math.random(),
        productionCount: Math.round(data.prod * 0.9 + Math.random() * 50),
        status: MachineStatus.NORMAL,
        createdAt
      }
    });

    // Machine 2: warning trend
    const log2 = await prisma.sensorLog.create({
      data: {
        machineId: machine2.id,
        temperature: data.temp + 4 + Math.random() * 3,
        vibration: data.vib + 0.5 + Math.random() * 0.8,
        pressure: data.press + 1 + Math.random() * 1.5,
        productionCount: Math.round(data.prod * 0.7 + Math.random() * 30),
        status: i >= 4 ? MachineStatus.WARNING : MachineStatus.NORMAL,
        createdAt
      }
    });

    // Machine 3: critical readings
    const log3 = await prisma.sensorLog.create({
      data: {
        machineId: machine3.id,
        temperature: data.temp + 12 + Math.random() * 5,
        vibration: data.vib + 2 + Math.random() * 1.5,
        pressure: data.press + 5 + Math.random() * 3,
        productionCount: Math.round(data.prod * 0.5 + Math.random() * 20),
        status: i >= 4 ? MachineStatus.CRITICAL : (i >= 2 ? MachineStatus.WARNING : MachineStatus.NORMAL),
        createdAt
      }
    });

    createdLogs.push(log1, log2, log3);
  }

  console.log(`Created ${createdLogs.length} sensor log entries`);

  // Alerts

  // Delete old alerts
  await prisma.alert.deleteMany({
    where: { machineId: { in: [machine1.id, machine2.id, machine3.id] } }
  });

  const alert1 = await prisma.alert.create({
    data: {
      machineId: machine3.id,
      severity: AlertSeverity.CRITICAL,
      title: "Temperature and vibration exceeded limit",
      message: "Inspect motor bearing and cooling airflow before next batch.",
      isResolved: false,
      createdAt: new Date(now.getTime() - 2 * 60 * 1000)
    }
  });

  const alert2 = await prisma.alert.create({
    data: {
      machineId: machine2.id,
      severity: AlertSeverity.WARNING,
      title: "Vibration above baseline",
      message: "Monitor spindle vibration trend for the next 30 minutes.",
      isResolved: false,
      createdAt: new Date(now.getTime() - 7 * 60 * 1000)
    }
  });

  const alert3 = await prisma.alert.create({
    data: {
      machineId: machine2.id,
      severity: AlertSeverity.WARNING,
      title: "Temperature drift detected",
      message: "Average temperature increased by 12% over the last hour.",
      isResolved: false,
      createdAt: new Date(now.getTime() - 26 * 60 * 1000)
    }
  });

  console.log("Created alerts:", alert1.id, alert2.id, alert3.id);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
