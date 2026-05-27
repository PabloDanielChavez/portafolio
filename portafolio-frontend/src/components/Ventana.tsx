"use client";
import Header from "@/components/Header";
import { ReactNode, useRef } from "react"; // 1. Importamos useRef (puedes quitar useState si no lo usas)
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
import { SelectorItem } from "./sub_components/SelectorBtn";

interface VentanaProps {
  children: ReactNode;
}

export default function Ventana({ children }: VentanaProps) {

  // 2. Creamos la referencia para el contenedor que realmente tiene el scroll
  const contenidoRef = useRef<HTMLDivElement>(null);

  // 3. Modificamos la función para que apunte a la referencia y no a 'window'
  const scrollToTop = () => {
    if (contenidoRef.current) {
      contenidoRef.current.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  };

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
              <SelectorItem href="/perfil" Icon={BsFillPersonVcardFill} label="Perfil" lado="der"/>
              <SelectorItem href="/Experiencia" Icon={FaBriefcase} label="Experiencia"  lado="der"/>
              <SelectorItem href="/servicios" Icon={SiCodefactor} label="servicios"  lado="der"/>
              <SelectorItem href="/contacto" Icon={FaEnvelope} label="contacto"  lado="der"/>
            </div>
          </div>
          <div 
            id="articleUpward" 
            className={`${style_ventana.ventana_header_upward}`}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          > 
            <article className={`${style_ventana.ventana_header_selector_box}`}>
              <div className={`${style_ventana.ventana_header_selector_opcion} `}>
                <FaArrowUp className={style_global.tamaño_icono} />
              </div>
            </article>
          </div>
        </article>
        <article className={style_ventana.ventana_central_box_layout}>
          <div className={style_ventana.ventana_central_box} ref={contenidoRef}>
            <Header></Header>
            {/* 4. Le pasamos la referencia 'ref' al contenedor de children */}
            <div className={style_ventana.ventana_central_contenido} >
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
                    <SelectorItem href="/" Icon={FaInstagram} label="Instagram" lado="izq"/>
                    <SelectorItem href="/" Icon={FaWhatsapp} label="Whatsapp"  lado="izq"/>
                    <SelectorItem href="/" Icon={FaLinkedin} label="Linkedin"  lado="izq"/>
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