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
    const whatsappHref = whatsapp
        ? `https://wa.me/${whatsapp}?text=${mensajePresupuesto}`
        : "/contacto";

    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.hero_layout}>
                <div className={styles.hero_content}>
                    <span className={styles.hero_eyebrow}>
                        {heroContent.eyebrow}
                    </span>

                    <h1 id="hero-title" className={styles.hero_title}>
                        {heroContent.title.beforeHighlight}{" "}
                        <strong>{heroContent.title.highlight}</strong>{" "}
                        {heroContent.title.afterHighlight}
                    </h1>

                    <p className={styles.hero_description}>
                        {heroContent.description}
                    </p>

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
                        {heroContent.note}
                    </p>
                </div>

                <aside
                    className={styles.hero_panel}
                    aria-label={heroContent.panel.ariaLabel}
                >
                    <span className={styles.hero_panel_label}>
                        {heroContent.panel.label}
                    </span>
                    <h2>{heroContent.panel.title}</h2>

                    <ul className={styles.hero_benefits}>
                        {heroContent.panel.benefits.map((beneficio) => (
                            <li key={beneficio}>
                                <span aria-hidden="true"><FaCheck /></span>
                                {beneficio}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.hero_panel_footer}>
                        <span>{heroContent.panel.footerLabel}</span>
                        <strong>{heroContent.panel.footerValue}</strong>
                    </div>
                </aside>
            </div>
        </section>
    );
}
