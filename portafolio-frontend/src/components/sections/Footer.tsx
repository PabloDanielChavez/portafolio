"use client";

import Image from "next/image";
import Link from "next/link";
import { LiaLinkedin } from "react-icons/lia";

import {
    FaGithub,
    FaWhatsapp,
    PiMicrosoftOutlookLogo
} from "@/components/utils/Iconos";
import styles from "@/styles/sections/footer.module.scss";

import { trackEvent } from "../utils/Analytics";

const navigation = [
    { name: "Inicio", url: "/" },
    { name: "Trabajos", url: "/trabajos" },
    { name: "Servicios", url: "/servicios" },
    { name: "Planes", url: "/#planes" },
    { name: "Perfil", url: "/perfil" },
    { name: "Contacto", url: "/contacto" }
];

const contact = [
    {
        name: "LinkedIn",
        icon: <LiaLinkedin aria-hidden="true" />,
        url: "https://www.linkedin.com/in/pablo-daniel-chavez-4a57a2277/"
    },
    {
        name: "GitHub",
        icon: <FaGithub aria-hidden="true" />,
        url: "https://github.com/PabloDanielChavez/portafolio"
    },
    {
        name: "WhatsApp",
        icon: <FaWhatsapp aria-hidden="true" />,
        url: "https://wa.me/5491164095914?text=Hola%20Pablo%2C%20vi%20tu%20portafolio%20y%20quiero%20consultarte%20por%20un%20proyecto."
    },
    {
        name: "Email",
        icon: <PiMicrosoftOutlookLogo aria-hidden="true" />,
        url: "mailto:pablo_daniel_chavez@outlook.es?subject=Consulta%20desde%20el%20portafolio"
    }
];

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_layout}>
                <div className={styles.footer_brand}>
                    <Link href="/" aria-label="Ir al inicio">
                        <Image
                            src="/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png"
                            alt="PaginasWeb Chavez"
                            width={56}
                            height={56}
                            sizes="56px"
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
                    © 2026 PaginasWeb Chavez · Pablo Daniel Chavez
                </p>
            </div>
        </div>
    );
}
