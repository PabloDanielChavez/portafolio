export const homeContent = {
    trust: {
        ariaLabel: "Indicadores de confianza",
        projects: {
            valueSuffix: "",
            label: "proyectos publicados"
        },
        indicators: [
            { value: "SEO", label: "técnico inicial" },
            { value: "100%", label: "diseño responsive" },
            { value: "Directo", label: "acompañamiento personal" }
        ]
    },
    process: {
        eyebrow: "Cómo trabajamos",
        title: "Un proceso claro, sin sorpresas",
        description:
            "Desde la primera consulta sabés qué vamos a resolver, cuánto puede tardar y cuál es el próximo paso.",
        steps: [
            {
                number: "01",
                title: "Análisis",
                description:
                    "Revisamos tu negocio, el objetivo y el material disponible."
            },
            {
                number: "02",
                title: "Propuesta",
                description:
                    "Definimos alcance, precio y plazo antes de empezar."
            },
            {
                number: "03",
                title: "Desarrollo",
                description:
                    "Diseño y desarrollo la web con revisiones concretas."
            },
            {
                number: "04",
                title: "Entrega",
                description:
                    "Publicamos y te acompaño con dominio, hosting y configuración."
            },
            {
                number: "05",
                title: "Acompañamiento",
                description:
                    "Seguimos en contacto después de la publicación."
            }
        ]
    },
    finalCta: {
        label: "Tu consulta, sin vueltas",
        title: "Contame qué necesita tu negocio y te digo por dónde empezar.",
        description:
            "Te respondo directamente, revisamos juntos qué tipo de web te conviene y, si tiene sentido, recibís un presupuesto claro antes de empezar.",
        checks: [
            "Respuesta directa por WhatsApp",
            "Sin compromiso ni costos ocultos"
        ],
        primaryAction: "Consultar por WhatsApp",
        secondaryAction: "Completar formulario",
        profileAction: "Conocé quién está detrás de PaginasWebChavez"
    }
} as const;
