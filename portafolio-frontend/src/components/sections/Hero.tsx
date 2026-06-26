import styles from "@/styles/sections/hero.module.scss";
import { FaArrowDown, FaCheck, FaWhatsapp } from "@/components/utils/Iconos";
import type { PerfilType } from "@/types/perfil";
import { mensajePresupuesto } from "../utils/variables";
import Link from "next/link";

interface Props {
    perfil: PerfilType[];
}

const metricasHero = [
    { valor: "SEO", etiqueta: "Estructura preparada para posicionamiento en Google" },
    { valor: "LCP", etiqueta: "Primer render cuidado para cargar rápido" },
    { valor: "UX", etiqueta: "Recorridos claros para convertir visitas en consultas" },
];

export default function Hero({ perfil }: Props) {
    const whatsapp = String(perfil[0]?.numero_whatsapp ?? "").replace(/\D/g, "");
    const whatsappHref = whatsapp
        ? `https://wa.me/${whatsapp}?text=${mensajePresupuesto}`
        : "#Contacto";

    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.hero_contenedor}>
                <div className={styles.hero_layout}>
                    <div className={styles.hero_box}>
                        <span className={styles.hero_span_tag}>
                            Desarrollo web para negocios en Argentina
                        </span>

                        <h1 id="hero-title" className={styles.hero_h1_titulo}>
                            Diseño de{" "}
                            <strong className={styles.hero_h1_resaltado}>
                                páginas web profesionales
                            </strong>{" "}
                            para negocios que quieren vender más
                        </h1>

                        <p className={styles.hero_p_descripcion}>
                            Creo sitios web optimizados para Google, landing pages de alta conversión
                            y páginas rápidas con diseño responsive para empresas, marcas y
                            emprendedores que necesitan presencia digital confiable.
                        </p>
                        <div className={styles.hero_box_btn}>
                            <Link
                                href={whatsappHref}
                                className={styles.hero_btn}
                                target={whatsapp ? "_blank" : undefined}
                                rel={whatsapp ? "noopener noreferrer" : undefined}
                                aria-label="Solicitar presupuesto para una página web profesional"
                            >
                                <FaWhatsapp className={styles.hero_icono} aria-hidden="true" />
                                Solicitar presupuesto
                            </Link>

                            <Link
                                href="#trabajos"
                                className={`${styles.hero_btn} ${styles.hero_btn_alt}`}
                                aria-label="Ver trabajos de diseño y desarrollo web realizados"
                            >
                                Ver trabajos
                                <FaArrowDown className={styles.hero_icono_secun} aria-hidden="true" />
                            </Link>
                        </div>

                        <p className={styles.hero_microcopy}>
                            Desarrollo web serio, rápido y pensado para generar consultas reales.
                        </p>
                    </div>

                    <aside className={styles.hero_panel} aria-label="Enfoque del servicio web">
                        <div className={styles.hero_panel_top}>
                            <span>Proyecto web</span>
                            <strong>Optimizado</strong>
                        </div>

                        <div className={styles.hero_browser}>
                            <div className={styles.hero_browser_bar} aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className={styles.hero_browser_content}>
                                <span className={styles.hero_panel_label}>
                                    Landing page para captar clientes
                                </span>
                                <p className={styles.hero_panel_title}>
                                    Sitio web claro, rápido y orientado a conversión
                                </p>

                                <div className={styles.hero_panel_metrics}>
                                    {metricasHero.map((metrica) => (
                                        <div className={styles.hero_panel_metric} key={metrica.valor}>
                                            <strong>{metrica.valor}</strong>
                                            <span>{metrica.etiqueta}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <dl className={styles.hero_stats} aria-label="Pilares del desarrollo">
                            <div>
                                <dt>Responsive</dt>
                                <dd>Mobile, tablet y desktop</dd>
                            </div>
                            <div>
                                <dt>SEO técnico</dt>
                                <dd>Base clara para buscadores</dd>
                            </div>
                        </dl>
                    </aside>
                </div>

                <Link href="#planes" className={styles.scrollIndicator} aria-label="Ver planes">
                    <span></span>
                </Link>
            </div>
        </section>
    );
}
