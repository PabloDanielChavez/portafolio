"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
    BiBriefcase,
    BiHomeAlt2,
    BiMenu,
    IoIosPerson,
    MdInfoOutline,
    SiCodefactor,
    TbChartBarPopular
} from "@/components/utils/Iconos";
import styles from "@/styles/sections/header.module.scss";

const menu = [
    { id: 1, titulo: "Inicio", target: "/", icono: <BiHomeAlt2 size={20} /> },
    { id: 2, titulo: "Trabajos", target: "/trabajos", icono: <BiBriefcase size={20} /> },
    { id: 3, titulo: "Servicios", target: "/servicios", icono: <SiCodefactor size={20} /> },
    { id: 4, titulo: "Planes", target: "/#planes", icono: <TbChartBarPopular size={20} /> },
    { id: 5, titulo: "Perfil", target: "/perfil", icono: <IoIosPerson size={20} /> },
    { id: 6, titulo: "Contacto", target: "/contacto", icono: <MdInfoOutline size={20} /> }
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className={`${styles.header} ${isScrolled ? styles.header_scrolled : ""}`}>
            <div className={styles.header_container}>
                <Link href="/" className={styles.header_logo} aria-label="Ir al inicio">
                    <span className={styles.header_logo_box}>
                        <Image
                            className={styles.header_logo_img}
                            src="/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png"
                            alt="PaginasWeb Chavez"
                            width={50}
                            height={50}
                            sizes="50px"
                            priority
                        />
                    </span>
                </Link>

                <nav className={styles.header_nav} aria-label="Navegación principal">
                    <ul
                        id="main-navigation"
                        className={`${styles.header_ul} ${
                            isMenuOpen ? styles.header_activo : styles.header_desactivado
                        }`}
                    >
                        {menu.map((item) => (
                            <li key={item.id} className={styles.header_li}>
                                <Link
                                    href={item.target}
                                    className={styles.header_LINK}
                                    prefetch={false}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className={styles.header_icon} aria-hidden="true">
                                        {item.icono}
                                    </span>
                                    <span>{item.titulo}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    type="button"
                    className={styles.header_menuBtn}
                    aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <BiMenu size={28} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
