"use client";

import Image from "next/image";
import Link from "next/link";
import { LiaLinkedin } from "react-icons/lia";

import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp
} from "@/components/utils/Iconos";
import styles from "@/styles/sections/footer.module.scss";

import { trackEvent } from "../utils/Analytics";

const navigation = [
    { name: "Inicio", url: "/" },
    { name: "Servicios", url: "/servicios" },
    { name: "Trabajos", url: "/trabajos" },
    { name: "Perfil", url: "/perfil" },
    { name: "Hablemos", url: "/contacto" }
];

const contact = [
    {
        name: "WhatsApp",
        icon: <FaWhatsapp aria-hidden="true" />,
        url: "https://wa.me/5491164095914?text=Hola%20Pablo%2C%20vi%20tu%20portafolio%20y%20quiero%20consultarte%20por%20un%20proyecto."
    },
    {
        name: "Instagram",
        icon: <FaInstagram aria-hidden="true" />,
        url: "https://www.instagram.com/paginaswebchavez/"
    },
    {
        name: "LinkedIn",
        icon: <FaLinkedin aria-hidden="true" />,
        url: "https://www.linkedin.com/in/pablo-daniel-chavez-4a57a2277/"
    },
    {
        name: "GitHub",
        icon: <FaGithub aria-hidden="true" />,
        url: "https://github.com/PabloDanielChavez/portafolio"
    }
];

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_layout}>
                <div className={styles.footer_brand}>
                    <Link href="/" aria-label="Ir al inicio">
                        <img
                            className={styles.header_logo_img}
                            src="/img/Logotipo_Portafolio_PDC/Logo/logo_pwc.svg"
                            alt="PaginasWeb Chavez"
                            width={50}
                            height={50}
                        />
                    </Link>
                    <div>
                        <strong>PaginasWeb Chavez</strong>
                        <p>Diseño y desarrollo web profesional.</p>
                    </div>
                </div>

                <nav className={styles.footer_nav} aria-label="Navegación del pie">
                    {navigation.map((item) => (
                        <Link key={item.url + item.name} href={item.url}>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className={styles.footer_social} aria-label="Canales de contacto">
                    {contact.map((item) => (
                        <Link
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.name}
                            onClick={() =>
                                trackEvent("social_click", {
                                    section: "Footer",
                                    network: item.name
                                })
                            }
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>

                <p className={styles.footer_copy}>
                    © 2026 PaginasWebChavez · Pablo Daniel Chavez
                </p>
            </div>
        </div>
    );
}
