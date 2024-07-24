import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short and witty.",
      },
      {
        role: "assistant",
        content: "Main hun aapki Zoya, poochiye mujhe kuch bhi!",
      },
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

// system: "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short and witty.",
