import type { TrabajosType } from "@/types/trabajos";

type CommercialLink = {
    label: string;
    href: string;
};

export type TrabajoCommercialContent = {
    displayName: string;
    category: string;
    seoTitle: string;
    seoDescription: string;
    commercialSummary: string;
    information?: string;
    challenge?: string;
    outcome: string;
    featuredPriority: number;
    primaryCta: CommercialLink;
    relatedPlan: CommercialLink;
};

export type TrabajoCommercialView = Omit<
    TrabajoCommercialContent,
    "information" | "challenge"
> & {
    information: string;
    challenge: string;
};

export const trabajoCommercialContentBySlug = {
    "paginas-web-chavez": {
        displayName: "PaginasWebChavez",
        category: "Sitio web profesional",
        seoTitle: "PaginasWebChavez — Sitio web profesional",
        seoDescription:
            "Caso de estudio de un sitio web profesional creado para presentar servicios, mostrar proyectos y facilitar consultas desde una experiencia rápida y clara.",
        commercialSummary:
            "Sitio web profesional creado para presentar servicios de diseño y desarrollo, mostrar proyectos reales y facilitar consultas con una experiencia clara, rápida y preparada para crecer.",
        outcome:
            "El resultado es una plataforma comercial que reúne servicios, planes, proyectos y canales de contacto en un recorrido simple. La arquitectura permite actualizar el contenido y sumar nuevas soluciones sin rehacer el sitio desde cero.",
        featuredPriority: 30,
        primaryCta: {
            label: "Quiero una web similar",
            href: "/contacto"
        },
        relatedPlan: {
            label: "Ver el plan Sitio Web Profesional",
            href: "/servicios/planes/sitio_web"
        }
    },
    plomada: {
        displayName: "Plomada",
        category: "Landing page para servicios",
        seoTitle: "Plomada — Página web para servicios de plomería",
        seoDescription:
            "Proyecto de landing page para un servicio de plomería, pensado para comunicar urgencias con claridad y facilitar el contacto inmediato por WhatsApp.",
        commercialSummary:
            "Proyecto de landing page para un servicio de plomería, pensado para que una persona con una urgencia identifique rápidamente cómo pedir ayuda y pueda contactar por WhatsApp sin recorrer información innecesaria.",
        information:
            "La propuesta organiza los servicios principales, las zonas de atención y los canales de contacto en una sola página. El contenido prioriza mensajes breves, botones visibles y una navegación directa desde dispositivos móviles.",
        challenge:
            "El desafío fue reducir la fricción en una situación urgente: mostrar primero la solución, mantener siempre visible el contacto y evitar elementos que demoren la decisión del usuario.",
        outcome:
            "El proyecto define una experiencia simple y enfocada en una acción concreta: pedir asistencia. La estructura puede ampliarse con servicios, preguntas frecuentes y referencias reales cuando el negocio disponga de ese contenido.",
        featuredPriority: 20,
        primaryCta: {
            label: "Consultar por una landing",
            href: "/contacto"
        },
        relatedPlan: {
            label: "Ver el plan Landing Page Profesional",
            href: "/servicios/planes/landing_page"
        }
    },
    "jardineria-montanez": {
        displayName: "Jardinería Montañez",
        category: "Landing page para servicios",
        seoTitle: "Jardinería Montañez — Web para servicios de jardinería",
        seoDescription:
            "Caso real de una landing page para servicios de jardinería, creada para mostrar trabajos, transmitir confianza y recibir consultas por WhatsApp.",
        commercialSummary:
            "Landing page desarrollada para presentar servicios de jardinería, mostrar trabajos realizados y facilitar consultas por WhatsApp desde una experiencia clara y adaptada a celulares.",
        outcome:
            "El resultado reúne propuesta de valor, servicios, trabajos y contacto en un recorrido corto. La página permite que una persona entienda rápidamente qué ofrece el negocio y cómo solicitar una consulta.",
        featuredPriority: 50,
        primaryCta: {
            label: "Consultar por una landing",
            href: "/contacto"
        },
        relatedPlan: {
            label: "Ver el plan Landing Page Profesional",
            href: "/servicios/planes/landing_page"
        }
    },
    elu: {
        displayName: "Creaciones ELU",
        category: "Landing page para productos",
        seoTitle: "Creaciones ELU — Landing page para productos artesanales",
        seoDescription:
            "Landing page para un emprendimiento de calzado artesanal, diseñada para presentar productos, comunicar el valor del trabajo y generar consultas.",
        commercialSummary:
            "Landing page para un emprendimiento de calzado artesanal, diseñada para presentar modelos, transmitir el valor del trabajo manual y facilitar consultas directas por WhatsApp.",
        outcome:
            "El resultado es una presentación comercial cálida y ordenada que combina historia, productos y contacto. La identidad visual acompaña el carácter artesanal sin dificultar la navegación ni la consulta.",
        featuredPriority: 40,
        primaryCta: {
            label: "Consultar por una landing",
            href: "/contacto"
        },
        relatedPlan: {
            label: "Ver el plan Landing Page Profesional",
            href: "/servicios/planes/landing_page"
        }
    },
    "esperanza-de-vida": {
        displayName: "Esperanza de Vida",
        category: "Desarrollo web a medida",
        seoTitle: "Esperanza de Vida — Plataforma institucional educativa",
        seoDescription:
            "Proyecto de plataforma web para centralizar contenido, eventos y gestión académica en una solución preparada para incorporar nuevas funciones.",
        commercialSummary:
            "Proyecto de plataforma web pensado para centralizar información, actividades y contenidos de la comunidad, con una base preparada para sumar gestión académica y nuevas herramientas.",
        information:
            "La propuesta reúne información institucional, eventos, contenidos y transmisiones en una experiencia accesible desde distintos dispositivos. Su evolución contempla usuarios, publicaciones y herramientas para administrar clases, estudiantes y actividades académicas.",
        challenge:
            "El principal desafío es organizar necesidades diferentes dentro de una arquitectura clara y escalable, evitando que el crecimiento del sistema complique la experiencia de quienes consultan o administran la plataforma.",
        outcome:
            "El proyecto establece una base modular para avanzar por etapas. Esto permite priorizar las funciones más importantes y sumar administración, contenidos y herramientas académicas a medida que se validan las necesidades reales.",
        featuredPriority: 10,
        primaryCta: {
            label: "Solicitar presupuesto",
            href: "/contacto"
        },
        relatedPlan: {
            label: "Ver Desarrollo Web a Medida",
            href: "/servicios/planes/desarrollo_web"
        }
    }
} as const satisfies Record<string, TrabajoCommercialContent>;

