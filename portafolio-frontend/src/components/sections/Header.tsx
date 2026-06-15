"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles_header from '@/styles/sections/header.module.scss';
import Image from 'next/image';
import { BiBriefcase, BiCog, BiHomeAlt2, BiMenu, MdInfoOutline, } from "@/components/utils/Iconos";

export default function Header() {
    const menu = [
        { id: 1, titulo: "Inicio", target: "/", icono: <BiHomeAlt2 size={20} />},
        { id: 2, titulo: "Trabajos", target: "/trabajos", icono: <BiBriefcase size={20} />},
        { id: 3, titulo: "Servicios", target: "/servicios", icono: <BiCog size={20} />},
        { id: 4, titulo: "Contacto", target: "/contacto", icono: <MdInfoOutline size={20} />},
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

        useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        }, 
        []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <header className={`${styles_header.header} ${isScrolled ? styles_header.header_scrolled : ''}`}>
            <div className={styles_header.header_container}>
                <Link href="/" className={styles_header.header_logo} aria-label="Ir a inicio">
                    <div className={styles_header.header_icono_box}>
                        <Image 
                            className={styles_header.header_icono_img}
                            src={`/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png`} 
                            alt={"LOGOTIPO"}
                            title={"LOGOTIPO"}
                            width={50} 
                            height={50}
                            sizes="50px"
                        />
                    </div> 
                </Link>
                <button 
                    className={styles_header.header_menuBtn} 
                    aria-label="Abrir menú de navegación"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <BiMenu size={32} />
                </button>
            </div>
            <nav className={`${styles_header.header_nav}`} aria-label="Navegación principal">
                <ul className={`${styles_header.header_ul} ${isMenuOpen ? styles_header.header_activo : styles_header.header_desactivado}`}>
                    {menu.map((menu) => (
                    <li 
                        key={menu.id} 
                        className={styles_header.header_li} 
                        aria-label={`Navegacion ${menu.titulo}`}
                    >
                        <Link 
                            href={menu.target} 
                            className={`${styles_header.header_LINK} ${styles_header.header_li}`}
                            prefetch={false}
                        >
                            {menu.icono}
                            <span className={styles_header.header_spanNav}>{menu.titulo}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}