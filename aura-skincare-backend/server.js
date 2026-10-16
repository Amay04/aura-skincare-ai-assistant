const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const policyRoutes = require("./routes/policyRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const { getAriaResponse } = require("./services/aiServices");

const app = express();
const PORT = process.env.PORT || 5000;

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

// Temporary debug route (delete after fixing)
app.get("/api/debug", async (req, res) => {
  try {
    const result = await getAriaResponse("What is your shipping policy?");
    res.json({ ok: true, build: "v3", result });
  } catch (e) {
    res.status(500).json({
      ok: false,
      build: "v3",
      message: e.message,
      keyPresent: Boolean(process.env.GEMINI_API_KEY),
      envNames: Object.keys(process.env),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Aura backend running at http://localhost:${PORT}`);
});
