import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/text";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    "Ribbit",
  ],
  authors: [
    {
      name: "leojuriolli7",
      url: "https://github.com/leojuriolli7",
    },
  ],
  creator: "leojuriolli7",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.jpg`],
  },
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
              <nav className="sm:flex block items-end gap-4">
                <Link href="/">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/images/logo.png"
                      width={36}
                      height={36}
                      alt="Frog icon in a green background"
                      className="rounded-md"
                    />
                    <Text variant="h1">Ribbit</Text>
                  </div>
                </Link>
                <Link href="/posts/new" legacyBehavior>
                  <Text as="a" className="underline">
                    Create new post
                  </Text>
                </Link>
              </nav>

              <ThemeSwitch />
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
