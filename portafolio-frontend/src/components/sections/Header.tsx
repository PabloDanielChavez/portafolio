"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    BiBriefcase,
    BiHomeAlt2,
    BiMenu,
    IoIosPerson,
    MdInfoOutline,
    SiCodefactor
} from "@/components/utils/Iconos";

import styles from "@/styles/sections/header.module.scss";

const menu = [
    {
        id: 1,
        titulo: "Inicio",
        target: "/",
        icono: <BiHomeAlt2 size={20} />
    },
    {
        id: 2,
        titulo: "Servicios",
        target: "/servicios",
        icono: <SiCodefactor size={20} />
    },
    {
        id: 3,
        titulo: "Trabajos",
        target: "/trabajos",
        icono: <BiBriefcase size={20} />
    },
    {
        id: 4,
        titulo: "Perfil",
        target: "/perfil",
        icono: <IoIosPerson size={20} />
    },
    {
        id: 5,
        titulo: "Hablemos",
        target: "/contacto",
        icono: <MdInfoOutline size={20} />
    }
] as const;

const SCROLL_THRESHOLD = 40;
const TABLET_MEDIA_QUERY = "(min-width: 974px)";

export default function Header() {
    const pathname = usePathname();

    const headerRef = useRef<HTMLElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    /*
     * Detecta el desplazamiento y activa la versión
     * compacta del header.
     */
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /*
     * Cierra automáticamente el menú cuando cambia la ruta.
     */
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    /*
     * Permite cerrar el menú con Escape.
     * Al cerrarlo, devuelve el foco al botón.
     */
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;

            setIsMenuOpen(false);
            menuButtonRef.current?.focus();
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    /*
     * Cierra el menú móvil al hacer clic fuera del header.
     */
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleOutsideClick = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) return;

            if (!headerRef.current?.contains(target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleOutsideClick
            );
        };
    }, [isMenuOpen]);

    /*
     * Al pasar a tablet o escritorio, limpia el estado
     * del menú móvil.
     */
    useEffect(() => {
        const mediaQuery = window.matchMedia(TABLET_MEDIA_QUERY);

        const handleDesktopChange = (
            event: MediaQueryListEvent
        ) => {
            if (event.matches) {
                setIsMenuOpen(false);
            }
        };

        if (mediaQuery.matches) {
            setIsMenuOpen(false);
        }

        mediaQuery.addEventListener(
            "change",
            handleDesktopChange
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleDesktopChange
            );
        };
    }, []);

    /*
     * Determina el enlace activo.
     *
     * Inicio solo queda activo en "/".
     * El resto también reconoce rutas internas:
     * /servicios/landing-page, /trabajos/proyecto, etc.
     */
    const isCurrentRoute = (target: string) => {
        if (target === "/") {
            return pathname === "/";
        }

        return (
            pathname === target ||
            pathname.startsWith(`${target}/`)
        );
    };

    const handleMenuToggle = () => {
        setIsMenuOpen((currentState) => !currentState);
    };

    const handleNavigation = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            ref={headerRef}
            className={[
                styles.header,
                isScrolled ? styles.header_scrolled : ""
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className={styles.header_container}>
                <Link
                    href="/"
                    className={styles.header_logo}
                    aria-label="Ir al inicio de PaginasWeb Chavez"
                    onClick={handleNavigation}
                >
                    <span className={styles.header_logo_box}>
                        <img
                            className={styles.header_logo_img}
                            src="/img/Logotipo_Portafolio_PDC/Logo/logo_pwc.svg"
                            alt="PaginasWeb Chavez"
                            width={50}
                            height={50}
                        />
                    </span>
                </Link>

                <nav
                    className={styles.header_nav}
                    aria-label="Navegación principal"
                >
                    <ul
                        id="main-navigation"
                        className={[
                            styles.header_ul,
                            isMenuOpen
                                ? styles.header_activo
                                : styles.header_desactivado
                        ].join(" ")}
                    >
                        {menu.map((item) => {
                            const isActive = isCurrentRoute(
                                item.target
                            );
                            const esEnlaceAccion =
                                item.target === "/contacto";

                            return (
                                <li
                                    key={item.id}
                                    className={styles.header_li}
                                >
                                    <Link
                                        href={item.target}
                                        className={[
                                            styles.header_LINK,
                                            esEnlaceAccion
                                                ? styles.header_enlace_accion
                                                : ""
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        aria-current={
                                            isActive
                                                ? "page"
                                                : undefined
                                        }
                                        data-active={
                                            isActive
                                                ? "true"
                                                : undefined
                                        }
                                        prefetch={false}
                                        onClick={handleNavigation}
                                    >
                                        <span
                                            className={
                                                styles.header_icon
                                            }
                                            aria-hidden="true"
                                        >
                                            {item.icono}
                                        </span>

                                        <span>{item.titulo}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <button
                    ref={menuButtonRef}
                    type="button"
                    className={styles.header_menuBtn}
                    aria-label={
                        isMenuOpen
                            ? "Cerrar menú de navegación"
                            : "Abrir menú de navegación"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                    onClick={handleMenuToggle}
                >
                    <BiMenu
                        size={28}
                        aria-hidden="true"
                    />
                </button>
            </div>
        </header>
    );
}
