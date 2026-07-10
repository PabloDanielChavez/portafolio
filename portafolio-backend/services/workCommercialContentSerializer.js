import { PATRON_ENLACE_INTERNO_COMERCIAL } from '../constants/workCommercialContent.js';

const FALLBACK_NOMBRE_PROYECTO = 'Proyecto web';
const FALLBACK_CATEGORIA = 'Proyecto web';
const FALLBACK_CTA_PRINCIPAL = Object.freeze({
    label: 'Quiero una web similar',
    href: '/contacto'
});
const FALLBACK_PLAN_RELACIONADO = Object.freeze({
    label: 'Ver servicios web',
    href: '/servicios'
});

export const esTextoNoVacio = (valor) =>
    typeof valor === 'string' && valor.trim().length > 0;

export const esRutaInterna = (valor) =>
    esTextoNoVacio(valor) && PATRON_ENLACE_INTERNO_COMERCIAL.test(valor.trim());

export const resolverTexto = ({ comercial, legacy, fallback }) => {
    if (esTextoNoVacio(comercial)) return comercial.trim();
    if (esTextoNoVacio(legacy)) return legacy.trim();

    return fallback;
};

const convertirPlano = (valor) => {
    if (!valor) return valor;
    if (typeof valor.toJSON === 'function') return valor.toJSON();
    if (typeof valor.get === 'function') return valor.get({ plain: true });

    return valor;
};

const obtenerContenidoComercialPublicado = (trabajoPlano) => {
    const contenidoComercial = convertirPlano(trabajoPlano.commercialContent);

    if (!contenidoComercial?.is_commercial_public) return null;

    return contenidoComercial;
};

const crearDescripcionSeoFallback = ({ displayName, category }) =>
    `Conocé ${displayName}, un proyecto de ${category.toLowerCase()} presentado por PaginasWebChavez con foco en claridad, confianza y facilidad de contacto.`;

const crearResumenComercialFallback = ({ displayName, category }) =>
    `${displayName} es un proyecto de ${category.toLowerCase()} pensado para presentar la propuesta con claridad y facilitar que cada persona encuentre la información y el canal de contacto adecuados.`;

export const resolverContenidoComercialTrabajo = (trabajo) => {
    const trabajoPlano = convertirPlano(trabajo) ?? {};
    const contenidoComercial = obtenerContenidoComercialPublicado(trabajoPlano);
    const displayName = resolverTexto({
        comercial: contenidoComercial?.display_name,
        legacy: trabajoPlano.nombre_trabajo,
        fallback: FALLBACK_NOMBRE_PROYECTO
    });
    const category = resolverTexto({
        comercial: contenidoComercial?.commercial_category,
        legacy: trabajoPlano.categoria_trabajo,
        fallback: FALLBACK_CATEGORIA
    });
    const featuredPriority = Number.isInteger(
        contenidoComercial?.featured_priority
    )
        ? contenidoComercial.featured_priority
        : 0;

    return {
        displayName,
        category,
        seoTitle: resolverTexto({
            comercial: contenidoComercial?.seo_title,
            legacy: null,
            fallback: `${displayName} — Proyecto web`
        }),
        seoDescription: resolverTexto({
            comercial: contenidoComercial?.seo_description,
            legacy: null,
            fallback: crearDescripcionSeoFallback({ displayName, category })
        }),
        commercialSummary: resolverTexto({
            comercial: contenidoComercial?.commercial_summary,
            legacy: null,
            fallback: crearResumenComercialFallback({ displayName, category })
        }),
        information: resolverTexto({
            comercial: contenidoComercial?.information,
            legacy: trabajoPlano.informacion_trabajo,
            fallback:
                'La propuesta organiza la información principal en un recorrido simple, con mensajes claros y acciones fáciles de identificar.'
        }),
        challenge: resolverTexto({
            comercial: contenidoComercial?.challenge,
            legacy: trabajoPlano.reto_tecnico,
            fallback:
                'El desafío del proyecto fue ordenar las necesidades principales sin agregar complejidad innecesaria para quien usa la página.'
        }),
        outcome: resolverTexto({
            comercial: contenidoComercial?.outcome,
            legacy: null,
            fallback:
                'El caso presenta una base clara y adaptable para comunicar la propuesta, ordenar la información y orientar a cada persona hacia el próximo paso.'
        }),
        featuredPriority,
        primaryCta: {
            label: resolverTexto({
                comercial: contenidoComercial?.primary_cta_label,
                legacy: null,
                fallback: FALLBACK_CTA_PRINCIPAL.label
            }),
            href: esRutaInterna(contenidoComercial?.primary_cta_href)
                ? contenidoComercial.primary_cta_href.trim()
                : FALLBACK_CTA_PRINCIPAL.href
        },
        relatedPlan: {
            label: resolverTexto({
                comercial: contenidoComercial?.related_plan_label,
                legacy: null,
                fallback: FALLBACK_PLAN_RELACIONADO.label
            }),
            href: esRutaInterna(contenidoComercial?.related_plan_href)
                ? contenidoComercial.related_plan_href.trim()
                : FALLBACK_PLAN_RELACIONADO.href
        }
    };
};

export const serializarTrabajo = (trabajo) => {
    const trabajoPlano = convertirPlano(trabajo) ?? {};
    const { commercialContent: _commercialContent, ...camposTrabajo } =
        trabajoPlano;

    return {
        ...camposTrabajo,
        commercialContent: resolverContenidoComercialTrabajo(trabajoPlano)
    };
};

export const serializarTrabajos = (trabajos = []) =>
    trabajos.map((trabajo) => serializarTrabajo(trabajo));
