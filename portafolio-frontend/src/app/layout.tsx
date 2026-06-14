import Script from "next/script";
import type { Metadata } from "next";
import "material-symbols/outlined.css"; 
import "@/styles/main.scss";

import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export const metadata: Metadata = {
  title: "Portafolio PDC",
  description: "Portafolio Pablo Daniel Chavez",
  verification: {
    google: '4yIUAbvNIcrI3UhHJW9vszJTkYpBcBoyjlRtCzn7mUc',
  },
  icons: {
    icon: "/img/Logotipo_Portafolio_PDC/Icono/Icono_48x48px.png"
  }
};

export const viewport = {
  themeColor: '#0d0d0d',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z7439LP7QW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7439LP7QW');
          `}
        </Script> */}
      </head>
      <body /*className={`${roboto.className}`}*/ style={{ overflowX: "hidden", padding: 0, margin: 0 }}>
        <Header />
        <main style={{minHeight:"100vh"}}>
          {children}
        </main>
        <Footer />
        <Script
          strategy="lazyOnload" // <--- Esto es más agresivo que afterInteractive
          src="https://www.googletagmanager.com/gtag/js?id=G-Z7439LP7QW"
        />
        <Script id="ga-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7439LP7QW');
          `}
        </Script>
      </body>
    </html>
  );
}