import Link from "next/link";

import { FaArrowRight, FaCheck, FaWhatsapp } from "@/components/utils/Iconos";
import { mensajePresupuesto } from "@/components/utils/variables";
import { homeContent } from "@/content/home.content";
import styles from "@/styles/sections/home.module.scss";
import type { PerfilType } from "@/types/perfil";

type TrustBarProps = {
    projectCount: number;
};

export function TrustBar({ projectCount }: TrustBarProps) {
    const indicadores = [
        {
            valor: `${projectCount}${homeContent.trust.projects.valueSuffix}`,
            etiqueta: homeContent.trust.projects.label
        },
        ...homeContent.trust.indicators.map((indicator) => ({
            valor: indicator.value,
            etiqueta: indicator.label
        }))
    ];

    return (
        <section
            className={styles.trust}
            aria-label={homeContent.trust.ariaLabel}
        >
            <div className={styles.trust_grid}>
                {indicadores.map((indicador) => (
                    <div className={styles.trust_item} key={indicador.etiqueta}>
                        <strong>{indicador.valor}</strong>
                        <span>{indicador.etiqueta}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function Proceso() {
    return (
        <section className={styles.process} id="proceso" aria-labelledby="proceso-title">
            <div className={styles.process_layout}>
                <header className={styles.process_header}>
                    <span>{homeContent.process.eyebrow}</span>
                    <h2 id="proceso-title">{homeContent.process.title}</h2>
                    <p>{homeContent.process.description}</p>
                </header>

                <ol className={styles.process_grid}>
                    {homeContent.process.steps.map((paso) => (
                        <li className={styles.process_card} key={paso.number}>
                            <span className={styles.process_number}>{paso.number}</span>
                            <h3>{paso.title}</h3>
                            <p>{paso.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function FinalCta({ perfil }: { perfil: PerfilType[] }) {
    const whatsapp = String(perfil[0]?.numero_whatsapp ?? "").replace(/\D/g, "");
    const whatsappHref = whatsapp
        ? `https://wa.me/${whatsapp}?text=${mensajePresupuesto}`
        : "/contacto";

    return (
        <section className={styles.cta} id="contacto" aria-labelledby="cta-title">
            <div className={styles.cta_card}>
                <div>
                    <span className={styles.cta_label}>
                        {homeContent.finalCta.label}
                    </span>
                    <h2 id="cta-title">{homeContent.finalCta.title}</h2>
                    <p>{homeContent.finalCta.description}</p>
                    <div className={styles.cta_checks}>
                        {homeContent.finalCta.checks.map((check) => (
                            <span key={check}>
                                <FaCheck aria-hidden="true" /> {check}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.cta_actions}>
                    <Link
                        href={whatsappHref}
                        className={styles.cta_primary}
                        target={whatsapp ? "_blank" : undefined}
                        rel={whatsapp ? "noopener noreferrer" : undefined}
                    >
                        <FaWhatsapp aria-hidden="true" />
                        {homeContent.finalCta.primaryAction}
                    </Link>
                    <Link href="/contacto" className={styles.cta_secondary}>
                        {homeContent.finalCta.secondaryAction}
                        <FaArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
