"use client";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode, useRef } from "react";
import style_ventana from "@/styles/sections/ventana.module.scss"
import style_global from "@/styles/base/global.module.scss"
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaLinkedin,
  FaEnvelope, 
  FaBriefcase,
  FaArrowUp, 
  FaGithubSquare,
  FaFacebookSquare
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";
import { SelectorItem } from "./sub_components/SelectorBtn";
import { BiMenu } from "react-icons/bi";
import { ImagenComponent } from "./sub_components/ImagenM";

interface VentanaProps {
  children: React.ReactNode;
  perfil: any; // O mejor aún, el tipo específico (ej. PerfilType[])
}

export default function Ventana({ children, perfil }: VentanaProps) {

  const contenidoRef = useRef<HTMLDivElement>(null);
  
  const user = perfil?.[0];
  const redesSociales = [
      { name: "whatsapp", icon: <FaWhatsapp />, url: `https://wa.me/${user?.numero_whatsapp}` },
      { name: "Linkedin", icon: <FaLinkedin />, url: `https://www.linkedin.com/in/${user?.nombre_linkedin}` },
      { name: "Github", icon: <FaGithubSquare />, url: `https://github.com/${user?.nombre_github}` },
      { name: "Facebook", icon: <FaFacebookSquare />, url: `https://www.facebook.com/${user?.nombre_facebook}` },
      { name: "Instagram", icon: <FaInstagram />, url: `https://www.instagram.com/${user?.nombre_instagram}` },
  ];

  const scrollToTop = () => {
    if (contenidoRef.current) {
      contenidoRef.current.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  };

  const expMenu = () => {
    if (contenidoRef.current) {
    } 
  }

  return (
    <main className={style_ventana.ventana}>
      <div className={style_ventana.ventana_layoutPrincipal}>
        <article id="" className={`${style_ventana.ventana_header_box_layout} ${style_ventana.seccionVentanaIzq}` }>
          <div id="articlePerfil" className={`${style_ventana.ventana_header_perfil}`}>
            <a href="#">
              <div className={`${style_ventana.ventana_header_box_imagen}`}>
                <ImagenComponent 
                  style={`${style_ventana.ventana_header_imagen_perfil}`}
                  url="/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg"
                  alt="Logo"
                  widthE={100}
                  heightE={145}
                  priority="prioridad"
                />
              </div>
            </a>
          </div>
          <div id="articleSelector" className={`${style_ventana.ventana_header_selector}`}>
            <div className={`${style_ventana.ventana_header_navegador}`}>
              <SelectorItem href="/perfil" Icon={BsFillPersonVcardFill} label="Perfil" lado="der"/>
              <SelectorItem href="/experiencia" Icon={FaBriefcase} label="Experiencia"  lado="der"/>
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
            <div className={style_ventana.ventana_central_contenido} >
              <div 
                id="articleUpward" 
                className={`${style_ventana.ventana_header_menu}`}
                onClick={expMenu}
                role="button"
                tabIndex={0}
              >
                <BiMenu size={24} className={style_global.ventana_menu_icono} />
              </div>
              <div>
                {/* <div key={seccion.id} className={styles_footer.footer_box}>
                  <h2 className={styles_footer.footer_h2}>{seccion.titulo}</h2>
                  <ul className={styles_footer.footer_ul}>
                    <li key={link.id} className={styles_footer.footer_li}>
                      <Link href={link.url} className={styles_footer.footer_a}>
                        {link.icon}
                        <span className={styles_footer.footer_span}>{link.name}</span>
                      </Link>
                      <Link href={href} className={style_ventana.ventana_header_link}>
                        <Icon 
                            className={style_ventana.ventana_header_link} 
                            style={{ 
                            color: isHovered ? "white" : "#555", 
                            transition: 'color 0.3s ease',
                            }}
                        />
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
              {children}
            </div>
            <Footer></Footer>
          </div>
        </article>
        <article id="" className={`${style_ventana.ventana_header_box_layout} ${style_ventana.seccionVentanaDer}` }>
          <div className={style_ventana.ventana_footer_layout}>
            <div className={style_ventana.ventana_footer_box}>
              <section className={`${style_ventana.ventana_footer_section} ${style_ventana.ventana_footer_lateral_derecho}`} id="">
                <article>
                  <div className={`${style_ventana.ventana_footer_navegador}`}>
                    <SelectorItem href={redesSociales[0].url} Icon={FaWhatsapp} label={redesSociales[0].name}  lado="izq"/>
                    <SelectorItem href={redesSociales[2].url} Icon={FaLinkedin} label={redesSociales[2].name} lado="izq"/>
                    <SelectorItem href={redesSociales[1].url} Icon={FaGithubSquare} label={redesSociales[1].name}  lado="izq"/>
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