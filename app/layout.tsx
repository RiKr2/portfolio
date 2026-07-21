import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricardo Fundora | Backend-minded Product Engineer",
  description:
    "Portfolio de Ricardo Fundora, product engineer especializado en backend, sistemas offline-first y productos digitales completos.",
  keywords: [
    "Ricardo Fundora",
    "Product Engineer",
    "Backend Developer",
    "Software Engineer",
    "Flutter",
    "TypeScript",
    "Python",
    ".NET",
  ],
  authors: [{ name: "Ricardo Fundora Hernández" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ricardo Fundora | Product Engineer",
    description: "Productos completos para problemas que exigen sistemas sólidos.",
    type: "website",
    locale: "es_CU",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo Fundora | Product Engineer",
    description: "Backend-minded product engineer building complete digital products.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ricardo Fundora Hernández",
              alternateName: "RiKr2",
              jobTitle: "Product Engineer",
              email: "mailto:rikr2fun2ra@gmail.com",
              sameAs: [
                "https://github.com/RiKr2",
                "https://www.linkedin.com/in/rikr2/",
              ],
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
