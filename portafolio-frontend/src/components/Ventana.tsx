"use client";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { ReactNode, useRef, useState, useEffect } from "react";
import style_ventana from "@/styles/sections/ventana.module.scss";
import style_global from "@/styles/base/global.module.scss";
import { 
  FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, 
  FaBriefcase, FaArrowUp, FaGithubSquare, FaFacebookSquare 
} from "react-icons/fa";
import { BsFillPersonVcardFill as BsPersonCard } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";
import { SelectorItem } from "./sub_components/SelectorBtn";
import { ImagenComponent } from "./sub_components/ImagenM";
import Link from "next/link";
import { trackEvent } from "./utils/Analytics";

interface VentanaProps {
  children: ReactNode;
  perfil: any;
}

export default function Ventana({ children, perfil }: VentanaProps) {
  const contenidoRef = useRef<HTMLDivElement>(null);
  const menuIzqRef = useRef<HTMLDivElement>(null);
  const menuDerRef = useRef<HTMLDivElement>(null);
  
  const [menuIzqAbierto, setMenuIzqAbierto] = useState<boolean | null>(null);
  const [menuDerAbierto, setMenuDerAbierto] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMenuIzqAbierto(false);
        setMenuDerAbierto(false);
      } else {
        setMenuIzqAbierto(true);
        setMenuDerAbierto(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const esMovil = () => window.innerWidth <= 768;

    const cerrarMenusSiEsMovil = () => {
      if (esMovil()) {
        setMenuIzqAbierto(false);
        setMenuDerAbierto(false);
      }
    };

    const handleClickFuera = (event: MouseEvent) => {
      if (!esMovil()) return;

      const target = event.target as HTMLElement;
      
      const clickDentroIzq = menuIzqRef.current?.contains(target);
      const clickDentroDer = menuDerRef.current?.contains(target);
      
      const clickEnHeader = target.closest("header") || target.closest('[role="button"]') || target.closest('button');

      if (!clickDentroIzq && !clickDentroDer && !clickEnHeader) {
        cerrarMenusSiEsMovil();
      }
    };

    document.addEventListener("click", handleClickFuera);
    window.addEventListener("scroll", cerrarMenusSiEsMovil, true); 

    return () => {
      document.removeEventListener("click", handleClickFuera);
      window.removeEventListener("scroll", cerrarMenusSiEsMovil, true);
    };
  }, []);

  const user = perfil?.[0];
  const redesSociales = [
      { name: "whatsapp", icon: <FaWhatsapp />, url: `https://wa.me/${user?.numero_whatsapp}` },
      { name: "Linkedin", icon: <FaLinkedin />, url: `https://www.linkedin.com/in/${user?.nombre_linkedin}` },
      { name: "Github", icon: <FaGithubSquare />, url: `https://github.com/${user?.nombre_github}` },
  ];

  const scrollToTop = () => {
    if (contenidoRef.current) {
      contenidoRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const expMenu = (lado: 'izq' | 'der') => {
    if (lado === 'izq') {
      setMenuIzqAbierto((prev) => !prev);
    } else {
      setMenuDerAbierto((prev) => !prev);
    }
  };

  const claseMenuIzq = menuIzqAbierto === null 
    ? style_ventana.seccionVentanaIzqCont 
    : (menuIzqAbierto ? style_ventana.seccionVentanaIzqExpa : style_ventana.seccionVentanaIzqCont);

  const claseMenuDer = menuDerAbierto === null 
    ? style_ventana.seccionVentanaDerCont 
    : (menuDerAbierto ? style_ventana.seccionVentanaDerExpa : style_ventana.seccionVentanaDerCont);

  return (
    <main className={style_ventana.ventana}>
      <nav className={style_ventana.ventana_layoutPrincipal}>
        <div ref={menuIzqRef} className={`${style_ventana.ventana_header_box_layout} ${claseMenuIzq}`}>
          <div id="articlePerfil" className={`${style_ventana.ventana_header_perfil}`}>
            <Link 
              href="/" 
              className={`${style_ventana.ventana_header_link}`} 
              aria-label="Ir al Inicio"
              onClick={() => {
                  trackEvent(`click_inicio`, {
                      section: "Ventana"
                  })
              }}  
            >
              <div className={`${style_ventana.ventana_header_box_imagen}`}>
                <ImagenComponent 
                  style={`${style_ventana.ventana_header_imagen_perfil}`}
                  url="/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png"
                  alt="Logo" widthE={100} heightE={145} priority="prioridad"
                />
              </div>
            </Link>
          </div>
          <div id="articleSelector" className={`${style_ventana.ventana_header_selector}`}>
            <div className={`${style_ventana.ventana_header_navegador}`}>
              <SelectorItem li={true} href="/" Icon={BsPersonCard} label="Perfil" lado="der" />
              <SelectorItem li={true} href="/trabajos" Icon={FaBriefcase} label="Trabajos" lado="der" />
              <SelectorItem li={true} href="/servicios" Icon={SiCodefactor} label="Servicios" lado="der" />
              <SelectorItem li={true} href="/contacto" Icon={FaEnvelope} label="Contacto" lado="der" />
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
            <SelectorItem li={false} href="" Icon={FaArrowUp} label="Subir" lado="der"/>
          </div>
        </div>
        <div className={style_ventana.ventana_central_box_layout}>
          <div className={style_ventana.ventana_central_box} ref={contenidoRef}>
            <Header expMenu={expMenu} />
            <div className={style_ventana.ventana_central_contenido} >
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <div ref={menuDerRef} className={`${style_ventana.ventana_header_box_layout} ${claseMenuDer}`}>
          <div className={style_ventana.ventana_footer_layout}>
            <div className={style_ventana.ventana_footer_box}>
              <section className={`${style_ventana.ventana_footer_section} ${style_ventana.ventana_footer_lateral_derecho}`}>
                <article>
                  <div className={`${style_ventana.ventana_footer_navegador}  ${style_global.animacion_btn} `}>
                    <SelectorItem li={true} href={redesSociales[0].url} Icon={FaWhatsapp} label={redesSociales[0].name} lado="izq"/>
                    <SelectorItem li={true} href={redesSociales[1].url} Icon={FaLinkedin} label={redesSociales[1].name} lado="izq"/>
                    <SelectorItem li={true} href={redesSociales[2].url} Icon={FaGithubSquare} label={redesSociales[2].name} lado="izq"/>
                  </div>
                </article>
              </section>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}