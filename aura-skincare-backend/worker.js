import { httpServerHandler } from "cloudflare:node";
import "./server.js";

const handler = httpServerHandler({ port: 5000 });

export default {
  fetch(request, env, ctx) {
    
    for (const [key, value] of Object.entries(env)) {
      if (typeof value === "string") {
        process.env[key] = value;
      }
    }
    return handler.fetch(request, env, ctx);
  },
};
