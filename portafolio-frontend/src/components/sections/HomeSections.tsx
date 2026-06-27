import Link from "next/link";

import { FaArrowRight, FaCheck, FaWhatsapp } from "@/components/utils/Iconos";
import { mensajePresupuesto } from "@/components/utils/variables";
import styles from "@/styles/sections/home.module.scss";
import type { PerfilType } from "@/types/perfil";

type TrustBarProps = {
    projectCount: number;
};

const proceso = [
    { numero: "01", titulo: "Análisis", texto: "Entendemos el negocio y el objetivo." },
    { numero: "02", titulo: "Propuesta", texto: "Definimos alcance, estructura y tiempos." },
    { numero: "03", titulo: "Desarrollo", texto: "Construyo y revisamos avances claros." },
    { numero: "04", titulo: "Entrega", texto: "Publicamos y dejamos todo preparado." },
    { numero: "05", titulo: "Acompañamiento", texto: "Seguimos en contacto después del lanzamiento." }
];

export function TrustBar({ projectCount }: TrustBarProps) {
    const indicadores = [
        { valor: `${projectCount}+`, etiqueta: "proyectos publicados" },
        { valor: "SEO", etiqueta: "técnico incluido" },
        { valor: "100%", etiqueta: "diseño responsive" },
        { valor: "WhatsApp", etiqueta: "contacto directo" }
    ];

    return (
        <section className={styles.trust} aria-label="Indicadores de confianza">
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
                    <span>Cómo trabajamos</span>
                    <h2 id="proceso-title">Un proceso simple, con avances claros</h2>
                    <p>
                        Cada etapa tiene un objetivo concreto para que sepas qué estamos
                        resolviendo y qué sigue.
                    </p>
                </header>

                <ol className={styles.process_grid}>
                    {proceso.map((paso) => (
                        <li className={styles.process_card} key={paso.numero}>
                            <span className={styles.process_number}>{paso.numero}</span>
                            <h3>{paso.titulo}</h3>
                            <p>{paso.texto}</p>
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
                    <span className={styles.cta_label}>Tu próximo proyecto</span>
                    <h2 id="cta-title">Hagamos que tu negocio se vea tan profesional como es.</h2>
                    <p>
                        Contame qué necesitás y te respondo con una propuesta clara,
                        sin vueltas ni paquetes inflados.
                    </p>
                    <div className={styles.cta_checks}>
                        <span><FaCheck aria-hidden="true" /> Respuesta personalizada</span>
                        <span><FaCheck aria-hidden="true" /> Presupuesto sin compromiso</span>
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
                        Solicitar presupuesto
                    </Link>
                    <Link href="/contacto" className={styles.cta_secondary}>
                        Ver formulario
                        <FaArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
