import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.route.js";

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
      milestone: "project-setup"
    });
  });

  app.use("/health", healthRouter);
  app.use("/api/health", healthRouter);

  return app;
}
