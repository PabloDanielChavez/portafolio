
"use client";
import Link from 'next/link';
import styles_footer from '../styles/sections/footer.module.scss';
import { PiMicrosoftOutlookLogo } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { FaGithub, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

export default function Header() {
  return (
    <footer className={styles_footer.footer_grid_principal}>
      <div className={styles_footer.footer_box_logo}>
        <Image 
            className={styles_footer.footer_imagen_logo} 
            src="/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg" 
            alt="LOGOTIPO"
            width={150}
            height={150}
        />
      </div>
      <div className={styles_footer.footer_grid_enlaces}>
        <div className={styles_footer.footer_box}>
          <h2 className={styles_footer.footer_h2}>Navegacion</h2>
          <ul className={styles_footer.footer_ul}>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <span className={styles_footer.footer_span}>Perfil</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <span className={styles_footer.footer_span}>Experiencia</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <span className={styles_footer.footer_span}>Servicios</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <span className={styles_footer.footer_span}>Contacto</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles_footer.footer_box}>
          <h2 className={styles_footer.footer_h2}>Contacto</h2>
          <ul className={styles_footer.footer_ul}>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <LiaLinkedin size={20} /> 
                <span className={styles_footer.footer_span}>Linkedin</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <FaGithub size={20} /> 
                <span className={styles_footer.footer_span}>GitHub</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <FaWhatsapp size={20} /> 
                <span className={styles_footer.footer_span}>Whatsapp</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <PiMicrosoftOutlookLogo size={20} /> 
                <span className={styles_footer.footer_span}>Pablo_daniel_Chavez@outlook.es</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles_footer.footer_box_copy}>
        <p className={styles_footer.footer_copy_p}>©2026 Pablo Daniel Chavez. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
