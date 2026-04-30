import type { Metadata } from "next";
import "./globals.css";
import MesNav from "./Components/MesNav";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Reporte Kipclin",
  description: "Seguimiento técnico, editorial y comercial del sitio web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans bg-kipclin-bg text-kipclin-gray antialiased">
        <MesNav />
        <main className="p-6">
          {children}
        </main>
        <Analytics />
        <GoogleAnalytics gaId="G-G2J8HF6GEZ" />
      </body>
    </html>
  );
}