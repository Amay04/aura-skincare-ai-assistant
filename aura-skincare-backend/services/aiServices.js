
const { GoogleGenAI } = require("@google/genai");
const { executeAriaTool } = require("../tools/ariaTools");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from the .env file.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.5-flash-lite";
const MAX_TURNS = 5;

const SYSTEM_PROMPT = `
You are Aria, the AI customer support agent for Aura Skincare.

- Help customers with order tracking and store policies.
- Be polite, friendly, concise, and professional.
- Use get_order_details for questions about a specific order.
- Use check_cancellation_eligibility before answering cancellation questions.
- Use get_brand_policies for shipping, returns, damaged products, or COD questions.
- Never invent order details, tracking numbers, or policy rules.
- Never claim an order has been cancelled. The available tool only checks eligibility.
- If an order is not found, clearly explain that.
- Keep responses natural and suitable for spoken conversation.
- You can check cancellation eligibility, but you cannot cancel orders.
- Never offer to cancel an order or imply that you can complete the cancellation.
- If an order is eligible, explain that the customer can request cancellation through customer support.
`;

const functionTools = [
  {
    type: "function",
    name: "get_order_details",
    description: "Look up a customer's order using its order ID.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "The order ID, such as ORD-101.",
        },
      },
      required: ["order_id"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "check_cancellation_eligibility",
    description:
      "Check whether an order is eligible for cancellation. This does not cancel the order.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "The order ID, such as ORD-103.",
        },
      },
      required: ["order_id"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "get_brand_policies",
    description:
      "Retrieve Aura Skincare's shipping, returns, damaged product, cancellation, and COD policies.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
      additionalProperties: false,
    },
  },
];

function extractText(interaction) {
  if (interaction.output_text) {
    return interaction.output_text;
  }

  return (interaction.steps || [])
    .filter((step) => step.type === "model_output")
    .flatMap((step) => step.content || [])
    .filter((item) => item.type === "text" && item.text)
    .map((item) => item.text)
    .join("\n")
    .trim();
}

async function getAriaResponse(message) {
  if (typeof message !== "string" || !message.trim()) {
    throw new Error("A customer message is required.");
  }

  // With store:false, retain the complete conversation locally.
  const history = [
    {
      type: "user_input",
      content: [
        {
          type: "text",
          text: message.trim(),
        },
      ],
    },
  ];

  try {
    let interaction = await ai.interactions.create({
      model: MODEL,
      input: history,
      system_instruction: SYSTEM_PROMPT,
      tools: functionTools,
      store: false,
    });

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const steps = interaction.steps || [];

      // Preserve every model step exactly as returned by Gemini.
      history.push(...steps);

      const functionCalls = steps.filter(
        (step) => step.type === "function_call"
      );

      if (functionCalls.length === 0) {
        const reply = extractText(interaction);

        return {
          reply:
            reply ||
            "I'm sorry, I couldn't generate a response. Please try again.",
        };
      }

      // Add results for all calls from this model turn before
      // sending the complete history back to Gemini.
      for (const call of functionCalls) {
        console.log(`Aria: Executing ${call.name}`);

        let result;

        try {
          const args =
            typeof call.arguments === "string"
              ? JSON.parse(call.arguments)
              : call.arguments || {};

          result = await executeAriaTool(call.name, args);
        } catch (error) {
          console.error(`Aria tool error (${call.name}):`, error.message);

          result = {
            success: false,
            message: "I couldn't complete that information lookup.",
          };
        }

        history.push({
          type: "function_result",
          name: call.name,
          call_id: call.id,
          result: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        });
      }

      // Stateless mode requires the entire history, not just
      // the latest function result or a previous interaction ID.
      interaction = await ai.interactions.create({
        model: MODEL,
        input: history,
        tools: functionTools,
        store: false,
      });
    }

    return {
      reply:
        "I'm having trouble completing that request right now. Please try again.",
    };
  } catch (error) {
    console.error("Aria Gemini error:", error.message);
    throw error;
  }
}

module.exports = { getAriaResponse };
