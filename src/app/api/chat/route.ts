import { StreamingTextResponse, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = createStreamableValue();

  await streamText({
    model: google("models/gemini-1.5-flash-latest"),

    system:
      "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short and witty.",
    messages,
  })
    .then(async ({ textStream }) => {
      for await (const partialText of textStream) {
        if (partialText) {
          console.log(partialText);
          stream.update(partialText);
        }
      }
    })
    .finally(() => {
      stream.done();
    });

  // for await (const text of textStream) {
  // }

  // // Respond with the stream
  // return new StreamingTextResponse(textStream);
  return;
}
