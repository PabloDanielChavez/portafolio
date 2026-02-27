"use client";

import { ReactNode } from "react";
import style_ventana from "@/styles/sections/ventana.module.scss"
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
import Header from "./Header";

interface VentanaProps {
  children: ReactNode;
}

export default function Ventana({ children }: VentanaProps) {

  return (
    <article className={style_ventana.ventana}>
      <div className={style_ventana.ventana_layout}>
          <div className={style_ventana.ventana_box}>
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_lateral_izquierda}`} id="">
              <article id="articlePerfil" className={`${style_ventana.ventana_articlePerfil}`}>
                <a href="#">
                  <div className={`${style_ventana.ventana_box_imagen}`}>
                    <img className={`${style_ventana.ventana_imagen_perfil}`} src="/img/Pablo-y-Bici.jpeg" alt="Pablo con bici" />
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
          </div>
      </div>
      <div className={style_ventana.ventana_layout}>
          <Header></Header>
          <div className={style_ventana.ventana__box_central}>
            <section className={`${style_ventana.ventana_section} ${style_ventana.ventana_central}`} id="">
              <div className={style_ventana.ventana_contenido}>
                {children}
              </div>
            </section>
          </div>
          <div className={style_ventana.ventana_box}>
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
      </div>
      <div className={style_ventana.ventana_layout}>
          <div className={style_ventana.ventana_box}>
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
      </div>
    </article>
  );
}
