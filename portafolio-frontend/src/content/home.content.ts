export const homeContent = {
    trust: {
        ariaLabel: "Indicadores de confianza",
        projects: {
            valueSuffix: "+",
            label: "proyectos publicados"
        },
        indicators: [
            { value: "SEO", label: "técnico incluido" },
            { value: "100%", label: "diseño responsive" },
            { value: "WhatsApp", label: "contacto directo" }
        ]
    },
    process: {
        eyebrow: "Cómo trabajamos",
        title: "Un proceso simple, con avances claros",
        description:
            "Cada etapa tiene un objetivo concreto para que sepas qué estamos resolviendo y qué sigue.",
        steps: [
            {
                number: "01",
                title: "Análisis",
                description: "Entendemos el negocio y el objetivo."
            },
            {
                number: "02",
                title: "Propuesta",
                description: "Definimos alcance, estructura y tiempos."
            },
            {
                number: "03",
                title: "Desarrollo",
                description: "Construyo y revisamos avances claros."
            },
            {
                number: "04",
                title: "Entrega",
                description: "Publicamos y dejamos todo preparado."
            },
            {
                number: "05",
                title: "Acompañamiento",
                description:
                    "Seguimos en contacto después del lanzamiento."
            }
        ]
    },
    finalCta: {
        label: "Tu próximo proyecto",
        title: "Hagamos que tu negocio se vea tan profesional como es.",
        description:
            "Contame qué necesitás y te respondo con una propuesta clara, sin vueltas ni paquetes inflados.",
        checks: [
            "Respuesta personalizada",
            "Presupuesto sin compromiso"
        ],
        primaryAction: "Solicitar presupuesto",
        secondaryAction: "Ver formulario"
    }
} as const;
