import { CoreMessage, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { BotMessage } from "@/components/bot-message";

type Props = {
  uiStream: ReturnType<typeof createStreamableUI>;
  messages: CoreMessage[];
};

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function GetAnswer({ uiStream, messages }: Props) {
  const stream = createStreamableValue<any>();

  uiStream.append(<BotMessage message={stream.value} />);

  let finalInquiry: string = "";
  await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system:
      "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short if possible and witty.",
    messages,
    maxRetries: 3,
  })
    .then(async ({ textStream }) => {
      for await (const partialText of textStream) {
        if (partialText) {
          finalInquiry += partialText;
          stream.update(finalInquiry);
        }
      }
    })
    .finally(() => {
      stream.done();
    });

  return finalInquiry;
}
