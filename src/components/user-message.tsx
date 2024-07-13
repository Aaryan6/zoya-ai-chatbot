import { UserIcon } from "lucide-react";

type UserMessageProps = {
  message: string;
};
export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex items-start gap-2 justify-end">
      <div className="grid gap-2 text-sm">
        <div className="bg-primary rounded-lg p-4 text-primary-foreground font-medium rounded-se-none">
          {message}
        </div>
      </div>
      <div className="rounded-full w-10 h-10 bg-secondary text-accent-foreground flex items-center justify-center">
        <UserIcon className="w-6 h-6" />
      </div>
    </div>
  );
};
