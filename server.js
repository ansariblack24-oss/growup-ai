require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

// INIT OPENAI CLIENT
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("🚀 GrowUp AI Brain is LIVE");
});

// API CHECK
app.get("/api", (req, res) => {
  res.json({ status: "ok" });
});

// 🤖 REAL AI CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are GrowUp AI, a helpful assistant like ChatGPT."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "AI brain error",
      details: error.message
    });
  }
});

// START SERVER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("🧠 GrowUp AI Brain running on port " + PORT);
});
