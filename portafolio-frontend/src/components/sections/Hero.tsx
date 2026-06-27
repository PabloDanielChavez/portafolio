import Link from "next/link";

import { FaArrowDown, FaCheck, FaWhatsapp } from "@/components/utils/Iconos";
import type { PerfilType } from "@/types/perfil";
import styles from "@/styles/sections/hero.module.scss";

import { mensajePresupuesto } from "../utils/variables";

interface Props {
    perfil: PerfilType[];
}

const beneficios = [
    "SEO técnico",
    "Diseño responsive",
    "WhatsApp integrado",
    "Carga rápida"
];

export default function Hero({ perfil }: Props) {
    const whatsapp = String(perfil[0]?.numero_whatsapp ?? "").replace(/\D/g, "");
    const whatsappHref = whatsapp
        ? `https://wa.me/${whatsapp}?text=${mensajePresupuesto}`
        : "/contacto";

    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.hero_layout}>
                <div className={styles.hero_content}>
                    <span className={styles.hero_eyebrow}>
                        Diseño y desarrollo web
                    </span>

                    <h1 id="hero-title" className={styles.hero_title}>
                        Páginas web que transmiten{" "}
                        <strong>confianza</strong> y generan consultas
                    </h1>

                    <p className={styles.hero_description}>
                        Creo sitios web rápidos, modernos y optimizados para Google,
                        pensados para que tu negocio se vea profesional y convierta
                        visitas en clientes.
                    </p>

                    <div className={styles.hero_actions}>
                        <Link
                            href={whatsappHref}
                            className={styles.hero_primary}
                            target={whatsapp ? "_blank" : undefined}
                            rel={whatsapp ? "noopener noreferrer" : undefined}
                        >
                            <FaWhatsapp aria-hidden="true" />
                            Solicitar presupuesto
                        </Link>

                        <Link href="#trabajos" className={styles.hero_secondary}>
                            Ver trabajos
                            <FaArrowDown aria-hidden="true" />
                        </Link>
                    </div>

                    <p className={styles.hero_note}>
                        Propuesta clara, trato directo y acompañamiento después de publicar.
                    </p>
                </div>

                <aside className={styles.hero_panel} aria-label="Qué incluye cada proyecto">
                    <span className={styles.hero_panel_label}>Una base sólida para crecer</span>
                    <h2>Tu web lista para verse bien y trabajar para tu negocio.</h2>

                    <ul className={styles.hero_benefits}>
                        {beneficios.map((beneficio) => (
                            <li key={beneficio}>
                                <span aria-hidden="true"><FaCheck /></span>
                                {beneficio}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.hero_panel_footer}>
                        <span>Enfoque</span>
                        <strong>Claridad · rendimiento · conversión</strong>
                    </div>
                </aside>
            </div>
        </section>
    );
}
