import styles from "@/styles/sections/planes.module.scss";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    getPlanByTag,
    getWhatsappHref,
    procesoPlan
} from "@/components/utils/planes.data";

type PlanDetalleProps = {
    plan: string;
};

type VarianteDetallePlan = "landing" | "sitio" | "aplicacion";

function obtenerVarianteDetallePlan(plan: string): VarianteDetallePlan {
    if (plan === "landing_page") return "landing";
    if (plan === "sitio_web") return "sitio";
    return "aplicacion";
}

export default function PlanDetalle({ plan }: PlanDetalleProps) {
    const planSeleccionado = getPlanByTag(plan);

    if (!planSeleccionado) {
        notFound();
    }

    const whatsappHref = getWhatsappHref(planSeleccionado.whatsappMensaje);
    const varianteDetallePlan = obtenerVarianteDetallePlan(plan);
    const claseVarianteDetalle = {
        landing: styles.planes_detalle_variante_landing,
        sitio: styles.planes_detalle_variante_sitio,
        aplicacion: styles.planes_detalle_variante_aplicacion,
    }[varianteDetallePlan];

    return (
        <article className={`${styles.planes_detalle} ${claseVarianteDetalle}`}>
            <section
                className={styles.planes_detalle_hero}
                aria-labelledby="plan-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <div className={styles.planes_detalle_hero_content}>
                        <span className={styles.planes_detalle_badge}>
                            Desarrollo web profesional
                        </span>

                        <h1
                            id="plan-title"
                            className={styles.planes_detalle_h1}
                        >
                            {planSeleccionado.titulo}
                        </h1>

                        <p className={styles.planes_detalle_intro}>
                            {planSeleccionado.subtitulo}
                        </p>

                        <p className={styles.planes_detalle_description}>
                            {planSeleccionado.descripcion}
                        </p>

                        <div className={styles.planes_detalle_actions}>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.planes_detalle_button}
                                aria-label={`Consultar por ${planSeleccionado.titulo} por WhatsApp`}
                            >
                                <FaWhatsapp aria-hidden="true" />
                                {planSeleccionado.ctaLabel}
                            </a>

                            <Link
                                href="/contacto"
                                className={styles.planes_detalle_button_secondary}
                            >
                                Contame tu proyecto
                            </Link>
                        </div>

                        <p className={styles.planes_detalle_note}>
                            {planSeleccionado.ctaMicrocopy}
                        </p>
                    </div>

                    <aside
                        className={styles.planes_detalle_summary}
                        aria-label="Resumen del servicio"
                    >
                        {planSeleccionado.destacado && (
                            <span className={styles.planes_detalle_summary_badge}>
                                {planSeleccionado.etiqueta}
                            </span>
                        )}

                        <h2 className={styles.planes_detalle_summary_title}>
                            Resumen del servicio
                        </h2>

                        <div className={styles.planes_detalle_price}>
                            {planSeleccionado.precio}
                        </div>

                        <p className={styles.planes_detalle_deadline}>
                            {planSeleccionado.plazo}
                        </p>

                        <ul className={styles.planes_detalle_highlights}>
                            {planSeleccionado.destacados.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </section>

            <section className={styles.planes_detalle_section}>
                <div className={styles.planes_detalle_layout}>
                    <div className={styles.planes_detalle_info_grid}>
                        <article className={styles.planes_detalle_card}>
                            <span className={styles.planes_detalle_card_label}>
                                Necesidad principal
                            </span>

                            <h2 className={styles.planes_detalle_h2}>
                                Cuándo puede corresponder
                            </h2>

                            <p className={styles.planes_detalle_text}>
                                {planSeleccionado.ideal}
                            </p>
                        </article>

                        <article className={styles.planes_detalle_card}>
                            <span className={styles.planes_detalle_card_label}>
                                Situación habitual
                            </span>

                            <h2 className={styles.planes_detalle_h2}>
                                Qué situación ayuda a abordar
                            </h2>

                            <p className={styles.planes_detalle_text}>
                                {planSeleccionado.problema}
                            </p>

                            <p className={styles.planes_detalle_impact}>
                                {planSeleccionado.impacto}
                            </p>
                        </article>

                        <article className={styles.planes_detalle_card}>
                            <span className={styles.planes_detalle_card_label}>
                                Enfoque del proyecto
                            </span>

                            <h2 className={styles.planes_detalle_h2}>
                                Qué se busca trabajar
                            </h2>

                            <p className={styles.planes_detalle_text}>
                                {planSeleccionado.objetivo}
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section
                className={styles.planes_detalle_section}
                aria-labelledby="aparte-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <header className={styles.planes_detalle_section_header}>
                        <span className={styles.planes_detalle_badge}>
                            Alcance y dependencias
                        </span>

                        <h2
                            id="aparte-title"
                            className={styles.planes_detalle_h2}
                        >
                            Aspectos que se evalúan por separado
                        </h2>

                        <p className={styles.planes_detalle_text}>
                            Estos puntos no forman parte automáticamente del
                            servicio. Si son necesarios, se revisan, se
                            detallan y se incorporan al presupuesto antes de
                            avanzar.
                        </p>
                    </header>

                    <div className={styles.planes_detalle_extras}>
                        {planSeleccionado.cotizarAparte.map((item) => (
                            <div
                                key={item}
                                className={styles.planes_detalle_extra}
                            >
                                <span aria-hidden="true">+</span>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className={styles.planes_detalle_section}
                aria-labelledby="beneficios-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <header className={styles.planes_detalle_section_header}>
                        <span className={styles.planes_detalle_badge}>
                            Criterios del desarrollo
                        </span>

                        <h2
                            id="beneficios-title"
                            className={styles.planes_detalle_h2}
                        >
                            Qué se trabaja en este tipo de proyecto
                        </h2>

                        <p className={styles.planes_detalle_text}>
                            El contenido, las decisiones técnicas y las
                            funciones se definen según el contexto, la
                            información disponible y el alcance acordado.
                        </p>
                    </header>

                    <div className={styles.planes_detalle_benefits}>
                        {planSeleccionado.beneficios.map((beneficio) => (
                            <article
                                key={beneficio.titulo}
                                className={styles.planes_detalle_card}
                            >
                                <h3 className={styles.planes_detalle_h3}>
                                    {beneficio.titulo}
                                </h3>

                                <p className={styles.planes_detalle_text}>
                                    {beneficio.descripcion}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className={styles.planes_detalle_section}
                aria-labelledby="incluye-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <header className={styles.planes_detalle_section_header}>
                        <span className={styles.planes_detalle_badge}>
                            Alcance base
                        </span>

                        <h2
                            id="incluye-title"
                            className={styles.planes_detalle_h2}
                        >
                            Qué puede formar parte del alcance
                        </h2>
                    </header>

                    <div className={styles.planes_detalle_includes}>
                        {planSeleccionado.items.map((item) => (
                            <article
                                key={item}
                                className={styles.planes_detalle_include}
                            >
                                <span aria-hidden="true">✓</span>
                                <p>{item}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pendiente: procesoPlan y su presentación específica por servicio. */}
            <section
                className={styles.planes_detalle_section}
                aria-labelledby="proceso-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <header className={styles.planes_detalle_section_header}>
                        <span className={styles.planes_detalle_badge}>
                            Proceso
                        </span>

                        <h2
                            id="proceso-title"
                            className={styles.planes_detalle_h2}
                        >
                            Cómo vamos a trabajar
                        </h2>

                        <p className={styles.planes_detalle_text}>
                            Un proceso simple, ordenado y pensado para que sepas
                            en qué etapa está tu proyecto.
                        </p>
                    </header>

                    <div className={styles.planes_detalle_process}>
                        {procesoPlan.map((item) => (
                            <article
                                key={item.numero}
                                className={styles.planes_detalle_process_card}
                            >
                                <span
                                    className={
                                        styles.planes_detalle_process_number
                                    }
                                >
                                    {item.numero}
                                </span>

                                <h3 className={styles.planes_detalle_h3}>
                                    {item.titulo}
                                </h3>

                                <p className={styles.planes_detalle_text}>
                                    {item.descripcion}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className={`${styles.planes_detalle_section} ${styles.planes_detalle_faq_section}`}
                aria-labelledby="faq-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <header className={styles.planes_detalle_section_header}>
                        <span className={styles.planes_detalle_badge}>
                            Dudas frecuentes
                        </span>

                        <h2
                            id="faq-title"
                            className={styles.planes_detalle_h2}
                        >
                            Preguntas frecuentes sobre este servicio
                        </h2>
                    </header>

                    <div className={styles.planes_detalle_faq}>
                        {planSeleccionado.preguntas.map((item) => (
                            <article
                                key={item.pregunta}
                                className={styles.planes_detalle_faq_item}
                            >
                                <h3 className={styles.planes_detalle_h3}>
                                    {item.pregunta}
                                </h3>

                                <p className={styles.planes_detalle_text}>
                                    {item.respuesta}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.planes_detalle_cta}>
                <div className={styles.planes_detalle_layout}>
                    <div className={styles.planes_detalle_cta_box}>
                        <span className={styles.planes_detalle_badge}>
                            Próximo paso
                        </span>

                        <h2 className={styles.planes_detalle_h2}>
                            {planSeleccionado.ctaTitle}
                        </h2>

                        <p className={styles.planes_detalle_text}>
                            {planSeleccionado.ctaDescription}
                        </p>

                        <div className={styles.planes_detalle_cta_actions}>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.planes_detalle_button}
                                aria-label={`Consultar por ${planSeleccionado.titulo} en WhatsApp`}
                            >
                                <FaWhatsapp aria-hidden="true" />
                                {planSeleccionado.ctaLabel}
                            </a>

                            <Link
                                href="/contacto"
                                className={styles.planes_detalle_button_secondary}
                            >
                                Completar formulario
                            </Link>
                        </div>

                        <p className={styles.planes_detalle_note}>
                            {planSeleccionado.ctaMicrocopy}
                        </p>

                        <nav
                            className={styles.planes_detalle_related}
                            aria-label="Enlaces relacionados"
                        >
                            <Link href={planSeleccionado.relatedWork.href}>
                                {planSeleccionado.relatedWork.label}
                            </Link>

                            <Link href="/servicios">
                                Comparar los tres servicios
                            </Link>

                            <Link href="/perfil">
                                Conocé a Pablo Chavez
                            </Link>
                        </nav>
                    </div>
                </div>
            </section>
        </article>
    );
}
