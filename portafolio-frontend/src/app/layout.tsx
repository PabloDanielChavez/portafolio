import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import "material-symbols/outlined.css"; 
import "@/styles/main.scss";
import GTMTracker from "@/components/sub_components/GTMTracker";

import Header from "@/components/sections/Header";
const Footer = dynamic(() => import('@/components/sections/Footer'));

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
      <body style={{ overflowX: "hidden" }}>
        <Header />
        <main style={{ minHeight: "100vh" }}>
          {children}
        </main>
        <Footer />
        <GTMTracker />
      </body>
    </html>
  );
}