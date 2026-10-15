
const { getAriaResponse } = require("../services/aiServices");

async function handleConversation(req, res) {
  try {
    const { message } = req.body;

    // Validate the customer's message
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    // Get a response from Aria
    const result = await getAriaResponse(message);

    return res.status(200).json({
      success: true,
      reply: result.reply,
    });
  } catch (error) {
    console.error("Conversation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Aria is temporarily unavailable. Please try again.",
    });
  }
}

module.exports = { handleConversation };
