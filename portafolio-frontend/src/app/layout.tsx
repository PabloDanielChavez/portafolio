import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import "../styles/globals.scss";
import "../styles/base/normalice.scss"
import style_ventana from "@/styles/sections/ventana.module.scss"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio PDC",
  description: "Portafolio Pablo Daniel Chavez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
        {/* Meta */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#1c1c1c" />
        <meta name="description" content="Portafolio" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=WDXL+Lubrifont+TC&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="img/unami-icon-transparente.png"/>
        
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      <body style={{ overflowX: "hidden" }}>
        <div className={style_ventana.ventana}>
          <div className={style_ventana.ventana_box}>
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_lateral_izquierda}`} id="">
              <article>
                <a href="#">
                  <div className={`${style_ventana.ventana_box_imagen}`}>
                  </div>
                </a>
              </article>
              <article>
                <div className={`${style_ventana.ventana_navegador}`}>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      <span className="material-symbols-outlined">Person</span>
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      <span className="material-symbols-outlined">Work</span>
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      <span className="material-symbols-outlined">Mail</span>
                    </div>
                  </article>
                </div>
              </article>
              <article>
                <article className={`${style_ventana.ventana_selector_box}`}>
                  <div className={`${style_ventana.ventana_selector_opcion} `}>
                    <span className="material-symbols-outlined">arrow_upward</span>
                  </div>
                </article>
              </article>
            </section>
            {/* -------------------------------------- */}
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_central}`} id="">asd</section>
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_lateral_derecho}`} id="">a</section>
          </div>
          {/* <header>
            <Header></Header>
          </header>
          {children}
          <footer>
            <Footer></Footer>
          </footer> */}
        </div>
      </body>
    </html>
  );
}