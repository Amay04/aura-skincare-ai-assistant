# Aura Skincare — AI Voice Customer Experience Agent

An AI-powered voice customer support assistant built for Aura Skincare. Aria enables customers to ask questions naturally and receive spoken responses about order tracking, shipping, returns, cancellation eligibility, and store policies.

## Features

- **Voice-based interaction:** Speak to Aria using browser speech recognition and hear spoken responses.
- **AI-powered responses:** Uses Google's Gemini API to generate natural-language customer support responses.
- **Order tracking:** Retrieve order status, courier information, tracking numbers, and delivery estimates.
- **Cancellation eligibility:** Check whether an order qualifies for cancellation without falsely claiming that it has been cancelled.
- **Policy assistance:** Answer questions about shipping fees, returns, damaged products, and cash on delivery.
- **Live transcript:** Review customer messages and Aria's responses during a conversation.
- **Sample order data:** Demonstrates customer support workflows using predefined orders.
- **REST API:** A Node.js and Express backend connects the frontend to the AI service and business logic.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js, Express |
| AI integration | Google Gemini API |
| Voice input | Web Speech API |
| Voice output | Browser Speech Synthesis API |
| API communication | REST, JSON |

## Project Structure

```text
Ai-Assistant/
├── aura-skincare/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── aura-skincare-backend/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── tools/
│   ├── .env
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

The `.env` file is local configuration and must not be committed to version control.

## Prerequisites

Install the following before running the project:

- Node.js and npm
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)
- A modern browser with microphone access and support for the Web Speech API, such as a compatible version of Chrome or Edge

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd aura-skincare-ai-assistant
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Configure the backend

```bash
cd aura-skincare-backend
npm install
```

Create a `.env` file inside `aura-skincare-backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Replace `your_gemini_api_key` with your own API key. Never publish this file or expose the key in frontend code.

Start the backend:

```bash
node server.js
```

The backend should be available at `http://localhost:5000`, assuming port 5000 is configured and available.

### 3. Configure the frontend

Open a second terminal:

```bash
cd aura-skincare
npm install
npm run dev
```

Open the local URL printed by Vite, typically:

`http://localhost:5173`

### 4. Production build

To build the frontend for deployment:

```bash
cd aura-skincare
npm run build
```

Vite generates production files in `aura-skincare/dist/`.

## API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend health |
| GET | `/api/orders` | Retrieve sample orders |
| GET | `/api/orders/:id` | Retrieve an order by ID, if supported by the route |
| GET | `/api/policies` | Retrieve store policies |
| POST | `/api/conversation` | Send a customer message to Aria |

Example conversation request:

```json
{
  "message": "Track my order ORD-101"
}
```

Example response shape:

```json
{
  "success": true,
  "reply": "Your order details are..."
}
```

The actual reply depends on the customer's question and the available order or policy data.

## Sample Test Scenarios

Try these questions after starting both the frontend and backend:

- "Track my order ORD-101."
- "Can I cancel order ORD-103?"
- "What is your return policy?"
- "Where is my order ORD-999?"
- "What is the shipping fee for an order worth ₹400?"
- "Do you offer cash on delivery for an order worth ₹2,000?"
- "My product arrived damaged. What should I do?"

The sample order data and policy rules are intended for demonstration and testing.

## Important Notes

- Voice recognition support varies by browser and operating system.
- Microphone access generally requires HTTPS in a deployed environment; localhost is treated as a secure context by modern browsers.
- The frontend must use the deployed backend URL when hosted publicly. A localhost API URL only works on the machine running the backend.
- Configure backend CORS to allow the actual frontend origin.
- Keep API keys and other secrets in backend environment variables.
- Cancellation functionality currently checks eligibility; it does not execute an actual cancellation.
- The included order records are sample data, not a live e-commerce database.

## Future Improvements

- Persistent conversation history and structured call summaries
- Integration with a real order management system
- Actual cancellation workflows with authorization and confirmation
- Improved voice activity detection and interruption handling
- Automated tests and deployment pipelines
- Authentication, rate limiting, and production monitoring

## Project Purpose

This project demonstrates how voice interaction, generative AI, REST APIs, and structured business rules can be combined to create a conversational customer support experience.

**Project:** Aura Skincare — AI Voice Customer Experience Agent
