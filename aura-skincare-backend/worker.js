import { env } from "cloudflare:workers";
import { httpServerHandler } from "cloudflare:node";
import "./server.js";

function syncEnv() {
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === "string") {
      process.env[key] = value;
    }
  }
}

syncEnv();

const handler = httpServerHandler({ port: 5000 });

export default {
  fetch(request, e, ctx) {
    syncEnv();
    return handler.fetch(request, e, ctx);
  },
};
