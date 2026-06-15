import { createServer } from "node:http";
import { env } from "./config/env.js";
import { createApp } from "./server.js";

const app = createApp();
const server = createServer(app);

server.listen(env.port, () => {
  console.log(`FactoryMind API listening on http://localhost:${env.port}`);
});
