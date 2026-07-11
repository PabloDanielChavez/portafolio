import Link from "next/link";

import { FaArrowDown, FaCheck, FaWhatsapp } from "@/components/utils/Iconos";
import { heroContent } from "@/content/hero.content";
import type { PerfilType } from "@/types/perfil";
import styles from "@/styles/sections/hero.module.scss";

import { mensajePresupuesto } from "../utils/variables";

interface Props {
    perfil: PerfilType[];
}

export default function Hero({ perfil }: Props) {
    const whatsapp = String(perfil[0]?.numero_whatsapp ?? "").replace(/\D/g, "");
    const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}?text=${mensajePresupuesto}`: "/contacto";

    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.hero_layout}>
                <div className={styles.hero_content}>
                    <span className={styles.hero_eyebrow}>
                        <span className={styles.hero_eyebrow_mark} aria-hidden="true" />
                        {heroContent.eyebrow}
                    </span>

                    <h1 id="hero-title" className={styles.hero_title}>
                        {heroContent.title.beforeHighlight}{" "}
                        <strong>{heroContent.title.highlight}</strong>{" "}
                        {heroContent.title.afterHighlight}
                    </h1>
                    <p className={styles.hero_description}>{heroContent.description}</p>
                    <div className={styles.hero_actions}>
                        <Link
                            href={whatsappHref}
                            className={styles.hero_primary}
                            target={whatsapp ? "_blank" : undefined}
                            rel={whatsapp ? "noopener noreferrer" : undefined}
                        >
                            <FaWhatsapp aria-hidden="true" />
                            {heroContent.actions.primary}
                        </Link>
                        <Link href="#planes" className={styles.hero_secondary}>
                            {heroContent.actions.secondary}
                            <FaArrowDown aria-hidden="true" />
                        </Link>
                    </div>
                    <p className={styles.hero_note}>
                        <span aria-hidden="true" />
                        {heroContent.note}
                    </p>
                </div>
                <aside className={styles.hero_panel} aria-label={heroContent.panel.ariaLabel}>
                    <div className={styles.hero_panel_header}>
                        <span className={styles.hero_panel_label}>
                            {heroContent.panel.label}
                        </span>
                        <span className={styles.hero_panel_number} aria-hidden="true">01</span>
                    </div>
                    <h2 className={styles.hero_panel_title}>
                        {heroContent.panel.title}
                    </h2>
                    <ul className={styles.hero_benefits}>
                        {heroContent.panel.benefits.map((beneficio) => (
                            <li key={beneficio}>
                                <span className={styles.hero_benefit_icon} aria-hidden="true">
                                    <FaCheck />
                                </span>
                                <span>{beneficio}</span>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.hero_panel_footer}>
                        <span className={styles.hero_panel_footer_mark} aria-hidden="true" />
                        <div className={styles.hero_panel_footer_copy}>
                            <span>{heroContent.panel.footerLabel}</span>
                            <strong>{heroContent.panel.footerValue}</strong>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}