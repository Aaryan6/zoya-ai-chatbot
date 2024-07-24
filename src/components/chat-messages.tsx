import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { BotMessage } from "./bot-message";
import { UserMessage } from "./user-message";
import { Message } from "@/app/actions";

export interface ChatMessageProps {
  messages: Message[];
}

export function ChatMessage({ messages }: ChatMessageProps) {
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea
      className={cn(
        "mb-4 flex-1 h-[calc(100vh-10rem)] flex flex-col gap-4 overflow-y-auto"
      )}
    >
      <BotMessage message="Main hun aapki Zoya, poochiye mujhe kuch bhi!" />
      {messages.map((message, index: number) => {
        return (
          <div key={index} className="max-w-3xl w-full mx-auto py-2">
            {message.role === "assistant" ? (
              <BotMessage message={message.content} />
            ) : (
              message.role === "user" && (
                <UserMessage message={message.content} />
              )
            )}
          </div>
        );
      })}
      <div ref={bottomScrollRef} className="pb-8" />
    </ScrollArea>
  );
}