const commercialContentLookup: Readonly<
    Record<string, TrabajoCommercialContent>
> = trabajoCommercialContentBySlug;

export const getTrabajoCommercialContent = (
    trabajo: TrabajosType
): TrabajoCommercialView => {
    const content = commercialContentLookup[trabajo.slug];

    if (content) {
        return {
            ...content,
            information: content.information ?? trabajo.informacion_trabajo,
            challenge: content.challenge ?? trabajo.reto_tecnico
        };
    }

    const displayName = trabajo.nombre_trabajo;
    const category = trabajo.categoria_trabajo || "Proyecto web";
    const normalizedCategory = category.toLowerCase();

    return {
        displayName,
        category,
        seoTitle: `${displayName} — Proyecto web`,
        seoDescription:
            `Conocé ${displayName}, un proyecto de ${normalizedCategory} presentado por PaginasWebChavez con foco en claridad, confianza y facilidad de contacto.`,
        commercialSummary:
            `${displayName} es un proyecto de ${normalizedCategory} pensado para presentar la propuesta con claridad y facilitar que cada persona encuentre la información y el canal de contacto adecuados.`,
        information:
            trabajo.informacion_trabajo?.trim() ||
            "La propuesta organiza la información principal en un recorrido simple, con mensajes claros y acciones fáciles de identificar.",
        challenge:
            trabajo.reto_tecnico?.trim() ||
            "El desafío del proyecto fue ordenar las necesidades principales sin agregar complejidad innecesaria para quien usa la página.",
        outcome:
            "El caso presenta una base clara y adaptable para comunicar la propuesta, ordenar la información y orientar a cada persona hacia el próximo paso.",
        featuredPriority: 0,
        primaryCta: {
            label: "Quiero una web similar",
            href: "/contacto"
        },
        relatedPlan: {
            label: "Ver servicios web",
            href: "/servicios"
        }
    };
};
