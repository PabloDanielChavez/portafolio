import type { ServiciosType } from "@/types/servicios";

type ServicioCommercialContent = {
    title: string;
    description: string;
};

export const serviciosSectionContent = {
    title: "Soluciones web para que tu negocio se vea profesional y reciba consultas",
    description:
        "Combino diseño, desarrollo y optimización para que tu web sea clara, rápida y fácil de usar. Cada decisión parte de lo que necesita tu negocio, no de una plantilla genérica.",
    decisionGuide: {
        eyebrow: "Elegí según tu objetivo",
        title: "¿Qué tipo de web necesita tu negocio?",
        description:
            "Si todavía no lo tenés claro, esta guía te muestra el punto de partida. Después ajustamos el alcance, el contenido y las funciones a tu caso.",
        options: [
            {
                title: "Landing Page Profesional",
                description:
                    "Para presentar un servicio o una campaña y concentrar las consultas en una acción concreta.",
                href: "/servicios/planes/landing_page",
                linkLabel: "Ver plan de Landing Page"
            },
            {
                title: "Sitio Web Profesional",
                description:
                    "Para ordenar varios servicios, fortalecer la confianza y construir una presencia online más completa.",
                href: "/servicios/planes/sitio_web",
                linkLabel: "Ver plan de Sitio Web"
            },
            {
                title: "Desarrollo Web a Medida",
                description:
                    "Para resolver procesos, integraciones o funciones que una web tradicional no cubre.",
                href: "/servicios/planes/desarrollo_web",
                linkLabel: "Ver desarrollo a medida"
            }
        ],
        primaryAction: {
            label: "Ver planes disponibles",
            href: "#planes"
        },
        contactAction: {
            label: "Te ayudo a definir qué web necesitás",
            href: "/contacto"
        },
        servicesAction: {
            label: "Conocer todos los servicios",
            href: "/servicios"
        }
    }
} as const;

export const servicioCommercialContentById: Readonly<
    Record<number, ServicioCommercialContent>
> = {
    1: {
        title: "Diseño profesional adaptado a tu negocio",
        description:
            "Una identidad visual clara, responsive y coherente con tu marca para transmitir confianza desde la primera visita."
    },
    2: {
        title: "Una web preparada para tu objetivo",
        description:
            "Desarrollo la solución que tu negocio necesita, desde una página enfocada en consultas hasta funciones personalizadas."
    },
    3: {
        title: "Carga rápida y una base técnica para Google",
        description:
            "Optimizo rendimiento, estructura y SEO técnico inicial para que las personas naveguen mejor y los buscadores puedan interpretar tu web."
    },
    4: {
        title: "Acompañamiento después de publicar",
        description:
            "Te ayudo a mantener la web actualizada, estable y preparada para crecer cuando el negocio lo necesite."
    },
    5: {
        title: "Contacto y herramientas conectadas",
        description:
            "Integro WhatsApp, formularios y servicios externos para facilitar consultas y ordenar tareas de tu operación."
    }
};

export const getServicioCommercialContent = (
    servicio: ServiciosType
): ServicioCommercialContent =>
    servicioCommercialContentById[servicio.id] ?? {
        title: servicio.nombre_servicio,
        description: servicio.informacion_servicio
    };
