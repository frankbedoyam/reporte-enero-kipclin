import type { Metadata } from "next";
import "./globals.css";
import MesNav from "./Components/MesNav";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wjzsp625pv");
            `,
          }}
        />
      </body>
    </html>
  );
}