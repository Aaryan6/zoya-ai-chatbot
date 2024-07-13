import { UserIcon } from "lucide-react";

type UserMessageProps = {
  message: string;
};
export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex items-start gap-2 justify-end pl-12">
      <div className="grid gap-2 text-sm">
        <div className="bg-secondary rounded-lg p-4 text-primary-foreground font-semibold rounded-se-none shadow-sm border border-muted">
          {message}
        </div>
      </div>
      <div className="rounded-full w-10 h-10 bg-secondary text-accent-foreground flex items-center justify-center shrink-0">
        <UserIcon className="w-6 h-6" />
      </div>
    </div>
  );
};
