    import type { Plan } from "@/types/plan";
import type { ProcesoPlan } from "@/types/ProcesoPlan";

export type PlanTag = "landing_page" | "sitio_web" | "desarrollo_web";

export const planPrices = {
    landing_page: "A presupuestar según alcance",
    sitio_web: "Presupuesto según alcance, páginas y funcionalidades",
    desarrollo_web: "Presupuesto por etapas después del relevamiento"
} as const satisfies Record<PlanTag, string>;

export const planes: Plan[] = [
    {
        id: "landing-page-profesional",
        tag: "landing_page",
        destacado: false,
        titulo: "Landing Page Profesional",
        subtitulo:
            "Una página personalizada para presentar una propuesta concreta, ordenar la información esencial y orientar hacia un siguiente paso.",
        cardIdeal:
            "Necesitás presentar un servicio, una propuesta o una campaña concreta en una sola página.",
        ideal:
            "Profesionales y negocios de servicios que necesitan explicar con claridad qué ofrecen y dar un lugar propio a su propuesta.",
        problema:
            "La información está repartida entre redes sociales, mensajes y recomendaciones, sin un lugar donde una persona pueda entender rápidamente qué ofrecés.",
        impacto:
            "Cuando el mensaje está disperso, puede resultar más difícil comprender la propuesta y saber cuál es el siguiente paso.",
        objetivo:
            "Ordenar el mensaje, resolver dudas principales y facilitar el contacto mediante una acción definida según el proyecto.",
        descripcion:
            "Una página personalizada que organiza el contenido, presenta la propuesta y orienta el recorrido hacia una acción principal.",
        href: "/servicios/planes/landing_page",
        precio: planPrices.landing_page,
        plazo:
            "Plazo orientativo: 5 a 10 días hábiles desde la aprobación del alcance y la recepción completa del material.",
        seoTitle: "Landing Page Profesional | PaginasWebChavez",
        seoDescription:
            "Landing Page Profesional para presentar una propuesta concreta, ordenar el mensaje y orientar hacia una acción principal. Alcance y presupuesto según proyecto.",
        whatsappMensaje:
            "Hola Pablo, quiero consultar por una Landing Page Profesional.",
        ctaLabel: "Consultar landing",
        ctaTitle:
            "¿Querés presentar una propuesta concreta con mayor claridad?",
        ctaDescription:
            "Contame qué ofrecés y qué acción te gustaría facilitar desde la página. Primero revisamos el contexto y definimos el alcance adecuado.",
        ctaMicrocopy:
            "El alcance, los materiales y los servicios externos se revisan antes de empezar.",
        destacados: [
            "Arquitectura de contenido",
            "Diseño adaptado",
            "Contacto simple según alcance",
            "Rendimiento según alcance"
        ],

        beneficios: [
            {
                titulo: "Información organizada",
                descripcion:
                    "La propuesta, las dudas principales y el siguiente paso se presentan en un mismo recorrido."
            },
            {
                titulo: "Presentación clara",
                descripcion:
                    "El diseño y la jerarquía ayudan a mostrar lo importante de forma comprensible."
            },
            {
                titulo: "Canal de contacto evaluado",
                descripcion:
                    "La página puede orientar hacia un canal de contacto cuando corresponde al alcance acordado."
            }
        ],
        items: [
            "Análisis inicial de objetivo y público",
            "Arquitectura de contenido",
            "Diseño adaptado a celular y escritorio",
            "Desarrollo de la página",
            "Optimización de rendimiento",
            "Estructura semántica según alcance",
            "Dos rondas consolidadas de revisión",
            "Contacto simple cuando corresponde"
        ],
        cotizarAparte: [
            "Dominio, hosting y servicios externos",
            "Producción integral de textos, fotografía, video o identidad visual",
            "Integraciones, nuevas secciones o funciones adicionales",
            "Mantenimiento",
            "Paneles, base de datos o funciones con backend"
        ],
        preguntas: [
            {
                pregunta: "¿Cuándo corresponde una Landing Page?",
                respuesta:
                    "Cuando necesitás presentar una propuesta concreta en una sola página y orientar a las personas hacia una acción principal."
            },
            {
                pregunta: "¿Qué se define antes de empezar?",
                respuesta:
                    "Revisamos el objetivo de la página, la información disponible, el público, los materiales y el alcance necesario para el proyecto."
            },
            {
                pregunta: "¿Incluye dominio y hosting?",
                respuesta:
                    "Se brinda orientación sobre estos servicios, pero su contratación o renovación se evalúa por separado antes de avanzar."
            },
            {
                pregunta: "¿Qué pasa si aparece una necesidad nueva?",
                respuesta:
                    "Se revisa antes de incorporarla. Si modifica el alcance, los tiempos o el presupuesto, se presenta una estimación actualizada."
            },
            {
                pregunta: "¿Qué significa SEO técnico inicial?",
                respuesta:
                    "Se trabaja una base técnica y una estructura que pueden ayudar a los buscadores a interpretar la página. No implica promesas de posiciones ni reemplaza una estrategia continua de contenidos."
            },
            {
                pregunta: "¿Qué ocurre al finalizar el proyecto?",
                respuesta:
                    "La entrega contempla la configuración acordada y las revisiones definidas. Mantenimiento, cambios posteriores o nuevas etapas pueden evaluarse por separado."
            }
        ],
        relatedWork: {
            label: "Ver una landing para un negocio de servicios",
            href: "/trabajos/jardineria-montanez"
        }
    },
    {
        id: "sitio-web-profesional",
        tag: "sitio_web",
        destacado: false,
        titulo: "Sitio Web Profesional",
        subtitulo:
            "Una estructura multipágina para ordenar servicios, contenidos y canales de contacto en un mismo lugar.",
        cardIdeal:
            "Necesitás explicar varios servicios o contenidos con mayor profundidad y dar recorridos claros a distintos públicos.",
        ideal:
            "Negocios y pequeños equipos que necesitan organizar servicios, información institucional y canales de contacto en una estructura más completa.",
        problema:
            "Los servicios, la información sobre el negocio y las formas de contacto aparecen desarticulados entre redes sociales, mensajes o materiales aislados.",
        impacto:
            "Cuando la información es difícil de recorrer, puede resultar más complejo encontrar respuestas claras sobre el negocio y sus servicios.",
        objetivo:
            "Ordenar la información en una estructura multipágina, mantener una identidad consistente y definir recorridos de navegación claros.",
        descripcion:
            "Un sitio web personalizado para distribuir servicios, información institucional y contacto en una arquitectura pensada según el contenido del proyecto.",
        href: "/servicios/planes/sitio_web",
        precio: planPrices.sitio_web,
        plazo:
            "Plazo orientativo: 20 a 35 días hábiles, sujeto al alcance y a los tiempos de respuesta.",
        seoTitle: "Sitio Web Profesional | PaginasWebChavez",
        seoDescription:
            "Sitio Web Profesional para ordenar servicios, contenidos y canales de contacto en una estructura multipágina. Presupuesto según alcance, páginas y funcionalidades.",
        whatsappMensaje:
            "Hola Pablo, quiero consultar por un Sitio Web Profesional.",
        ctaLabel: "Consultar sitio",
        ctaTitle:
            "¿Necesitás ordenar varios servicios o contenidos en una misma web?",
        ctaDescription:
            "Contame qué información necesitás organizar y a quiénes querés orientar. Revisamos el contexto para definir una estructura adecuada.",
        ctaMicrocopy:
            "Las páginas, funciones, materiales y servicios externos se definen según el alcance.",
        destacados: [
            "Arquitectura multipágina",
            "Navegación clara",
            "Diseño adaptado",
            "Preparación de publicación"
        ],
        beneficios: [
            {
                titulo: "Servicios organizados",
                descripcion:
                    "Cada tema puede tener un lugar definido dentro de una estructura fácil de recorrer."
            },
            {
                titulo: "Información centralizada",
                descripcion:
                    "El negocio, sus servicios y los canales de contacto se reúnen en un mismo sitio."
            },
            {
                titulo: "Recorridos de navegación",
                descripcion:
                    "La arquitectura permite orientar a distintos públicos hacia la información que necesitan."
            }
        ],
        items: [
            "Revisión de servicios, públicos y materiales",
            "Arquitectura de páginas y navegación",
            "Dirección visual",
            "Diseño adaptado a celular y escritorio",
            "Desarrollo del sitio",
            "Revisiones consolidadas",
            "Preparación de la publicación"
        ],
        cotizarAparte: [
            "Páginas o secciones adicionales",
            "Formularios específicos e integraciones",
            "Administración de contenido o blog",
            "Dominio, hosting y servicios externos",
            "Producción integral de imágenes, identidad o redacción especializada",
            "Paneles, backend, base de datos o funciones con lógica propia"
        ],
        preguntas: [
            {
                pregunta: "¿Qué diferencia hay con una Landing Page?",
                respuesta:
                    "La Landing Page concentra una propuesta concreta en una sola página. El Sitio Web Profesional permite organizar varios servicios, contenidos o públicos en una estructura multipágina."
            },
            {
                pregunta: "¿Qué se necesita para empezar?",
                respuesta:
                    "Primero necesito conocer el negocio, sus servicios, el público y el objetivo principal. Después revisamos qué materiales ya existen y qué falta definir."
            },
            {
                pregunta: "¿El dominio y hosting están incluidos?",
                respuesta:
                    "Se brinda orientación técnica, pero la contratación o renovación de dominio, hosting y otros servicios externos se evalúa por separado."
            },
            {
                pregunta: "¿Se pueden sumar páginas o funciones?",
                respuesta:
                    "Sí, cuando corresponde. Las páginas, integraciones o funciones adicionales se revisan y cotizan antes de incorporarlas."
            },
            {
                pregunta: "¿El sitio queda preparado para Google?",
                respuesta:
                    "Se puede trabajar una base técnica, estructura semántica y aspectos de SEO según el alcance. No se garantizan posiciones ni resultados de buscadores."
            },
            {
                pregunta: "¿Qué ocurre después de publicar?",
                respuesta:
                    "Se prepara la publicación según lo acordado y se revisa el funcionamiento general definido en el alcance. Mantenimiento o nuevas etapas pueden evaluarse por separado."
            }
        ],
        relatedWork: {
            label: "Ver un sitio web publicado",
            href: "/trabajos/paginas-web-chavez"
        }
    },
    {
        id: "desarrollo-web-a-medida",
        tag: "desarrollo_web",
        destacado: false,
        titulo: "Aplicación Web a Medida",
        subtitulo:
            "Una herramienta web para procesos, datos, usuarios o tareas que requieren una lógica propia.",
        cardIdeal:
            "Necesitás evaluar un proceso, centralizar información o desarrollar una herramienta adaptada a la forma en que trabaja tu negocio.",
        ideal:
            "Negocios y equipos que necesitan revisar procesos, datos, usuarios o tareas que una web informativa no puede abordar por sí sola.",
        problema:
            "El trabajo depende de planillas, mensajes o sistemas desconectados; varias personas consultan o actualizan los mismos datos, o el proceso requiere reglas propias.",
        impacto:
            "Cuando la información y las tareas están dispersas, puede resultar difícil revisar el proceso, priorizar cambios y definir qué conviene desarrollar primero.",
        objetivo:
            "Relevar el proceso, evaluar su viabilidad y priorizar un alcance inicial que permita avanzar por etapas.",
        descripcion:
            "Una aplicación web se define a partir de los procesos, datos, usuarios y prioridades reales del proyecto. El alcance inicial se revisa antes de avanzar con el desarrollo.",
        href: "/servicios/planes/desarrollo_web",
        precio: planPrices.desarrollo_web,
        plazo:
            "Cronograma definido por etapas después del relevamiento.",
        seoTitle: "Aplicación Web a Medida | PaginasWebChavez",
        seoDescription:
            "Aplicación Web a Medida para evaluar procesos, datos, usuarios o tareas con lógica propia. Alcance, presupuesto y cronograma definidos por etapas.",
        whatsappMensaje:
            "Hola Pablo, quiero evaluar un proyecto de Aplicación Web a Medida.",
        ctaLabel: "Evaluar proyecto",
        ctaTitle:
            "¿Necesitás revisar un proceso, datos o tareas que requieren una herramienta propia?",
        ctaDescription:
            "Contame qué proceso querés revisar, quiénes lo usan y qué información interviene. Primero evaluamos el contexto, las prioridades y la viabilidad.",
        ctaMicrocopy:
            "Las capacidades, dependencias, infraestructura y costos se definen antes de desarrollar cada etapa.",
        destacados: [
            "Relevamiento inicial",
            "Alcance por etapas",
            "Lógica según necesidad",
            "Revisiones definidas"
        ],
        beneficios: [
            {
                titulo: "Relevamiento del proceso",
                descripcion:
                    "El punto de partida es entender qué información, tareas, usuarios y restricciones intervienen."
            },
            {
                titulo: "Prioridades definidas",
                descripcion:
                    "El alcance inicial se ordena para distinguir qué conviene abordar primero y qué puede quedar para otra etapa."
            },
            {
                titulo: "Funciones evaluadas",
                descripcion:
                    "Las funciones se incorporan cuando responden a una necesidad validada y su viabilidad está confirmada."
            }
        ],
        items: [
            "Relevamiento de objetivos, usuarios, datos y flujo",
            "Evaluación de riesgos, dependencias y viabilidad",
            "Priorización del alcance inicial",
            "Desarrollo por etapas",
            "Revisión de cada etapa",
            "Definición de próximos pasos"
        ],
        cotizarAparte: [
            "Capacidades no incluidas en el alcance inicial",
            "Usuarios, roles, paneles, datos o estados adicionales",
            "Integraciones, notificaciones o automatizaciones",
            "Infraestructura, licencias y servicios externos",
            "Migración, limpieza o carga inicial de datos",
            "Seguridad, copias de seguridad, monitoreo o soporte",
            "Cambios posteriores a la aprobación de cada etapa"
        ],
        preguntas: [
            {
                pregunta: "¿Cuándo conviene evaluar una Aplicación Web a Medida?",
                respuesta:
                    "Cuando la necesidad involucra procesos, datos, usuarios, tareas o reglas propias que una web informativa no puede abordar de manera suficiente."
            },
            {
                pregunta: "¿Por qué no tiene un precio fijo?",
                respuesta:
                    "Porque el presupuesto depende del relevamiento, las prioridades, los datos, las dependencias y las funciones que resulten viables. El proyecto se cotiza por etapas después de revisar ese contexto."
            },
            {
                pregunta: "¿Puede incluir paneles, datos o integraciones?",
                respuesta:
                    "Pueden evaluarse cuando forman parte de una necesidad validada y su viabilidad técnica, infraestructura y presupuesto están confirmados."
            },
            {
                pregunta: "¿Qué se necesita para empezar?",
                respuesta:
                    "Necesito entender el proceso actual, quiénes lo usan, qué información interviene y qué situación se busca abordar. No hace falta llegar con una definición técnica cerrada."
            },
            {
                pregunta: "¿Qué pasa si cambia el alcance?",
                respuesta:
                    "El cambio se analiza antes de implementarlo. Si modifica prioridades, tiempos o presupuesto, se presenta una estimación para decidir si se incorpora en la etapa actual o en una posterior."
            },
            {
                pregunta: "¿Qué ocurre después de cada etapa?",
                respuesta:
                    "Se revisa lo acordado y se decide si corresponde continuar, ajustar prioridades o definir una nueva etapa. Soporte, mantenimiento y nuevas funciones se evalúan por separado."
            }
        ],
        relatedWork: {
            label: "Conocer un proyecto de aplicación web en desarrollo",
            href: "/trabajos/esperanza-de-vida"
        }
    }
];

