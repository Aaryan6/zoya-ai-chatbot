import { cn } from "@/lib/utils";
import { AIState, UIState } from "@/app/actions";
import { useEffect, useRef } from "react";

export interface ChatMessageProps {
  messages: UIState;
  aiState: AIState;
}

export function ChatMessage({ messages, aiState }: ChatMessageProps) {
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiState?.messages]);

  return (
    <div
      className={cn(
        "mb-4 flex-1 h-[calc(100vh-10rem)] flex flex-col gap-4 overflow-y-auto"
      )}
    >
      {messages.map((message, index: number) => {
        return (
          <div key={message.id ?? index} className="max-w-3xl w-full mx-auto">
            <div className="">{message.display}</div>
          </div>
        );
      })}
      <div ref={bottomScrollRef} className="pb-8 md:pb-16" />
    </div>
  );
}
