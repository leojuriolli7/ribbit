import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/text";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ribbit",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-neutral-50 dark:bg-zinc-950")}>
        <Providers>
          <div className="w-full max-w-6xl m-auto sm:p-10 p-5">
            <header className="sm:px-5 px-0 py-5 flex items-center justify-between w-full border-b dark:border-zinc-800 mb-5">
              <div className="sm:flex block items-end gap-4">
                <Link href="/">
                  <Text variant="h1">Ribbit</Text>
                </Link>
                <Link href="/posts/new" legacyBehavior>
                  <Text as="a" className="underline">
                    Create new post
                  </Text>
                </Link>
              </div>

              <ThemeSwitch />
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
