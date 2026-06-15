import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.route.js";
import { machineRouter } from "./routes/machine.route.js";
import { sensorLogRouter } from "./routes/sensor-log.route.js";
import { alertRouter } from "./routes/alert.route.js";
import { dashboardRouter } from "./routes/dashboard.route.js";
import { errorHandler } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true
    })
  );
  app.use(express.json());

  app.get("/", (_request, response) => {
    response.json({
      name: "FactoryMind AI API",
      status: "ok",
      milestone: "backend-database"
    });
  });

  app.use("/health", healthRouter);
  app.use("/api/health", healthRouter);

  app.use("/api/machines", machineRouter);
  app.use("/api/sensor-logs", sensorLogRouter);
  app.use("/api/alerts", alertRouter);
  app.use("/api/dashboard", dashboardRouter);

  app.use(errorHandler);

  return app;
}
