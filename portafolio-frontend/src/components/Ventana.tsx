"use client";
import Header from "@/components/Header";
import { ReactNode } from "react";
import style_ventana from "@/styles/sections/ventana.module.scss"
import style_global from "@/styles/base/global.module.scss"
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaLinkedin,
  FaEnvelope, 
  FaBriefcase,
  FaArrowUp 
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";

interface VentanaProps {
  children: ReactNode;
}

export default function Ventana({ children }: VentanaProps) {

return (
  <main className={style_ventana.ventana}>
      <div className={style_ventana.ventana_layoutPrincipal}>
        <article id="" className={`${style_ventana.ventana_header_box_layout} ${style_ventana.seccionVentanaIzq}` }>
          <div id="articlePerfil" className={`${style_ventana.ventana_header_perfil}`}>
            <a href="#">
              <div className={`${style_ventana.ventana_header_box_imagen}`}>
                <img className={`${style_ventana.ventana_header_imagen_perfil}`} src="/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg" alt="Logo" />
              </div>
            </a>
          </div>
          <div id="articleSelector" className={`${style_ventana.ventana_header_selector}`}>
            <div className={`${style_ventana.ventana_header_navegador}`}>
              <article className={`${style_ventana.ventana_header_selector_box}`}>
                <div className={`${style_ventana.ventana_header_selector_opcion} `}>
                  <BsFillPersonVcardFill className={style_global.tamaño_icono} />
                </div>
              </article>
              <article className={`${style_ventana.ventana_header_selector_box}`}>
                <div className={`${style_ventana.ventana_header_selector_opcion} `}>
                  <FaBriefcase className={style_global.tamaño_icono} />
                </div>
              </article>
              <article className={`${style_ventana.ventana_header_selector_box}`}>
                <div className={`${style_ventana.ventana_header_selector_opcion} `}>
                  <SiCodefactor className={style_global.tamaño_icono} />
                </div>
              </article>
              <article className={`${style_ventana.ventana_header_selector_box}`}>
                <div className={`${style_ventana.ventana_header_selector_opcion} `}>
                  <FaEnvelope className={style_global.tamaño_icono} />
                </div>
              </article>
            </div>
          </div>
          <div id="articleUpward" className={`${style_ventana.ventana_header_upward}`}>
            <article className={`${style_ventana.ventana_header_selector_box}`}>
              <div className={`${style_ventana.ventana_header_selector_opcion} `}>
                <FaArrowUp className={style_global.tamaño_icono} />
              </div>
            </article>
          </div>
        </article>
        <article className={style_ventana.ventana_central_box_layout}>
          <div className={style_ventana.ventana_central_box}>
          <Header></Header>
            <div className={style_ventana.ventana_central_contenido}>
              {children}
            </div>
          </div>
        </article>
        <article id="" className={`${style_ventana.ventana_header_box_layout} ${style_ventana.seccionVentanaDer}` }>
          <div className={style_ventana.ventana_footer_layout}>
            <div className={style_ventana.ventana_footer_box}>
              <section className={`${style_ventana.ventana_footer_section} ${style_ventana.ventana_footer_lateral_derecho}`} id="">
                <article>
                  <div className={`${style_ventana.ventana_footer_navegador}`}>
                    <article className={`${style_ventana.ventana_footer_selector_box}`}>
                      <div className={`${style_ventana.ventana_footer_selector_opcion} `}>
                        <FaInstagram className={style_global.tamaño_icono} />
                      </div>
                    </article>
                    <article className={`${style_ventana.ventana_footer_selector_box}`}>
                      <div className={`${style_ventana.ventana_footer_selector_opcion} `}>
                        <FaWhatsapp className={style_global.tamaño_icono} />
                      </div>
                    </article>
                    <article className={`${style_ventana.ventana_footer_selector_box}`}>
                      <div className={`${style_ventana.ventana_footer_selector_opcion} `}>
                        <FaLinkedin className={style_global.tamaño_icono} />
                      </div>
                    </article>
                  </div>
                </article>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}