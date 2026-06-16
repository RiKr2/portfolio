import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { en } from "@/content/en";

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ricardo-fundora.vercel.app"),
  title: en.meta.title,
  description: en.meta.description,
  keywords: [
    "Ricardo Fundora",
    "Software Engineer",
    "Backend Developer",
    "Python",
    ".NET",
    "Full-Stack",
    "Remote",
  ],
  authors: [{ name: "Ricardo Fundora Hernández" }],
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${pixel.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="font-mono min-h-full flex flex-col bg-bg text-fg antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
