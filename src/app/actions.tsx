"use server";

// import { streamText } from "ai";
// import { createStreamableValue } from "ai/rsc";
// import { createGoogleGenerativeAI } from "@ai-sdk/google";

// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_API_KEY || "",
// });

// export interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export async function continueConversation(history: Message[]) {
//   "use server";

//   const stream = createStreamableValue();

//   (async () => {
//     const { textStream } = await streamText({
//       model: google("models/gemini-1.5-flash-latest"),
//       system:
//         "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short and witty.",
//       messages: history,
//     });

//     for await (const text of textStream) {
//       stream.update(text);
//     }

//     stream.done();
//   })();

//   return {
//     messages: history,
//     newMessage: stream.value,
//   };
// }
// "use server";

import { CoreMessage, streamText } from "ai";
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
} from "ai/rsc";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { UserMessage } from "@/components/user-message";
import { BotMessage } from "@/components/bot-message";
import { nanoid } from "@/lib/utils";
import { GetAnswer } from "@/lib/stream-response";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

// export async function continueConversation(history: Message[]) {
//   "use server";

//   const stream = createStreamableValue();

//   (async () => {
//     const { textStream } = await streamText({
//       model: google("models/gemini-1.5-flash-latest"),
//       system:
//         "Please respond in Hinglish (Hindi + English) along with emojis. Aapka naam Zoya he. Keep your responses short and witty.",
//       messages,
//     });

//     for await (const text of textStream) {
//       stream.update(text);
//     }

//     stream.done();
//   })();

//   return {
//     messages: history,
//     newMessage: stream.value,
//   };
// }

async function submit(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();

  const messages: CoreMessage[] = [...aiState.get()?.messages] as any[];

  if (content) {
    aiState.update({
      chatId: aiState.get().chatId,
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "user",
          content,
        },
      ],
    });
    messages.push({
      role: "user",
      content,
    });
  }

  const processEvents = async () => {
    const answerId = nanoid();
    const answer = await GetAnswer({ uiStream, messages });

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: answerId,
          role: "assistant",
          content: answer,
        },
      ],
    });
    uiStream.done();
  };

  processEvents();
  return {
    id: nanoid(),
    display: uiStream.value,
  };
}

export type AIMessage = {
  role: "function" | "user" | "assistant" | "system" | "tool" | "data";
  content: string;
  id: string;
};

export type AIState = {
  messages: AIMessage[];
  chatId: string;
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  messages: AIMessage[];
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submit,
  },
  initialUIState: [],
  initialAIState: {
    chatId: nanoid(),
    messages: [],
  } as AIState,
  onGetUIState: async () => {
    "use server";

    const aiState = getAIState();
    if (aiState) {
      const uiState = getUIStateFromAIState(aiState);
      return uiState;
    } else {
      return;
    }
  },
});

export const getUIStateFromAIState = (aiState: Readonly<Chat>) => {
  return aiState.messages?.map((message) => {
    const { id, role, content } = message;
    switch (role) {
      case "user":
        return {
          id,
          display: <UserMessage message={content} />,
        };
      case "assistant":
        const answer = createStreamableValue();
        return {
          id,
          display: <BotMessage message={answer.value} />,
        };
      default:
        return {
          id,
          display: <div />,
        };
    }
  });
};
