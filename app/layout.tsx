import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reporte Kipclin",
  description: "Seguimiento técnico, editorial y comercial del sitio web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans bg-kipclin-bg text-kipclin-gray antialiased">
        {children}
      </body>
    </html>
  );
}