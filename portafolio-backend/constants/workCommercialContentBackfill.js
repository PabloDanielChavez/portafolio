// Fuente temporal para backfill de contenido comercial de trabajos.
// No es fuente operativa permanente, no reemplaza la base de datos y no es CMS.
// Debe retirarse cuando el contenido migrado a DB quede validado en produccion.

export const contenidoComercialTrabajosBackfill = Object.freeze({
    'paginas-web-chavez': Object.freeze({
        displayName: 'PaginasWebChavez',
        category: 'Sitio web profesional',
        seoTitle: 'PaginasWebChavez \u2014 Sitio web profesional',
        seoDescription:
            'Caso de estudio de un sitio web profesional creado para presentar servicios, mostrar proyectos y facilitar consultas desde una experiencia r\u00e1pida y clara.',
        commercialSummary:
            'Sitio web profesional creado para presentar servicios de dise\u00f1o y desarrollo, mostrar proyectos reales y facilitar consultas con una experiencia clara, r\u00e1pida y preparada para crecer.',
        outcome:
            'El resultado es una plataforma comercial que re\u00fane servicios, planes, proyectos y canales de contacto en un recorrido simple. La arquitectura permite actualizar el contenido y sumar nuevas soluciones sin rehacer el sitio desde cero.',
        featuredPriority: 30,
        primaryCta: Object.freeze({
            label: 'Quiero una web similar',
            href: '/contacto'
        }),
        relatedPlan: Object.freeze({
            label: 'Ver el plan Sitio Web Profesional',
            href: '/servicios/planes/sitio_web'
        })
    }),
    plomada: Object.freeze({
        displayName: 'Plomada',
        category: 'Landing page para servicios',
        seoTitle: 'Plomada \u2014 P\u00e1gina web para servicios de plomer\u00eda',
        seoDescription:
            'Proyecto de landing page para un servicio de plomer\u00eda, pensado para comunicar urgencias con claridad y facilitar el contacto inmediato por WhatsApp.',
        commercialSummary:
            'Proyecto de landing page para un servicio de plomer\u00eda, pensado para que una persona con una urgencia identifique r\u00e1pidamente c\u00f3mo pedir ayuda y pueda contactar por WhatsApp sin recorrer informaci\u00f3n innecesaria.',
        information:
            'La propuesta organiza los servicios principales, las zonas de atenci\u00f3n y los canales de contacto en una sola p\u00e1gina. El contenido prioriza mensajes breves, botones visibles y una navegaci\u00f3n directa desde dispositivos m\u00f3viles.',
        challenge:
            'El desaf\u00edo fue reducir la fricci\u00f3n en una situaci\u00f3n urgente: mostrar primero la soluci\u00f3n, mantener siempre visible el contacto y evitar elementos que demoren la decisi\u00f3n del usuario.',
        outcome:
            'El proyecto define una experiencia simple y enfocada en una acci\u00f3n concreta: pedir asistencia. La estructura puede ampliarse con servicios, preguntas frecuentes y referencias reales cuando el negocio disponga de ese contenido.',
        featuredPriority: 20,
        primaryCta: Object.freeze({
            label: 'Consultar por una landing',
            href: '/contacto'
        }),
        relatedPlan: Object.freeze({
            label: 'Ver el plan Landing Page Profesional',
            href: '/servicios/planes/landing_page'
        })
    }),
    'jardineria-montanez': Object.freeze({
        displayName: 'Jardiner\u00eda Monta\u00f1ez',
        category: 'Landing page para servicios',
        seoTitle:
            'Jardiner\u00eda Monta\u00f1ez \u2014 Web para servicios de jardiner\u00eda',
        seoDescription:
            'Caso real de una landing page para servicios de jardiner\u00eda, creada para mostrar trabajos, transmitir confianza y recibir consultas por WhatsApp.',
        commercialSummary:
            'Landing page desarrollada para presentar servicios de jardiner\u00eda, mostrar trabajos realizados y facilitar consultas por WhatsApp desde una experiencia clara y adaptada a celulares.',
        outcome:
            'El resultado re\u00fane propuesta de valor, servicios, trabajos y contacto en un recorrido corto. La p\u00e1gina permite que una persona entienda r\u00e1pidamente qu\u00e9 ofrece el negocio y c\u00f3mo solicitar una consulta.',
        featuredPriority: 50,
        primaryCta: Object.freeze({
            label: 'Consultar por una landing',
            href: '/contacto'
        }),
        relatedPlan: Object.freeze({
            label: 'Ver el plan Landing Page Profesional',
            href: '/servicios/planes/landing_page'
        })
    }),
    elu: Object.freeze({
        displayName: 'Creaciones ELU',
        category: 'Landing page para productos',
        seoTitle: 'Creaciones ELU \u2014 Landing page para productos artesanales',
        seoDescription:
            'Landing page para un emprendimiento de calzado artesanal, dise\u00f1ada para presentar productos, comunicar el valor del trabajo y generar consultas.',
        commercialSummary:
            'Landing page para un emprendimiento de calzado artesanal, dise\u00f1ada para presentar modelos, transmitir el valor del trabajo manual y facilitar consultas directas por WhatsApp.',
        outcome:
            'El resultado es una presentaci\u00f3n comercial c\u00e1lida y ordenada que combina historia, productos y contacto. La identidad visual acompa\u00f1a el car\u00e1cter artesanal sin dificultar la navegaci\u00f3n ni la consulta.',
        featuredPriority: 40,
        primaryCta: Object.freeze({
            label: 'Consultar por una landing',
            href: '/contacto'
        }),
        relatedPlan: Object.freeze({
            label: 'Ver el plan Landing Page Profesional',
            href: '/servicios/planes/landing_page'
        })
    }),
    'esperanza-de-vida': Object.freeze({
        displayName: 'Esperanza de Vida',
        category: 'Desarrollo web a medida',
        seoTitle: 'Esperanza de Vida \u2014 Plataforma institucional educativa',
        seoDescription:
            'Proyecto de plataforma web para centralizar contenido, eventos y gesti\u00f3n acad\u00e9mica en una soluci\u00f3n preparada para incorporar nuevas funciones.',
        commercialSummary:
            'Proyecto de plataforma web pensado para centralizar informaci\u00f3n, actividades y contenidos de la comunidad, con una base preparada para sumar gesti\u00f3n acad\u00e9mica y nuevas herramientas.',
        information:
            'La propuesta re\u00fane informaci\u00f3n institucional, eventos, contenidos y transmisiones en una experiencia accesible desde distintos dispositivos. Su evoluci\u00f3n contempla usuarios, publicaciones y herramientas para administrar clases, estudiantes y actividades acad\u00e9micas.',
        challenge:
            'El principal desaf\u00edo es organizar necesidades diferentes dentro de una arquitectura clara y escalable, evitando que el crecimiento del sistema complique la experiencia de quienes consultan o administran la plataforma.',
        outcome:
            'El proyecto establece una base modular para avanzar por etapas. Esto permite priorizar las funciones m\u00e1s importantes y sumar administraci\u00f3n, contenidos y herramientas acad\u00e9micas a medida que se validan las necesidades reales.',
        featuredPriority: 10,
        primaryCta: Object.freeze({
            label: 'Solicitar presupuesto',
            href: '/contacto'
        }),
        relatedPlan: Object.freeze({
            label: 'Ver Desarrollo Web a Medida',
            href: '/servicios/planes/desarrollo_web'
        })
    })
});

export const slugsContenidoComercialBackfill = Object.freeze(
    Object.keys(contenidoComercialTrabajosBackfill)
);
