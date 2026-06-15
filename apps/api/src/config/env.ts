import "dotenv/config";

const fallbackPort = 4000;

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  demoMode: process.env.DEMO_MODE !== "false",
  port: Number(process.env.API_PORT ?? fallbackPort),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  databaseUrl:
    process.env.DATABASE_URL ??
    "mysql://factorymind:factorymind@localhost:3306/factorymind"
};
