"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '@/styles/sections/header.module.scss';
import { BiBriefcase, BiCog, BiHomeAlt2, BiMenu, IoIosPerson, MdInfoOutline, SiCodefactor, } from "@/components/utils/Iconos";

export default function Header() {
    const menu = [
        { id: 1, titulo: "Inicio", target: "/", icono: <BiHomeAlt2 aria-label='btn inicio' size={20} />},
        { id: 2, titulo: "Perfil", target: "/perfil", icono: <IoIosPerson aria-label='btn perfil' size={20} />},
        { id: 3, titulo: "Trabajos", target: "/trabajos", icono: <BiBriefcase aria-label='btn trabajos' size={20} />},
        { id: 4, titulo: "Servicios", target: "/servicios", icono: <SiCodefactor aria-label='btn servicios' size={20} />},
        { id: 5, titulo: "Contacto", target: "/contacto", icono: <MdInfoOutline aria-label='btn contacto' size={20} />},
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
        <header className={`${styles.header} ${isScrolled ? styles.header_scrolled : ''}`}>
            <div className={styles.header_container}>
                <Link href="/" className={styles.header_logo} aria-label="Ir a inicio">
                    <div className={styles.header_logo_box}>
                        <Image 
                            className={styles.header_logo_img}
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
                    className={styles.header_menuBtn} 
                    aria-label="Abrir menú de navegación"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <BiMenu size={32} />
                </button>
            </div>
            <nav className={`${styles.header_nav}`} aria-label="Navegación principal">
                <ul className={`${styles.header_ul} ${isMenuOpen ? styles.header_activo : styles.header_desactivado}`}>
                    {menu.map((menu) => (
                    <li 
                        key={menu.id} 
                        className={styles.header_li} 
                        aria-label={`Navegacion ${menu.titulo}`}
                    >
                        <Link 
                            href={menu.target} 
                            className={`${styles.header_LINK} ${styles.header_li}`}
                            prefetch={false}
                        >
                            {menu.icono}
                            <span className={styles.header_spanNav}>{menu.titulo}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
