import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricardo Fundora | Diseño y desarrollo de productos digitales",
  description:
    "Aplicaciones móviles, plataformas SaaS, marketplaces y sistemas digitales diseñados y desarrollados de principio a fin por Ricardo Fundora.",
  keywords: [
    "Ricardo Fundora",
    "Product Engineer",
    "Backend Developer",
    "Software Engineer",
    "Desarrollo de aplicaciones",
    "SaaS",
    "Marketplace",
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
    title: "Ricardo Fundora | Productos digitales de principio a fin",
    description: "Convierto ideas complejas en aplicaciones listas para usarse.",
    type: "website",
    locale: "es_CU",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo Fundora | Product design + engineering",
    description: "I turn complex ideas into applications ready to be used.",
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
