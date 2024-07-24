"use server";

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-4o-mini"),
      system:
        "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short and witty.",
      messages: [
        {
          role: "assistant",
          content: "Main hun aapki Zoya, poochiye mujhe kuch bhi!",
        },
        ...history,
      ],
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
