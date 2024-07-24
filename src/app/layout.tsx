import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

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
        <main className="bg-gradient-to-br from-slate-700 to-slate-900">
          {children}
        </main>
      </body>
    </html>
  );
}
