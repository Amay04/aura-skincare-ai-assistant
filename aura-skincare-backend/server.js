const express = require("express");
const cors = require("cors");
require("dotenv").config();


const orderRoutes = require("./routes/orderRoutes");
const policyRoutes = require("./routes/policyRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aura-skincare-ai-assistant.pages.dev",
    ],
  })
);

// Middleware

app.use(express.json());
app.use("/api/conversation", conversationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/policies", policyRoutes);
// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Aura Skincare backend is running!",
  });
});
const { getAriaResponse } = require("./services/aiServices");

app.get("/api/debug", async (req, res) => {
  try {
    const result = await getAriaResponse("What is your shipping policy?");
    res.json({ ok: true, result });
  } catch (e) {
    res.status(500).json({
      ok: false,
      name: e.name,
      message: e.message,
      status: e.status,
      keyPresent: Boolean(process.env.GEMINI_API_KEY),
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Aura backend running at http://localhost:${PORT}`);
});
