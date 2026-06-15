import { Router } from "express";
import { env } from "../config/env.js";

export const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  response.json({
    status: "ok",
    service: "factorymind-api",
    demoMode: env.demoMode,
    timestamp: new Date().toISOString()
  });
});
