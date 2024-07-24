"use client";
import Image from "next/image";
import Zoya from "../../public/zoya.jpeg";

type BotMessageProps = {
  message: string;
};

export const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <div className="flex items-start gap-2 pr-12">
      <div className="rounded-full border-2 border-primary w-10 h-10 text-primary-foreground flex items-center justify-center overflow-hidden shrink-0">
        <Image
          src={Zoya}
          alt="zoya"
          className="object-cover scale-110 object-center"
        />
      </div>
      <div className="grid gap-2 text-sm">
        <div className="bg-primary shadow-sm border border-muted font-semibold rounded-lg p-4 whitespace-pre-wrap rounded-ss-none">
          {message?.trim()}
        </div>
      </div>
    </div>
  );
};
