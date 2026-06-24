"use client";

import styles from "@/styles/sections/planes.module.scss";
import { IoMdArrowBack, TbChartBarPopular } from "@/components/utils/Iconos";

import SectionHeader from "../sub_components/SectionHeader";
import PlanCard from "../sub_components/PlanCard";
import Link from "next/link";

const planes = [
    {
        id: 1,
        destacado: true,
        titulo: "Landing Page Profesional",
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
        ]
    },
    {
        id: 2,
        destacado: false,
        titulo: "Sitio Web Profesional",
        ideal: "Empresas, estudios profesionales, consultoras, restaurantes, constructoras, clínicas y negocios que buscan consolidar una presencia digital sólida.",
        objetivo: "Mostrar tu empresa con una imagen profesional, generar confianza y facilitar que nuevos clientes conozcan tus servicios.",
        descripcion:
            "Ideal para empresas y marcas que necesitan una presencia digital sólida y transmitir confianza.",
        items: [
            "Diseño completamente personalizado.",
            "Sitio web multipágina.",
            "Secciones adaptadas a las necesidades de tu negocio.",
            "Formularios avanzados.",
            "Integración con WhatsApp",
            "Optimización SEO técnica.",
            "Google Analytics y Search Console.",
            "Blog (opcional).",
            "Panel básico de administración.",
            "Alto rendimiento y experiencia de usuario optimizada."
        ]
    },
    {
        id: 3,
        destacado: false,
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
        ]
    }
];

export default function Planes() {
    return (
        <section
            className={styles.planes}
            id="planes"
        >
            
            {/* <Link
                href="/"
                className={styles.planes_LINK}
                aria-label="Volver a Inicio"
            >
                <IoMdArrowBack />
                Volver al Portafolio
            </Link> */}
            <div className={styles.planes_layout}>
                <SectionHeader
                    icon={<TbChartBarPopular />}
                    title="Planes"
                    description="Cada proyecto está diseñado para cumplir objetivos concretos: generar consultas, aumentar ventas y fortalecer tu presencia online."
                />
                <div className={styles.planes_contenido_box}>
                    <div className={styles.planes_contenido_box_layout}>
                        {planes.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}