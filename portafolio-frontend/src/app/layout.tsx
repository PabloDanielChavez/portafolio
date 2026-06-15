import dynamic from 'next/dynamic';
import Script from 'next/script';
import type { Metadata } from "next";
import "@/styles/main.scss";
import GTMTracker from "@/components/sub_components/GTMTracker";

import Header from "@/components/sections/Header";
const Footer = dynamic(() => import('@/components/sections/Footer'));

export const metadata: Metadata = {
  metadataBase: new URL('https://portafolio-pc.netlify.app'),
  title: {
    default: "Portafolio PDC | Pablo Daniel Chavez - Desarrollador Frontend",
    template: "%s | Pablo Daniel Chavez"
  },
  description: "Portafolio profesional de Pablo Daniel Chavez. Especialista en desarrollo Frontend con React y Next.js. Descubre mis proyectos, habilidades y trayectoria.",
  
  authors: [{ name: "Pablo Daniel Chavez" }],
  keywords: ["Desarrollador Frontend", "React", "Next.js", "Portafolio", "Web Developer"],
  robots: {
    index: true,
    follow: true,
  },
  
  verification: {
    google: 'google4a94501184fa92ba',
  },
  
  openGraph: {
    title: "Portafolio PDC | Pablo Daniel Chavez",
    description: "Explora los proyectos de desarrollo web de Pablo Daniel Chavez.",
    url: "https://portafolio-pc.netlify.app",
    siteName: "Portafolio PDC",
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
    "url": "https://portafolio-pc.netlify.app",
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