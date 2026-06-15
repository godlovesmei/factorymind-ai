import { createServer } from "node:http";
import { env } from "./config/env.js";
import { createApp } from "./server.js";
import { disconnectDatabase } from "./services/database.service.js";

const app = createApp();
const server = createServer(app);

server.listen(env.port, () => {
  console.log(`FactoryMind API listening on http://localhost:${env.port}`);
});

async function shutdown() {
  console.log("Shutting down...");
  server.close();
  await disconnectDatabase();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
