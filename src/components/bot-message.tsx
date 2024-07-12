"use client";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import Image from "next/image";
import Zoya from "../../public/zoya.png";

type BotMessageProps = {
  message: StreamableValue<string>;
};

export const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  const [data] = useStreamableValue<string>(message);

  if (!data) return;
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full w-10 h-10 text-primary-foreground flex items-center justify-center">
        <Image src={Zoya} alt="zoya" width={25} height={25} className="" />
      </div>
      <div className="grid gap-2 text-sm">
        <div className="bg-background shadow-sm font-medium rounded-lg p-4 whitespace-pre-wrap">
          {data?.trim()}
        </div>
      </div>
    </div>
  );
};
