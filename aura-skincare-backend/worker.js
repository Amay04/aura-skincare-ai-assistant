
import { httpServerHandler } from "cloudflare:node";
import express from "express";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes";
import policyRoutes from "./routes/policyRoutes";
import conversationRoutes from "./routes/conversationRoutes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aura-skincare-ai-assistant.pages.dev",
    ],
  })
);

app.use(express.json());

app.use("/api/conversation", conversationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/policies", policyRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Aura Skincare backend is running!",
  });
});

const server = app.listen(3000);

export default httpServerHandler({ port: 3000 });
