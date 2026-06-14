"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles_header from '@/styles/sections/header.module.scss';
import { BiBriefcase, BiCog, BiHomeAlt2, BiMenu, BiX } from 'react-icons/bi';
import { MdInfoOutline  } from 'react-icons/md';
import { usePathname } from 'next/navigation'; // Útil para verificar si estás en inicio o detalle
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Mantenemos la lógica de navegación
    const menuItems = [
        { id: 1, titulo: "Inicio", url: "/", icono: <BiHomeAlt2 size={24} /> },
        { id: 2, titulo: "Trabajos",  url: "/trabajos", icono: <BiBriefcase size={24} /> },
        { id: 3, titulo: "Servicios",  url: "/servicios", icono: <BiCog size={24} /> },
        { id: 4, titulo: "Contacto",  url: "/contacto", icono: <MdInfoOutline size={24} /> }
    ];

    const handleNavClick = (targetId: string) => {
        setIsMenuOpen(false);
        // Si estamos en una página de detalle, redirigimos a home primero
        if (pathname !== '/') {
            window.location.href = `/#${targetId}`;
        } else {
            const element = document.getElementById(targetId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`${styles_header.header} ${isScrolled ? styles_header.header_scrolled : ''}`}>
            <div className={styles_header.header_container}>
                <Link href="/" className={styles_header.header_logo} aria-label="Ir a inicio">
                    <div className={styles_header.header_icono_box}>
                      <Image 
                          className={styles_header.header_icono_img}
                          src={`/img/Logotipo_Portafolio_PDC/Logo/logo_PW_1.avif`} 
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
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isMenuOpen ? <BiX size={32} /> : <BiMenu size={32} />}
                </button>
            </div>

            <nav className={`${styles_header.header_nav} ${isMenuOpen ? styles_header.header_activo : ''}`}>
                <ul className={styles_header.header_ul}>
                    {menuItems.map((item) => (
                      <li key={item.id} className={styles_header.header_li}>
                        <Link href={`${item.url}`} className={styles_header.header_logo} aria-label="Ir a inicio">
                            <button 
                                className={styles_header.header_navLink}
                            >
                                {item.icono}
                                <span className={styles_header.header_spanNav}>{item.titulo}</span>
                            </button>
                        </Link>
                      </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}