export const procesoPlan: ProcesoPlan[] = [
    {
        numero: "01",
        titulo: "Contexto",
        descripcion: 
            "Revisamos qué necesita abordar el proyecto, qué información existe y qué deberían encontrar o poder hacer las personas que visiten o utilicen la web."
    },
    {
        numero: "02",
        titulo: "Alcance",
        descripcion:
            "Definimos prioridades, entregables, dependencias y qué aspectos requieren evaluación adicional antes de avanzar."
    },
    {
        numero: "03",
        titulo: "Propuesta",
        descripcion:
            "El presupuesto, el plazo orientativo y lo que queda fuera del alcance se presentan antes de comenzar."
    },
    {
        numero: "04",
        titulo: "Desarrollo",
        descripcion:
            "Diseño y desarrollo el proyecto según el alcance acordado, con instancias de revisión cuando corresponden."
    },
    {
        numero: "05",
        titulo: "Revisión y entrega",
        descripcion:
            "Revisamos lo acordado y preparamos la entrega o publicación según las condiciones definidas para el proyecto."
    }
];

export const WHATSAPP_NUMBER = "5491164095914";

export const getPlanByTag = (tag: string) => {
    return planes.find((plan) => plan.tag === tag);
};

export const getPlanById = (id: string) => {
    return planes.find((plan) => plan.id === id);
};

export const getWhatsappHref = (mensaje: string) => {
    const texto = encodeURIComponent(mensaje);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
};