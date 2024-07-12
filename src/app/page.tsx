"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { AI } from "./actions";
import { nanoid } from "@/lib/utils";
import { UserMessage } from "@/components/user-message";
import { ChatMessage } from "@/components/chat-messages";
import Navbar from "@/components/navbar";

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
  return (
    <div className="h-screen bg-muted">
      <Navbar />
      <div className="overflow-y-auto">
        <div className="grid gap-4 p-2">
          <ChatMessage messages={messages} aiState={aiState} />
        </div>
      </div>
      <div className="max-w-3xl w-full mx-auto fixed bottom-5 md:bottom-10 inset-x-0 px-2">
        <div className="border bg-card p-4 rounded-lg">
          <form onSubmit={onSubmit} className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-muted focus-visible:ring-offset-0 focus-visible:ring-transparent"
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
