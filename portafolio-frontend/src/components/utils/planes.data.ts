    import type { Plan } from "@/types/plan";
import type { ProcesoPlan } from "@/types/ProcesoPlan";

export type PlanTag = "landing_page" | "sitio_web" | "desarrollo_web";

export const planes: Plan[] = [
    {
        id: "landing-page-profesional",
        tag: "landing_page",
        destacado: true,
        etiqueta: "Ideal para empezar",
        titulo: "Landing Page Profesional",
        subtitulo:
            "Presentá tu servicio con claridad y facilitá que las personas interesadas te consulten.",
        cardIdeal:
            "Querés empezar rápido, promocionar una oferta concreta o dejar de depender solamente de Instagram y WhatsApp.",
        ideal:
            "Profesionales independientes, emprendedores, prestadores de servicios y pequeños negocios que quieren mostrar lo que hacen de forma profesional y empezar a recibir consultas por internet.",
        problema:
            "Tu servicio está repartido entre redes sociales, mensajes y recomendaciones, sin un lugar propio donde una persona pueda entender rápidamente qué ofrecés.",
        impacto:
            "Esa falta de claridad puede generar dudas y hacer que una consulta se pierda antes de empezar.",
        objetivo:
            "Presentar tu servicio de forma clara, transmitir confianza y facilitar que las personas interesadas te contacten por WhatsApp o formulario.",
        descripcion:
            "Una página personalizada y enfocada en una sola propuesta, con la información necesaria para generar confianza y orientar al visitante hacia una consulta.",
        href: "/servicios/planes/landing_page",
        precio: "Desde $80.000",
        plazo: "Entrega estimada: 4 a 6 días hábiles",
        seoTitle: "Landing Page Profesional para Generar Consultas",
        seoDescription:
            "Conocé el plan Landing Page Profesional: alcance, precio desde $80.000, plazo estimado y todo lo necesario para presentar tu servicio y recibir consultas.",
        whatsappMensaje:
            "Hola Pablo, quiero solicitar presupuesto por una Landing Page Profesional.",
        ctaLabel: "Necesito una landing para mi servicio",
        ctaTitle: "¿Querés presentar tu servicio con una página clara y profesional?",
        ctaDescription:
            "Contame qué ofrecés y qué acción querés que realicen tus clientes. Te ayudo a ordenar la idea y te respondo con un alcance claro.",
        ctaMicrocopy:
            "No hace falta que tengas todos los textos o imágenes listos. Presupuesto claro antes de empezar y sin compromiso.",
        destacados: [
            "SEO técnico inicial",
            "Diseño responsive",
            "WhatsApp integrado",
            "Alta velocidad"
        ],
        beneficios: [
            {
                titulo: "Más consultas",
                descripcion:
                    "La estructura está pensada para guiar al visitante hacia una acción concreta: contactarte."
            },
            {
                titulo: "Imagen profesional",
                descripcion:
                    "Tu negocio se muestra con una presencia moderna, clara y confiable."
            },
            {
                titulo: "Carga rápida",
                descripcion:
                    "La página se optimiza para ofrecer una experiencia fluida y evitar que el usuario abandone por tiempos de carga lentos."
            }
        ],
        items: [
            "Diseño moderno y personalizado",
            "Estructura orientada a conversión",
            "Diseño responsive",
            "Integración con WhatsApp",
            "SEO técnico inicial",
            "Optimización de rendimiento",
            "Asesoramiento para dominio y hosting"
        ],
        cotizarAparte: [
            "Formulario de contacto",
            "Google Analytics",
            "Compra o renovación del dominio y del servicio de hosting",
            "Producción integral de textos, fotografía, video o identidad visual",
            "Tienda online, catálogo administrable o funcionalidades avanzadas"
        ],
        preguntas: [
            {
                pregunta: "¿Qué plan me conviene si recién empiezo?",
                respuesta:
                    "La Landing Page suele ser el punto de partida más simple cuando necesitás presentar un servicio u oferta concreta y facilitar las consultas. Si tu negocio necesita varias secciones o servicios con más profundidad, conviene evaluar el Sitio Web Profesional."
            },
            {
                pregunta: "¿Qué necesito enviarte para empezar?",
                respuesta:
                    "Alcanza con que me cuentes qué ofrecés, a quién querés llegar y cuál es la consulta que querés recibir. Si todavía no tenés textos o imágenes definitivos, te ayudo a ordenar lo disponible y definimos qué falta."
            },
            {
                pregunta: "¿Incluye dominio y hosting?",
                respuesta:
                    "El plan incluye asesoramiento y ayuda con la configuración. La compra o renovación del dominio y del hosting se informa y cotiza por separado antes de avanzar."
            },
            {
                pregunta: "¿Puedo pedir cambios durante el desarrollo?",
                respuesta:
                    "Sí. La propuesta define instancias de revisión para ajustar contenido y presentación dentro del alcance acordado. Si aparece una necesidad nueva, se cotiza antes de incorporarla."
            },
            {
                pregunta: "¿La página queda preparada para Google?",
                respuesta:
                    "Se entrega con una base de SEO técnico inicial para que Google pueda rastrear e interpretar la página. Esto no implica promesas de posiciones ni reemplaza una estrategia continua de contenidos."
            },
            {
                pregunta: "¿Puedo pagar en partes?",
                respuesta:
                    "La forma de pago se acuerda antes de comenzar y queda detallada en la propuesta. Consultame y revisamos una modalidad razonable para el alcance del proyecto."
            },
            {
                pregunta: "¿Qué pasa después de publicar?",
                respuesta:
                    "Revisamos que formularios, enlaces y canales de contacto funcionen correctamente. También te explico lo necesario para usar la página y podemos acordar mantenimiento o futuras mejoras por separado."
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
            "Ordená tus servicios y construí una presencia online sólida para tu negocio.",
        cardIdeal:
            "Necesitás varias secciones, explicar mejor tus servicios y transmitir más confianza que con una página única.",
        ideal:
            "Empresas, estudios profesionales, consultoras, restaurantes, constructoras, clínicas y negocios que necesitan explicar mejor sus servicios y consolidar su presencia online.",
        problema:
            "Tu negocio ofrece varios servicios o necesita contar más sobre su propuesta, pero la información está desordenada o depende de publicaciones aisladas en redes sociales.",
        impacto:
            "Cuando una persona no encuentra respuestas claras sobre la empresa, sus servicios o cómo contactarse, puede dudar de la propuesta o abandonar la búsqueda.",
        objetivo:
            "Mostrar tu empresa con una imagen profesional, ordenar la información de tus servicios y facilitar que nuevos clientes se contacten.",
        descripcion:
            "Un sitio multipágina personalizado para organizar servicios, información institucional, trabajos y canales de contacto en una presencia profesional preparada para crecer.",
        href: "/servicios/planes/sitio_web",
        precio: "Desde $450.000",
        plazo: "Entrega estimada: 7 a 15 días hábiles",
        seoTitle: "Sitio Web Profesional para Empresas y Negocios",
        seoDescription:
            "Conocé el plan Sitio Web Profesional: alcance, precio desde $450.000, plazo estimado y una estructura clara para presentar tu empresa y sus servicios.",
        whatsappMensaje:
            "Hola Pablo, quiero solicitar presupuesto por un Sitio Web Profesional.",
        ctaLabel: "Necesito un sitio para mi negocio",
        ctaTitle: "¿Tu negocio necesita una presencia online más completa?",
        ctaDescription:
            "Contame qué servicios ofrecés y qué información necesitás organizar. Te recomiendo una estructura y te envío una propuesta con alcance, precio y plazo.",
        ctaMicrocopy:
            "No hace falta que llegues con toda la estructura definida. Si el alcance cambia, se cotiza antes de avanzar.",
        destacados: [
            "Sitio multipágina",
            "SEO técnico",
            "Analytics",
            "Diseño personalizado"
        ],
        beneficios: [
            {
                titulo: "Mayor confianza",
                descripcion:
                    "Una web profesional ayuda a que tu negocio se perciba más serio, sólido y preparado."
            },
            {
                titulo: "Mejor organización",
                descripcion:
                    "Cada servicio puede tener su espacio, mejorando la claridad para el usuario."
            },
            {
                titulo: "Base para crecer",
                descripcion:
                    "El sitio puede prepararse para sumar nuevas secciones, páginas o funcionalidades con el tiempo."
            }
        ],
        items: [
            "Diseño completamente personalizado",
            "Alto rendimiento y buena experiencia de usuario",
            "Sitio web multipágina",
            "Secciones adaptadas a tu negocio",
            "Integración con WhatsApp",
            "Formularios de contacto",
            "Optimización SEO técnica",
            "Google Analytics y Search Console"
        ],
        cotizarAparte: [
            "Blog o sección de noticias",
            "Panel básico de administración para actualizar contenido",
            "Compra o renovación de dominio, hosting y servicios externos",
            "Producción completa de imagenes, identidad o redacción especializada",
            "Funciones con lógica propia, pagos, reservas complejas o paneles administrativos avanzado"
        ],
        preguntas: [
            {
                pregunta: "¿Qué diferencia hay con una Landing Page?",
                respuesta:
                    "La Landing Page está enfocada en una sola página y un objetivo puntual. El Sitio Web Profesional permite mostrar más información, servicios, páginas internas y contenido institucional."
            },
            {
                pregunta: "¿Qué necesito enviarte para empezar?",
                respuesta:
                    "Necesito conocer el negocio, sus servicios, el público y el objetivo principal del sitio. Podemos empezar con material preliminar y definir juntos qué textos, imágenes o datos faltan."
            },
            {
                pregunta: "¿El dominio y hosting están incluidos?",
                respuesta:
                    "Incluye asesoramiento y configuración técnica. La contratación o renovación del dominio, hosting y servicios externos se presenta por separado para que conozcas esos costos antes de avanzar."
            },
            {
                pregunta: "¿Puedo pedir cambios o agregar secciones después?",
                respuesta:
                    "Sí. Durante el proyecto hay revisiones dentro del alcance acordado y el sitio puede prepararse para crecer. Las secciones o funciones nuevas se estiman y cotizan antes de desarrollarlas."
            },
            {
                pregunta: "¿El sitio queda preparado para Google?",
                respuesta:
                    "Incluye una base de SEO técnico, estructura semántica y configuración inicial. El posicionamiento posterior depende también del contenido, la competencia y el trabajo sostenido; no se prometen posiciones."
            },
            {
                pregunta: "¿Puedo pagar en partes?",
                respuesta:
                    "La modalidad se define en la propuesta antes de comenzar. Consultame para revisar una forma de pago coherente con el tamaño y las etapas del proyecto."
            },
            {
                pregunta: "¿Qué pasa después de publicar?",
                respuesta:
                    "Verificamos el funcionamiento general y las mediciones acordadas. Recibís orientación para usar el sitio y podemos definir mantenimiento o nuevas etapas si las necesitás."
            }
        ],
        relatedWork: {
            label: "Ver un sitio web profesional en funcionamiento",
            href: "/trabajos/paginas-web-chavez"
        }
    },
    {
        id: "desarrollo-web-a-medida",
        tag: "desarrollo_web",
        destacado: false,
        titulo: "Desarrollo Web a Medida",
        subtitulo:
            "Convertí una necesidad específica de tu negocio en una herramienta web propia.",
        cardIdeal:
            "Necesitás paneles, bases de datos, filtros, reservas, catálogos, integraciones o una lógica que una plantilla no puede resolver.",
        ideal:
            "Empresas y negocios que necesitan funcionalidades específicas, procesos personalizados o herramientas internas para trabajar mejor.",
        problema:
            "Tu operación depende de tareas manuales, herramientas desconectadas o una plantilla que no se adapta a la forma real en que trabaja el negocio.",
        impacto:
            "Eso puede sumar pasos innecesarios, duplicar información y limitar mejoras porque el proceso termina adaptándose a la herramienta, en vez de ocurrir al revés.",
        objetivo:
            "Crear una solución digital adaptada a las necesidades reales del negocio para ahorrar tiempo, ordenar procesos y mejorar la gestión.",
        descripcion:
            "Una solución planificada según procesos y funcionalidades concretas, con alcance por etapas y una arquitectura preparada para incorporar mejoras.",
        href: "/servicios/planes/desarrollo_web",
        precio: "A presupuestar",
        plazo: "Plazo según alcance del proyecto",
        seoTitle: "Desarrollo Web a Medida para Negocios",
        seoDescription:
            "Conocé cómo se cotiza un desarrollo web a medida con paneles, bases de datos, integraciones o funciones específicas, con alcance y etapas definidas.",
        whatsappMensaje:
            "Hola Pablo, quiero consultar por un Desarrollo Web a Medida.",
        ctaLabel: "Necesito un desarrollo a medida",
        ctaTitle: "¿Necesitás una solución que una plantilla no puede resolver?",
        ctaDescription:
            "Contame qué proceso querés ordenar o qué función necesitás. Primero definimos prioridades y después preparo una propuesta por alcance y etapas.",
        ctaMicrocopy:
            "No hace falta que tengas la solución técnica definida. El alcance, los cambios y cada costo se acuerdan antes de desarrollar.",
        destacados: [
            "Paneles administrativos",
            "Base de datos",
            "APIs",
            "Arquitectura escalable"
        ],
        beneficios: [
            {
                titulo: "Procesos más ordenados",
                descripcion:
                    "Permite digitalizar tareas que hoy se hacen de forma manual o desorganizada."
            },
            {
                titulo: "Funcionalidades específicas",
                descripcion:
                    "El sistema se adapta a las necesidades del negocio, no al revés."
            },
            {
                titulo: "Escalabilidad",
                descripcion:
                    "La arquitectura puede prepararse para sumar nuevas funciones con el tiempo."
            }
        ],
        items: [
            "Desarrollo a medida según tu negocio",
            "Alcance funcional definido antes de empezar",
            "Panel administrativo personalizado",
            "Dashboards o vistas de control",
            "Integración con APIs documentadas",
            "Automatización de procesos clave",
            "Base de datos estructurada y segura",
            "Preparado para escalar y sumar funciones"
        ],
        cotizarAparte: [
            "Módulos no incluidos en el alcance inicial",
            "Reservas, turnos, pagos o usuarios avanzados",
            "Gestión avanzada de clientes, roles o reportes",
            "Infraestructura, licencias o servicios externos",
            "Migración, limpieza o carga inicial de datos",
            "Integraciones externas complejas o no documentadas",
            "Cambios solicitados después de aprobar la propuesta"
        ],
        preguntas: [
            {
                pregunta: "¿Cuándo conviene un desarrollo a medida?",
                respuesta:
                    "Cuando necesitás lógica propia, usuarios, paneles, bases de datos, filtros, catálogos, reservas, automatizaciones o integraciones que no se resuelven bien con una página tradicional."
            },
            {
                pregunta: "¿Por qué no tiene un precio fijo?",
                respuesta:
                    "Porque el costo depende de las funciones, roles, integraciones, datos y nivel de complejidad. Primero definimos prioridades y luego recibís una propuesta con alcance, etapas, precio y plazo."
            },
            {
                pregunta: "¿Puede incluir panel, base de datos e integraciones?",
                respuesta:
                    "Sí. Puede incluir paneles administrativos, bases de datos, APIs y servicios externos cuando forman parte del alcance acordado y su viabilidad técnica está confirmada."
            },
            {
                pregunta: "¿Qué necesito enviarte para empezar?",
                respuesta:
                    "Necesito entender el problema, quién usa hoy el proceso y qué resultado esperás. No hace falta que diseñes la solución técnica: esa definición forma parte del análisis."
            },
            {
                pregunta: "¿Qué pasa si el alcance cambia?",
                respuesta:
                    "El cambio se analiza antes de implementarlo. Si modifica tiempos o costos, recibís una estimación actualizada y decidís si se incorpora ahora o queda para otra etapa."
            },
            {
                pregunta: "¿Puedo pagar por etapas?",
                respuesta:
                    "Los proyectos a medida pueden organizarse por etapas y entregables cuando el alcance lo permite. La modalidad concreta queda acordada en la propuesta antes de comenzar."
            },
            {
                pregunta: "¿Qué pasa después de publicar?",
                respuesta:
                    "Se valida el funcionamiento acordado y se define cómo atender soporte, mantenimiento y nuevas etapas. La evolución del sistema se cotiza según las prioridades reales del negocio."
            }
        ],
        relatedWork: {
            label: "Ver un caso de desarrollo web a medida",
            href: "/trabajos/esperanza-de-vida"
        }
    }
];

export const procesoPlan: ProcesoPlan[] = [
    {
        numero: "01",
        titulo: "Análisis",
        descripcion:
            "Revisamos el objetivo de la landing, el material disponible y qué necesita resolver tu negocio. No hace falta que tengas todo definido."
    },
    {
        numero: "02",
        titulo: "Estrategia",
        descripcion:
            "Analizo tu rubro, tu competencia y tu público objetivo para definir cómo diferenciar tu propuesta y orientar mejor el contenido de la página."
    },
    {
        numero: "03",
        titulo: "Propuesta",
        descripcion:
            "Definimos alcance, entregables, precio, plazo de entrega y qué queda fuera del servicio antes de empezar."
    },
    {
        numero: "04",
        titulo: "Desarrollo",
        descripcion:
            "Diseño y desarrollo la landing page, revisando avances en las instancias acordadas para ajustar los detalles importantes."
    },
    {
        numero: "05",
        titulo: "Entrega",
        descripcion:
            "Publicamos la página, validamos los canales principales y dejamos acordado el soporte o las mejoras futuras si hacen falta."
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
