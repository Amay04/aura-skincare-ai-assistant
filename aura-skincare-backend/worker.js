import { httpServerHandler } from "cloudflare:node";
import "./server.js";

export default httpServerHandler({ port: 5000 });