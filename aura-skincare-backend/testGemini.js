
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const response = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: "Reply with exactly: Hello Aria",
    });

    console.log("\n--- FULL GEMINI RESPONSE ---");
    console.dir(response, { depth: null });
  } catch (error) {
    console.error("Gemini test failed:", error.message);
  }
}

main();
