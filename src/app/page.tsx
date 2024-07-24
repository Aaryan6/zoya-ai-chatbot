"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat-messages";
import Navbar from "@/components/navbar";
import { Message, continueConversation } from "./actions";
import { useState } from "react";
import { readStreamableValue } from "ai/rsc";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  // const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const { messages, newMessage } = await continueConversation([
      ...conversation,
      { role: "user", content: input },
    ]);

    setInput("");

    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      setConversation([
        ...messages,
        { role: "assistant", content: textContent },
      ]);
    }
  };
  return (
    <div className="sm:py-4 px-0">
      <div className="h-screen sm:h-[calc(100vh-2rem)] bg-muted sm:max-w-lg mx-auto sm:rounded-2xl border border-muted overflow-hidden shadow-md">
        <Navbar />
        <div className="overflow-y-auto">
          <div className="grid gap-4 p-2">
            <ChatMessage messages={conversation} />
          </div>
        </div>
        <div className="max-w-lg w-full mx-auto fixed bottom-3 sm:bottom-6 inset-x-0 px-2">
          <div className="border bg-card p-4 rounded-lg">
            <form onSubmit={onSubmit} className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-muted focus-visible:ring-offset-0 focus-visible:ring-transparent font-semibold"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
