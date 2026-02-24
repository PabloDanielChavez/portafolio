import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import "../styles/globals.scss";
import "../styles/base/normalice.scss"
import style_ventana from "@/styles/sections/ventana.module.scss"
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaLinkedin, 
  FaUser, 
  FaEnvelope, 
  FaBriefcase,
  FaArrowUp 
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100","300","400","500","700","900"],
});

export const metadata: Metadata = {
  title: "Portafolio PDC",
  description: "Portafolio Pablo Daniel Chavez",
  themeColor:"000",
  icons: {
    icon: "data:image/png;base64,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"
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
        <div className={style_ventana.ventana}>
          <div className={style_ventana.ventana_box}>
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_lateral_izquierda}`} id="">
              <article id="articlePerfil" className={`${style_ventana.ventana_articlePerfil}`}>
                <a href="#">
                  <div className={`${style_ventana.ventana_box_imagen}`}>
                    <img className={`${style_ventana.ventana_imagen_perfil}`} src="data:image/jpeg;base64,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" alt="" />
                  </div>
                </a>
              </article>
              <article id="articleSelector" className={`${style_ventana.ventana_articleSelector}`}>
                <div className={`${style_ventana.ventana_navegador}`}>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      {/* <span className="material-symbols-outlined">Person</span> */}
                      <BsFillPersonVcardFill size={22} />
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      {/* <span className="material-symbols-outlined">Work</span> */}
                      <FaBriefcase size={22} />
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      {/* <span className="material-symbols-outlined">Mail</span> */}
                      <SiCodefactor size={22} />
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      {/* <span className="material-symbols-outlined">Mail</span> */}
                      <FaEnvelope size={22} />
                    </div>
                  </article>
                </div>
              </article>
              <article id="articleUpward" className={`${style_ventana.ventana_articleUpward}`}>
                <article className={`${style_ventana.ventana_selector_box}`}>
                  <div className={`${style_ventana.ventana_selector_opcion} `}>
                    {/* <span className="material-symbols-outlined">arrow_upward</span> */}
                    <FaArrowUp size={22} />
                  </div>
                </article>
              </article>
            </section>
            {/* -------------------------------------- */}
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_central}`} id="">asd</section>
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_lateral_derecho}`} id="">
              <article>
                <div className={`${style_ventana.ventana_navegador}`}>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      <FaInstagram size={22} />
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      <FaWhatsapp size={22} />
                    </div>
                  </article>
                  <article className={`${style_ventana.ventana_selector_box}`}>
                    <div className={`${style_ventana.ventana_selector_opcion} `}>
                      <FaLinkedin size={22} />
                    </div>
                  </article>
                </div>
              </article>
            </section>
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