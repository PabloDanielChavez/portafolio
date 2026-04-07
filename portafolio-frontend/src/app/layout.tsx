import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Ventana from "@/components/Ventana";
import "../styles/globals.scss";
import "../styles/base/normalice.scss"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100","300","400","500","700","900"],
});

export const metadata: Metadata = {
  title: "Portafolio PDC",
  description: "Portafolio Pablo Daniel Chavez",
  themeColor:"000",
  icons: {
    icon: "portafolio-frontend/public/img/Logo PNG/48 x 48.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={roboto.className} style={{ overflowX: "hidden" }}>
        <Ventana>
          {children}
        </Ventana>
      </body>
    </html>
  );
}