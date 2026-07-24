export const homeContent = {
    trust: {
        ariaLabel: "Proyectos y forma de trabajo",
        projects: {
            valueSuffix: "",
            label: "Proyectos publicados"
        },
        indicators: [
            { value: "Trato directo", label: "Con Pablo Chavez" },
            { value: "Alcance definido", label: "Según el proyecto" },
            { value: "Decisiones explicables", label: "Durante el proceso" }
        ]
    },
    process: {
        eyebrow: "Forma de trabajo",
        title: "Un proceso claro para avanzar con criterio",
        description:
            "Desde la primera consulta revisamos el contexto, definimos qué corresponde abordar y acordamos cuál sería el próximo paso.",
        steps: [
            {
                number: "01",
                title: "Consulta inicial",
                description:
                    "Me contás qué necesitás, qué información ya tenés y qué situación buscás abordar."
            },
            {
                number: "02",
                title: "Alcance y propuesta",
                description:
                    "Reviso el contexto y, si el proyecto avanza, preparo una propuesta con alcance, presupuesto y plazo orientativo."
            },
            {
                number: "03",
                title: "Diseño y desarrollo",
                description:
                    "Trabajo la estructura, el diseño y el desarrollo según el alcance acordado, con revisiones definidas para el proyecto."
            },
            {
                number: "04",
                title: "Entrega o publicación",
                description:
                    "Realizo la entrega o publicación acordada, con las configuraciones incluidas en el alcance."
            },
            {
                number: "05",
                title: "Siguientes pasos",
                description:
                    "Si después hace falta, evaluamos mejoras o mantenimiento por separado según la necesidad."
            }
        ]
    },
    finalCta: {
        label: "Hablemos de tu proyecto",
        title: "Contame qué necesitás y vemos por dónde empezar.",
        description:
            "Reviso el contexto, te oriento sobre el punto de partida y, si corresponde, preparo un presupuesto según el alcance del proyecto.",
        checks: [
            "Contacto directo por WhatsApp",
            "Alcance y dependencias explicados"
        ],
        primaryAction: "Contame tu proyecto",
        secondaryAction: "Completar formulario",
        profileAction: "Conocé a Pablo Chavez"
    }
} as const;