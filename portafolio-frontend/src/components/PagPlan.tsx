"use client";


import styles from "@/styles/sections/planes.module.scss";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
    plan: string;
};

const planes = [
    {
        id: 1,
        destacado: true,
        tag: "Landing Page Profesional",
        titulo: "Landing Page",
        ideal: "Profesionales independientes, emprendedores y pequeños negocios que necesitan una presencia digital profesional para captar nuevos clientes.",
        objetivo: "Presentar tu servicio de forma clara, transmitir confianza y convertir visitas en consultas o ventas.Empresas, estudios profesionales, consultoras, restaurantes, constructoras, clínicas y negocios que buscan consolidar una presencia digital sólida.",
        descripcion:
            "Ideal para promocionar un servicio, campaña o producto específico y convertir visitantes en clientes.",
        items: [
            "Diseño moderno",
            "Optimización conversión",
            "Diseño responsive",
            "Integración con WhatsApp",
            "SEO técnico",
            "Google Analytics",
            "Alto rendimiento",
            "Dominio y hosting"
        ],
        precioDesde: "$80.000",
        precioHasta: "$80.000" 
    },
    {
        id: 2,
        destacado: false,
        tag: "sitio_web",
        titulo: "Sitio Web Profesional",
        ideal: "Empresas, estudios profesionales, consultoras, restaurantes, constructoras, clínicas y negocios que buscan consolidar una presencia digital sólida.",
        objetivo: "Mostrar tu empresa con una imagen profesional, generar confianza y facilitar que nuevos clientes conozcan tus servicios.",
        descripcion:
            "Ideal para empresas y marcas que necesitan una presencia digital sólida y transmitir confianza.",
        items: [
            "Diseño personalizado.",
            "Sitio web multipágina.",
            "Secciones adaptadas a las necesidades de tu negocio.",
            "Formularios avanzados.",
            "Integración con WhatsApp",
            "Optimización SEO técnica.",
            "Google Analytics y Search Console.",
            "Blog (opcional).",
            "Panel básico de administración.",
            "Alto rendimiento y experiencia de usuario optimizada."
        ],
        precioDesde: "$80.000",
        precioHasta: "$80.000" 
    },
    {
        id: 3,
        destacado: false,
        tag: "desarrollo_web",
        titulo: "Desarrollo Web a Medida",
        ideal: "Empresas y negocios que necesitan funcionalidades específicas o procesos personalizados que una página web tradicional no puede ofrecer.",
        objetivo: "Automatizar tareas, optimizar procesos internos y desarrollar soluciones adaptadas completamente a las necesidades de tu negocio.",
        descripcion:
            "Vendé productos o servicios las 24 horas desde una plataforma moderna y segura.",
        items: [
            "Desarrollo completamente personalizado.",
            "Paneles de administración.",
            "Sistemas de reservas y turnos.",
            "Gestión de clientes.",
            "Dashboards y paneles de control.",
            "Integración con APIs y servicios externos.",
            "Automatización de procesos.",
            "Bases de datos seguras.",
            "Arquitectura escalable para futuras funcionalidades."
        ],
        precioDesde: "$80.000",
        precioHasta: "$80.000" 
    }
];

const proceso = [
    {
        numero: "01",
        titulo: "Reunión",
        descripcion: "Analizamos objetivos y necesidades."
    },
    {
        numero: "02",
        titulo: "Diseño",
        descripcion: "Creamos una propuesta visual."
    },
    {
        numero: "03",
        titulo: "Desarrollo",
        descripcion: "Construimos tu proyecto."
    },
    {
        numero: "04",
        titulo: "Entrega",
        descripcion: "Publicamos y dejamos todo listo."
    }
];

export default function PlanDetalle({ plan }: Props) {
    const planSeleccionado = planes.find(
        (p) => p.tag === plan
    );

    if (!planSeleccionado) {
        return (
            <p className={styles.planes_parrafo}>
                Plan no encontrado
            </p>
        );
    }

    return (
        <section className={styles.planes}>
            <div className={styles.planes_layout}>
                <header className={styles.planes_header}>
                    <span className={styles.planes_badge}>Servicio Profesional</span>
                    <h1 className={styles.planes_h1}>{planSeleccionado.titulo}</h1>
                    <p className={styles.planes_parrafo}>{planSeleccionado.descripcion}</p>
                    <div className={styles.planes_stats}>
                        <span>SEO Optimizado</span>
                        <span>Responsive</span>
                        <span>Alta Velocidad</span>
                    </div>
                    <button type="button" className={styles.planes_boton}>
                        <FaWhatsapp />
                        Solicitar Presupuesto
                    </button>
                </header>
                <section className={styles.planes_beneficios}>
                    <article className={styles.planes_card}>
                        <h2 className={styles.planes_h2}>Ideal Para</h2>
                        <p className={styles.planes_parrafo}>{planSeleccionado.ideal}</p>
                    </article>
                    <article className={styles.planes_card}>
                        <h2 className={styles.planes_h2}>Objetivo</h2>
                        <p className={styles.planes_parrafo}>{planSeleccionado.objetivo}</p>
                    </article>
                </section>
                {/* <section className={styles.planes_mockup}>
                    <div className={styles.planes_mockup_container}>Imagen del Proyecto</div>
                </section> */}
                <section className={styles.planes_section}>
                    <h2 className={styles.planes_h2}>Todo lo que incluye</h2>
                    <div className={styles.planes_grid}>
                        {planSeleccionado.items.map(
                            (item) => (
                            <article key={item} className={styles.planes_card}>
                                {item}
                            </article>)
                        )}
                    </div>
                </section>
                <section className={styles.planes_section}>
                    <h2 className={styles.planes_h2}>¿Cómo trabajamos?</h2>
                    <div className={styles.planes_proceso}>
                        {proceso.map((item) => (
                            <article key={item.numero}className={styles.planes_card}>
                                <span className={styles.planes_proceso_numero}>{item.numero}</span>
                                <h3 className={ styles.planes_proceso_titulo}>{item.titulo}</h3>
                                <p className={styles.planes_proceso_parrafo}>{item.descripcion}</p>
                            </article>
                        ))}
                    </div>
                </section>
                <section className={styles.planes_cta}>
                    <h2 className={styles.planes_h2}>¿Listo para impulsar tu negocio?</h2>
                    <p className={styles.planes_parrafo} > Solicita un presupuesto personalizado y te responderé a la brevedad.</p>
                    <button type="button" className={styles.planes_boton}><FaWhatsapp />Solicitar Presupuesto</button>
                </section>
            </div>
        </section>
    );
}