import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Censo da Mulher — Malu Fernandes",
  description:
    "Sua voz constrói a saúde da mulher no Alto Tietê e Vale do Paraíba. Responda o Censo da Mulher de Malu Fernandes.",
  openGraph: {
    title: "Censo da Mulher — Malu Fernandes",
    description:
      "Sua voz constrói a saúde da mulher no Alto Tietê e Vale do Paraíba.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
