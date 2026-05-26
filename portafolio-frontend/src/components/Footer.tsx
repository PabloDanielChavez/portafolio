
"use client";
import Link from 'next/link';
import styles_footer from '../styles/sections/footer.module.scss';
import { PiMicrosoftOutlookLogo, PiStack } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { FaBriefcase, FaEnvelope, FaGithub, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { SiCodefactor } from 'react-icons/si';
import { BiBriefcase } from 'react-icons/bi';
import { AiTwotoneSchedule } from 'react-icons/ai';
import { IoIosRocket } from 'react-icons/io';

export default function Header() {
  return (
    <footer className={styles_footer.footer_grid_principal}>
      <div className={styles_footer.footer_box_logo}>
        <Image 
            className={styles_footer.footer_imagen_logo} 
            src="/img/Logotipo_Portafolio_PDC/Logo/Logo_48x48px.jpg"
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
                <BsFillPersonVcardFill size={20} />
                <span className={styles_footer.footer_span}>Perfil</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <FaBriefcase size={20} />
                <span className={styles_footer.footer_span}>Experiencia</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <SiCodefactor size={20} />
                <span className={styles_footer.footer_span}>Servicios</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <FaEnvelope size={20} />
                <span className={styles_footer.footer_span}>Contacto</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles_footer.footer_box}>
          <h2 className={styles_footer.footer_h2}>Secciones</h2>
          <ul className={styles_footer.footer_ul}>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <AiTwotoneSchedule size={20} /> 
                <span className={styles_footer.footer_span}>Clientes</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <BiBriefcase size={20} /> 
                <span className={styles_footer.footer_span}>Experiencia</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <PiStack size={20} /> 
                <span className={styles_footer.footer_span}>Habilidades</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <AiTwotoneSchedule size={20} /> 
                <span className={styles_footer.footer_span}>Servicios</span>
              </a>
            </li>
            <li className={styles_footer.footer_li}>
              <a href={`/`} className={styles_footer.footer_a}>
                <IoIosRocket size={20} /> 
                <span className={styles_footer.footer_span}>Trabajos</span>
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
