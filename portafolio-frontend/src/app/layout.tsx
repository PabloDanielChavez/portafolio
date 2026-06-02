import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Ventana from "@/components/Ventana";
// IMPORTANTE: Asegúrate de que tus estilos globales se importen correctamente
import "../styles/base/global.module.scss";
import "../styles/base/normalice.scss";

import { getAllPortfolioData } from "@/services/fetchData";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100","300","400","500","700","900"],
});

export const metadata: Metadata = {
  title: "Portafolio PDC",
  description: "Portafolio Pablo Daniel Chavez",
  icons: {
    icon: "/img/Logotipo_Portafolio_PDC/Icono/Icono_48x48px.png" // Asegúrate de que inicie con /
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
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={roboto.className} style={{ overflowX: "hidden" }}>
        <Ventana perfil={data?.Perfil}>
          {children}
        </Ventana>
      </body>
    </html>
  );
}