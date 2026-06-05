import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Ventana from "@/components/Ventana";
import Script from "next/script";

import { getAllPortfolioData } from "@/services/fetchData";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100","300","400","500","700","900"],
});

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
  
  const data = await getAllPortfolioData();

  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        <Script
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
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          id="material-symbols-css"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
          rel="stylesheet"
          media="print"
        />
        <Script id="optimize-material-symbols" strategy="afterInteractive">
          {`
            const fontLink = document.getElementById('material-symbols-css');
            if (fontLink) {
              fontLink.media = 'all';
            }
          `}
        </Script>

        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body className={roboto.className} style={{ overflowX: "hidden", padding: 0, margin: 0 }}>
        <Ventana perfil={data?.Perfil}>
          {children}
        </Ventana>
      </body>
    </html>
  );
}