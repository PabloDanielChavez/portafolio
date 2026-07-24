import type { ServiciosType } from "@/types/servicios";

type ServicioCommercialContent = {
    title: string;
    description: string;
};

export const serviciosSectionContent = {
    title: "Desarrollo web según lo que necesitás resolver",
    description:
        "Diseño y desarrollo web para presentar mejor lo que ofrecés, ordenar información o resolver una necesidad concreta de tu actividad. El alcance se define según el contexto de cada proyecto.",
    decisionGuide: {
        eyebrow: "Elegí según tu necesidad",
        title: "¿Qué tipo de desarrollo web puede necesitar tu proyecto?",
        description:
            "Esta guía te ayuda a identificar un punto de partida. Después definimos el alcance, los contenidos y las funciones necesarias para tu caso.",
        options: [
            {
                title: "Landing Page Profesional",
                description:
                    "Para presentar una propuesta concreta y guiar hacia una acción principal.",
                href: "/servicios/planes/landing_page",
                linkLabel: "Consultar landing"
            },
            {
                title: "Sitio Web Profesional",
                description:
                    "Para ordenar varios servicios o contenidos en una estructura con navegación clara.",
                href: "/servicios/planes/sitio_web",
                linkLabel: "Consultar sitio"
            },
            {
                title: "Aplicación Web a Medida",
                description:
                    "Para acompañar un proceso, datos, usuarios o tareas que requieren relevamiento y desarrollo por etapas.",
                href: "/servicios/planes/desarrollo_web",
                linkLabel: "Evaluar proyecto"
            }
        ],
        primaryAction: {
            label: "Contame tu proyecto",
            href: "/contacto"
        },
        servicesAction: {
            label: "Ver servicios",
            href: "/servicios"
        }
    }
} as const;


export const servicioCommercialContentById: Readonly<Record<number, ServicioCommercialContent>> = {
    1: {
        title: "Diseño adaptado a tu negocio",
        description:
            "Una identidad visual clara, adaptable y coherente con tu marca para presentar mejor lo que ofrecés."
    },
    2: {
        title: "Un desarrollo web según tu necesidad",
        description:
            "Desarrollo una Landing Page, un Sitio Web o una Aplicación Web a Medida según el problema y el alcance definidos."
    },
    3: {
        title: "Una base técnica ordenada",
        description:
            "Trabajo la estructura, el rendimiento y el SEO técnico según las prioridades de cada proyecto, para facilitar la navegación y la interpretación técnica de la web."
    },
    4: {
        title: "Una entrega revisada y acordada",
        description:
            "Revisamos el trabajo y definimos la entrega o publicación según el alcance acordado."
    },
    5: {
        title: "Canales de contacto e integraciones",
        description:
            "La web puede incluir formularios, WhatsApp u otras herramientas cuando forman parte de la necesidad y del alcance del proyecto."
    }
};

export const getServicioCommercialContent = (
    servicio: ServiciosType
): ServicioCommercialContent =>
    servicioCommercialContentById[servicio.id] ?? {
        title: servicio.nombre_servicio,
        description: servicio.informacion_servicio
    };