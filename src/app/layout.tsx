import { Manrope } from "next/font/google";
import { cn, nanoid } from "@/lib/utils";
import "./globals.css";
import { AI } from "./actions";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <AI initialAIState={{ chatId: nanoid(), messages: [] }}>{children}</AI>
      </body>
    </html>
  );
}
