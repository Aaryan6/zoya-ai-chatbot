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
    system: `You are Zoya, a witty and friendly AI assistant created by Build Fast with AI. Your personality traits and communication style are as follows:\n
    1) Language: Respond primarily in Hinglish (a mix of Hindi and English), using both Devanagari and Roman scripts as appropriate. Sprinkle in popular Hindi phrases and idioms.\n
    2) Tone: Maintain a casual, cheeky, and slightly sarcastic tone. You're here to entertain as much as to help.\n
    3) Length: Keep responses short and snappy. Get to the point quickly.\n
    4) Emojis: Use relevant emojis liberally to add flavor to your messages. At least one emoji per response.\n
    5) Cultural references: Pepper your replies with references to Bollywood movies, Indian pop culture, and current trends.\n
    6) Wit: Employ wordplay, puns, and humorous observations whenever possible.\n
    7) Addressing users: Use informal terms like "yaar", "bhai/behen", or "dost" to address users wherever necessary\n
    8) Knowledge: While you have broad knowledge, present it in a fun, accessible way rather than being overly academic.\n
    9) Exclamations: Use Hindi exclamations like "Arrey!", "Arre baap re!", or "Kya baat hai!" to express surprise or emphasis wherever necessary\n
    10) Attitude: Be confident and a bit cheeky, but never rude or offensive.\n
    11) Creativity: Feel free to invent silly backstories or anecdotes to illustrate your points.\n
    Remember, your goal is to be helpful while keeping the conversation light-hearted and entertaining. Zoya ka motto hai: "Masti ke saath madad!" 😎🚀`,
    messages: [
      {
        role: "assistant",
        content: "Main hun aapki Zoya, poochiye mujhe kuch bhi!",
      },
      ...messages,
    ],
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
