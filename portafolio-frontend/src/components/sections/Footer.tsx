
"use client";
import Link from 'next/link';
import { LiaLinkedin } from 'react-icons/lia';
import styles_footer from '@/styles/sections/footer.module.scss';


import { BiBriefcase, AiTwotoneSchedule, BsFillPersonVcardFill, FaBriefcase, SiCodefactor, FaEnvelope, PiStack, IoIosRocket, FaGithub, FaWhatsapp, PiMicrosoftOutlookLogo} from "@/components/utils/Iconos";
import { ImagenComponent } from '../sub_components/ImagenM';

export default function Header() {

  const secciones = [
    { id: 'navegacion', titulo: 'Navegación' },
    { id: 'secciones', titulo: 'Secciones' },
    { id: 'contacto', titulo: 'Contacto' }
  ];

  const linksFooter = [
        { id:"1", seccion:"navegacion" , name: "Perfil", icon: <BsFillPersonVcardFill aria-hidden="true" size={18} />, url: `/perfil` },
        { id:"2", seccion:"navegacion" , name: "Trabajos", icon: <FaBriefcase aria-hidden="true" size={18} />, url: `/trabajos` },
        { id:"3", seccion:"navegacion" , name: "Servicios", icon: <SiCodefactor aria-hidden="true" size={18} />, url: `/servicios` },
        { id:"4", seccion:"navegacion" , name: "Contacto", icon: <FaEnvelope aria-hidden="true" size={18} />, url: `/contacto` },
        { id:"5", seccion:"secciones" , name: "Clientes", icon: <AiTwotoneSchedule aria-hidden="true" size={18} />, url: `` },
        { id:"6", seccion:"secciones" , name: "Trabajos", icon: <BiBriefcase aria-hidden="true" size={18} />, url: `` },
        { id:"7", seccion:"secciones" , name: "Habilidades", icon: <PiStack aria-hidden="true" size={18} />, url: `` },
        { id:"8", seccion:"secciones" , name: "Servicios", icon: <AiTwotoneSchedule aria-hidden="true" size={18} />, url: `` },
        { id:"9", seccion:"secciones" , name: "Trabajos", icon: <IoIosRocket aria-hidden="true" size={18} />, url: `` },
        { id:"10", seccion:"contacto" , name: "Linkedin", icon: <LiaLinkedin aria-hidden="true" size={18} />, url: `https://www.linkedin.com/in/pablo-daniel-chavez-4a57a2277/` },
        { id:"11", seccion:"contacto" , name: "GitHub", icon: <FaGithub aria-hidden="true" size={18} />, url: `https://github.com/PabloDanielChavez/portafolio` },
        { id:"12", seccion:"contacto" , name: "Whatsapp", icon: <FaWhatsapp aria-hidden="true" size={18} />, url: `https://wa.me/5491164095414?text=*Contacto%20desde%20el%20Portafolio*%0A%0AHola%20Pablo%2C%0A%0AVi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20que%20hablemos%20sobre%20un%20proyecto...` },
        { id:"13", seccion:"contacto" , name: "Pablo_daniel_Chavez@outlook.es", icon: <PiMicrosoftOutlookLogo aria-hidden="true" size={18} />, url: `mailto:pablo_daniel_chavez@outlook.es?subject=Contacto%20desde%20el%20Portafolio&body=Hola%20Pablo,%0A%0AVi%20tu%20portafolio%20y%20me%20gustaría%20que%20hablemos%20sobre%20un%20proyecto...` },
    ];

  return (
    <footer className={styles_footer.footer_grid_principal}>
      <div className={styles_footer.footer_box_logo}>
        <ImagenComponent 
            style={styles_footer.footer_imagen_logo}
            url={`/img/Logotipo_Portafolio_PDC/Logo/Logo_180x180px.png`}
            alt={"LOGOTIPO"}
            widthE={150}
            heightE={150}
            priority=""
        />
      </div>
      <div className={styles_footer.footer_grid_enlaces}>
        {secciones.map((seccion) => (
          <div key={seccion.id} className={styles_footer.footer_box}>
            <h2 className={styles_footer.footer_h2}>{seccion.titulo}</h2>
            <ul className={styles_footer.footer_ul}>
              {linksFooter
                .filter((link) => link.seccion === seccion.id)
                .map((link) => (
                  <li key={link.id} className={styles_footer.footer_li}>
                    <Link 
                      href={link.url} 
                      className={styles_footer.footer_a} 
                      aria-label={`Ir a ${link.name}`}
                    >
                      {link.icon}
                      <span className={styles_footer.footer_span}>
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles_footer.footer_box_copy}>
        <p className={styles_footer.footer_copy_p}>©2026 Pablo Daniel Chavez. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
