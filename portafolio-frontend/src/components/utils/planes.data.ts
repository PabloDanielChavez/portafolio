import type { Plan } from "@/types/plan";
import { ProcesoPlan } from "@/types/ProcesoPlan";

export type PlanTag = "landing_page" | "sitio_web" | "desarrollo_web";

export const planes: Plan[] = [
    {
        id: "landing-page-profesional",
        tag: "landing_page",
        destacado: false,
        titulo: "Landing Page Profesional",
        subtitulo: "Una página estratégica para presentar tu servicio y generar consultas.",
        ideal:
            "Profesionales independientes, emprendedores, prestadores de servicios y pequeños negocios que quieren mostrar lo que hacen de forma profesional y empezar a recibir consultas por internet.",
        objetivo:
            "Presentar tu servicio de forma clara, transmitir confianza y facilitar que las personas interesadas te contacten por WhatsApp o formulario.",
        descripcion:
            "Una página estratégica para promocionar un servicio, producto o campaña específica con foco en conversión.",
        href: "/servicios/planes/landing_page",
        precio: "Desde $80.000",
        plazo: "Entrega estimada: 4 a 6 días hábiles",
        whatsappMensaje:
            "Hola Pablo, quiero solicitar presupuesto por una Landing Page Profesional.",
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
            "Formulario de contacto",
            "SEO técnico inicial",
            "Google Analytics",
            "Optimización de rendimiento",
            "Asesoramiento para dominio y hosting"
        ],
        preguntas: [
            {
                pregunta: "¿La Landing Page sirve para aparecer en Google?",
                respuesta:
                    "Sí. Se entrega con una base de SEO técnico inicial para que Google pueda rastrear e interpretar correctamente la página."
            },
            {
                pregunta: "¿Puedo recibir consultas por WhatsApp?",
                respuesta:
                    "Sí. Se integran botones de WhatsApp con mensajes personalizados para facilitar el contacto."
            },
            {
                pregunta: "¿Incluye dominio y hosting?",
                respuesta:
                    "Incluye asesoramiento para dominio y hosting. Si lo necesitás, también puedo ayudarte con la configuración."
            }
        ]
    },
    {
        id: "sitio-web-profesional",
        tag: "sitio_web",
        destacado: true,
        etiqueta: "Más elegido",
        titulo: "Sitio Web Profesional",
        subtitulo: "Un sitio completo para empresas que necesitan transmitir confianza.",
        ideal:
            "Empresas, estudios profesionales, consultoras, restaurantes, constructoras, clínicas y negocios que necesitan explicar mejor sus servicios y consolidar su presencia online.",
        objetivo:
            "Mostrar tu empresa con una imagen profesional, ordenar la información de tus servicios y facilitar que nuevos clientes se contacten.",
        descripcion:
            "Un sitio web completo para marcas que necesitan más secciones, mayor profundidad de contenido y una presencia online más sólida.",
        href: "/servicios/planes/sitio_web",
        precio: "Desde $450.000",
        plazo: "Entrega estimada: 7 a 15 días hábiles",
        whatsappMensaje:
            "Hola Pablo, quiero solicitar presupuesto por un Sitio Web Profesional.",
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
            "Sitio web multipágina",
            "Secciones adaptadas a tu negocio",
            "Integración con WhatsApp",
            "Formularios de contacto",
            "Optimización SEO técnica",
            "Google Analytics y Search Console",
            "Blog opcional",
            "Panel básico de administración opcional",
            "Alto rendimiento y buena experiencia de usuario"
        ],
        preguntas: [
            {
                pregunta: "¿Qué diferencia hay con una Landing Page?",
                respuesta:
                    "La Landing Page está enfocada en una sola página y un objetivo puntual. El Sitio Web Profesional permite mostrar más información, servicios, páginas internas y contenido institucional."
            },
            {
                pregunta: "¿Puedo agregar más secciones después?",
                respuesta:
                    "Sí. El sitio se puede preparar para crecer y sumar nuevas secciones o páginas en el futuro."
            },
            {
                pregunta: "¿Incluye Google Analytics?",
                respuesta:
                    "Sí. Se puede configurar Google Analytics y Search Console para medir visitas, clics, rendimiento y acciones importantes dentro del sitio."
            }
        ]
    },
    {
        id: "desarrollo-web-a-medida",
        tag: "desarrollo_web",
        destacado: false,
        titulo: "Desarrollo Web a Medida",
        subtitulo: "Soluciones personalizadas para procesos, sistemas y funcionalidades específicas.",
        ideal:
            "Empresas y negocios que necesitan funcionalidades específicas, procesos personalizados o herramientas internas para trabajar mejor.",
        objetivo:
            "Crear una solución digital adaptada a las necesidades reales del negocio para ahorrar tiempo, ordenar procesos y mejorar la gestión.",
        descripcion:
            "Desarrollo personalizado para proyectos que necesitan más que una página web tradicional.",
        href: "/servicios/planes/desarrollo_web",
        precio: "A presupuestar",
        plazo: "Plazo según alcance del proyecto",
        whatsappMensaje:
            "Hola Pablo, quiero consultar por un Desarrollo Web a Medida.",
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
            "Desarrollo completamente personalizado",
            "Paneles de administración",
            "Sistemas de reservas o turnos",
            "Gestión de clientes",
            "Dashboards y paneles de control",
            "Integración con APIs externas",
            "Automatización de procesos",
            "Base de datos segura",
            "Arquitectura escalable",
            "Preparado para futuras funcionalidades"
        ],
        preguntas: [
            {
                pregunta: "¿Por qué no tiene precio fijo?",
                respuesta:
                    "Porque depende del alcance, la cantidad de funcionalidades, integraciones, base de datos y nivel de complejidad del sistema."
            },
            {
                pregunta: "¿Puede incluir panel de administración?",
                respuesta:
                    "Sí. Se pueden desarrollar paneles para gestionar contenido, clientes, reservas, productos u otros datos."
            },
            {
                pregunta: "¿Se puede conectar con servicios externos?",
                respuesta:
                    "Sí. Se pueden integrar APIs, formularios, sistemas de pago, herramientas de análisis u otros servicios según el proyecto."
            }
        ]
    }
];

export const procesoPlan: ProcesoPlan[] = [
    {
        numero: "01",
        titulo: "Análisis",
        descripcion:
            "Revisamos tu negocio, tus objetivos y qué necesita comunicar o resolver la web."
    },
    {
        numero: "02",
        titulo: "Propuesta",
        descripcion:
            "Definimos estructura, secciones, contenido y enfoque visual del proyecto."
    },
    {
        numero: "03",
        titulo: "Desarrollo",
        descripcion:
            "Construyo la página o sistema con foco en rendimiento, claridad y experiencia de usuario."
    },
    {
        numero: "04",
        titulo: "Entrega",
        descripcion:
            "Publicamos el proyecto, revisamos detalles finales y dejamos todo listo para usar."
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
