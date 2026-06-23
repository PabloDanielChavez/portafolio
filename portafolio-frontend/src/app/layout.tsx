import dynamic from 'next/dynamic';
import Script from 'next/script';
import type { Metadata } from "next";
import "@/styles/main.scss";
import GTMTracker from "@/components/sub_components/GTMTracker";

import Header from "@/components/sections/Header";
const Footer = dynamic(() => import('@/components/sections/Footer'));

export const metadata: Metadata = {
  metadataBase: new URL('https://paginaswebchavez.netlify.app'),
  title: {
    default: "PaginasWebChavez | Desarrollador Web Full Stack",
    template: "%s | Pablo Daniel Chavez"
  },
  description: "Desarrollador Web especializado en crear soluciones digitales, sitios rápidos y optimizados para SEO. Ayudo a negocios a crecer mediante tecnología. ¡Contactame!",
  
  authors: [{ name: "Pablo Daniel Chavez" }],
  keywords: [
    "Desarrollador Web", 
    "Landing Page", 
    "Buenos Aires", 
    "SEO", 
    "Optimización Web", 
    "Diseño de Paginas Web", 
    "Tienda Online", 
    "PaginasWebChavez"
],
  robots: {
    index: true,
    follow: true,
  },
  
  verification: {
    google: 'google4a94501184fa92ba',
  },
  
  openGraph: {
    title: "PaginasWebChavez | Desarrollo Web y SEO",
    description: "Desarrollador Web especializado en sitios rápidos y optimizados para resultados reales.",
    url: "https://paginaswebchavez.netlify.app",
    siteName: "PaginasWebChavez", // Coherencia con el nuevo nombre
    images: [
      {
        url: "/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png",
        width: 250,
        height: 250,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Portafolio PDC | Pablo Daniel Chavez",
    description: "Portafolio profesional de desarrollo Frontend.",
    images: ["/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png"],
  },
  
  icons: {
    icon: "/img/Logotipo_Portafolio_PDC/Icono/Icono_48x48px.png",
    shortcut: "/img/Logotipo_Portafolio_PDC/Icono/Icono_48x48px.png",
  }
};

export const viewport = {
  themeColor: '#0d0d0d',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pablo Daniel Chavez",
    "jobTitle": "Desarrollador Frontend",
    "url": "https://paginaswebchavez.netlify.app",
    "sameAs": [
      "https://github.com/PabloDanielChavez",
      "https://www.linkedin.com/in/pablo-daniel-chavez-4a57a2277/",
      "https://www.instagram.com/paginasweb.chavez/"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5L9KF25W');` }} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body style={{ overflowX: "hidden" }}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5L9KF25W"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        <header>
          <Header />
        </header>
        <main style={{ minHeight: "100vh" }}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
        {/* <GTMTracker /> */}
      </body>
    </html>
  );
}