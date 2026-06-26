import styles from "@/styles/sections/planes.module.scss";
import { FaWhatsapp } from "react-icons/fa";
import { notFound } from "next/navigation";

import {
    getPlanByTag,
    getWhatsappHref,
    procesoPlan
} from "@/components/utils/planes.data";

type PlanDetalleProps = {
    plan: string;
};

export default function PlanDetalle({ plan }: PlanDetalleProps) {
    const planSeleccionado = getPlanByTag(plan);
    if (!planSeleccionado) {
        notFound();
    }
    const whatsappHref = getWhatsappHref(planSeleccionado.whatsappMensaje);
    return (
        <main className={styles.planes_detalle}>
            <section
                className={styles.planes_detalle_hero}
                aria-labelledby="plan-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <div className={styles.planes_detalle_hero_content}>
                        <span className={styles.planes_detalle_badge}>
                            Servicio profesional
                        </span>
                        <h1 id="plan-title" className={styles.planes_detalle_h1}>
                            {planSeleccionado.titulo}
                        </h1>
                        <p className={styles.planes_detalle_intro}> {planSeleccionado.subtitulo}</p>
                        <p className={styles.planes_detalle_description}>
                            {planSeleccionado.descripcion}
                        </p>

                        <div className={styles.planes_detalle_actions}>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.planes_detalle_button}
                                aria-label={`Solicitar presupuesto para ${planSeleccionado.titulo} por WhatsApp`}
                            >
                                <FaWhatsapp aria-hidden="true" />
                                Solicitar presupuesto
                            </a>

                            <span className={styles.planes_detalle_note}>
                                Te respondo con una propuesta adaptada a tu negocio.
                            </span>
                        </div>
                    </div>

                    <aside
                        className={styles.planes_detalle_summary}
                        aria-label="Resumen del plan"
                    >
                        {planSeleccionado.destacado && (
                            <span className={styles.planes_detalle_summary_badge}>
                                {planSeleccionado.etiqueta ?? "Más elegido"}
                            </span>
                        )}

                        <h2 className={styles.planes_detalle_summary_title}>
                            Resumen del plan
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
                                Para quién es
                            </span>

                            <h2 className={styles.planes_detalle_h2}>
                                Ideal para este tipo de negocio
                            </h2>

                            <p className={styles.planes_detalle_text}>
                                {planSeleccionado.ideal}
                            </p>
                        </article>

                        <article className={styles.planes_detalle_card}>
                            <span className={styles.planes_detalle_card_label}>
                                Objetivo
                            </span>

                            <h2 className={styles.planes_detalle_h2}>
                                Qué busca lograr este plan
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
                aria-labelledby="beneficios-title"
            >
                <div className={styles.planes_detalle_layout}>
                    <header className={styles.planes_detalle_section_header}>
                        <span className={styles.planes_detalle_badge}>
                            Beneficios
                        </span>

                        <h2
                            id="beneficios-title"
                            className={styles.planes_detalle_h2}
                        >
                            Qué puede aportar a tu negocio
                        </h2>

                        <p className={styles.planes_detalle_text}>
                            El objetivo no es solamente tener una página web, sino
                            construir una herramienta clara para generar confianza y
                            facilitar el contacto con nuevos clientes.
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
                            Incluye
                        </span>

                        <h2
                            id="incluye-title"
                            className={styles.planes_detalle_h2}
                        >
                            Todo lo que incluye el plan
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
                                <span className={styles.planes_detalle_process_number}>
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
                className={styles.planes_detalle_section}
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
                            Preguntas antes de solicitar presupuesto
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
                            ¿Querés saber cuánto costaría tu proyecto?
                        </h2>

                        <p className={styles.planes_detalle_text}>
                            Contame qué necesitás y te respondo con una propuesta
                            adaptada a tu negocio.
                        </p>

                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.planes_detalle_button}
                            aria-label={`Consultar por ${planSeleccionado.titulo} en WhatsApp`}
                        >
                            <FaWhatsapp aria-hidden="true" />
                            Consultar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}