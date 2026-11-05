import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const brandFont = Instrument_Sans({
  variable: "--font-brand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo | Token Sale",
  description: "Track the live token sale, its progress and its closing time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brandFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <div className="mx-auto flex w-full max-w-[1550px] flex-1 flex-col">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
