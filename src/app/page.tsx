"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { AI } from "./actions";
import { nanoid } from "@/lib/utils";
import { UserMessage } from "@/components/user-message";
import { ChatMessage } from "@/components/chat-messages";
import Navbar from "@/components/navbar";
import { BotMessage, BotMessageStatic } from "@/components/bot-message";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();
  const [inputValue, setInputValue] = useState("");
  const [aiState] = useAIState<typeof AI>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage message={inputValue} />,
      },
    ]);

    const res = await submit(inputValue);

    setMessages((currentMessages) => [...currentMessages, res as any]);

    setInputValue("");
  };

  useEffect(() => {
    setMessages((currentMessages) => [
      {
        id: nanoid(),
        display: (
          <BotMessageStatic
            message={"Main hun aapki Zoya, poochiye mujhe kuch bhi!"}
          />
        ),
      },
    ]);
  }, []);
  return (
    <div className="sm:py-4 px-0">
      <div className="h-screen sm:h-[calc(100vh-2rem)] bg-muted sm:max-w-xl mx-auto sm:rounded-2xl border border-muted overflow-hidden shadow-md">
        <Navbar />
        <div className="overflow-y-auto">
          <div className="grid gap-4 p-2">
            <ChatMessage messages={messages} aiState={aiState} />
          </div>
        </div>
        <div className="max-w-xl w-full mx-auto fixed bottom-3 sm:bottom-6 inset-x-0 px-2">
          <div className="border bg-card p-4 rounded-lg">
            <form onSubmit={onSubmit} className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-muted focus-visible:ring-offset-0 focus-visible:ring-transparent font-semibold"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit">
                <SendIcon className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
