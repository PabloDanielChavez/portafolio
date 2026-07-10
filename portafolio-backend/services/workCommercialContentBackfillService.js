import { contenidoComercialTrabajosBackfill } from '../constants/workCommercialContentBackfill.js';
import { PATRON_ENLACE_INTERNO_COMERCIAL } from '../constants/workCommercialContent.js';
import {
    WORK_SLUG_MAX_LENGTH,
    WORK_SLUG_PATTERN
} from '../constants/workSlugs.js';

const PUBLICAR_CONTENIDO_VALIDADO = true;
const LONGITUD_MAXIMA_SEO_TITLE = 120;
const LONGITUD_MAXIMA_SEO_DESCRIPTION = 180;
const MARCADORES_MOJIBAKE = Object.freeze([
    {
        nombre: 'secuencia U+00C3',
        marcador: String.fromCharCode(0x00c3)
    },
    {
        nombre: 'secuencia U+00C2',
        marcador: String.fromCharCode(0x00c2)
    },
    {
        nombre: 'secuencia U+00E2',
        marcador: String.fromCharCode(0x00e2)
    },
    {
        nombre: 'caracter de reemplazo',
        marcador: String.fromCharCode(0xfffd)
    },
    {
        nombre: 'caracter de reemplazo mojibake',
        marcador:
            String.fromCharCode(0x00ef) +
            String.fromCharCode(0x00bf) +
            String.fromCharCode(0x00bd)
    }
]);
const CAMPOS_TEXTO_CONTENIDO_COMERCIAL = Object.freeze([
    ['displayName'],
    ['category'],
    ['seoTitle'],
    ['seoDescription'],
    ['commercialSummary'],
    ['information'],
    ['challenge'],
    ['outcome'],
    ['primaryCta', 'label'],
    ['primaryCta', 'href'],
    ['relatedPlan', 'label'],
    ['relatedPlan', 'href']
]);

export const esSlugValido = (slug) =>
    typeof slug === 'string' &&
    slug.length >= 1 &&
    slug.length <= WORK_SLUG_MAX_LENGTH &&
    WORK_SLUG_PATTERN.test(slug) &&
    /[a-z]/.test(slug);

export const detectarMojibake = (valor) => {
    if (typeof valor !== 'string' || valor.length === 0) return [];

    return MARCADORES_MOJIBAKE.filter(({ marcador }) =>
        valor.includes(marcador)
    ).map(({ nombre }) => nombre);
};

const obtenerValorCampo = (contenido, rutaCampo) =>
    rutaCampo.reduce((valor, segmento) => valor?.[segmento], contenido);

export const validarCodificacionContenidoComercial = (slug, contenido) =>
    CAMPOS_TEXTO_CONTENIDO_COMERCIAL.flatMap((rutaCampo) => {
        const valor = obtenerValorCampo(contenido, rutaCampo);
        const patrones = detectarMojibake(valor);

        if (patrones.length === 0) return [];

        return [
            {
                slug,
                campo: rutaCampo.join('.'),
                patrones
            }
        ];
    });

export const parsearArgumentosBackfill = (argumentos = []) => {
    const opciones = {
        aplicar: false,
        sobrescribir: false,
        slug: null,
        json: false,
        fallarSiFaltaTrabajo: false,
        fallarSiFaltaContenido: false
    };

    for (const argumento of argumentos) {
        if (argumento === '--dry-run') continue;
        if (argumento === '--apply') {
            opciones.aplicar = true;
            continue;
        }
        if (argumento === '--overwrite') {
            opciones.sobrescribir = true;
            continue;
        }
        if (argumento === '--json') {
            opciones.json = true;
            continue;
        }
        if (argumento === '--fail-on-missing-db') {
            opciones.fallarSiFaltaTrabajo = true;
            continue;
        }
        if (argumento === '--fail-on-missing-content') {
            opciones.fallarSiFaltaContenido = true;
            continue;
        }
        if (argumento.startsWith('--slug=')) {
            opciones.slug = argumento.slice('--slug='.length);
            continue;
        }

        throw new Error(`Argumento no reconocido: ${argumento}`);
    }

    if (opciones.slug && !esSlugValido(opciones.slug)) {
        throw new Error(`El slug filtrado no es válido: ${opciones.slug}`);
    }

    return opciones;
};

const normalizarEntradasContenido = (contenidoFuente) => {
    if (Array.isArray(contenidoFuente)) return contenidoFuente;

    return Object.entries(contenidoFuente).map(([slug, contenido]) => ({
        slug,
        contenido
    }));
};

const validarTextoOpcional = (valor, campo, maximo, errores, slug) => {
    if (valor === undefined || valor === null) return;

    if (typeof valor !== 'string' || valor.length > maximo) {
        errores.push(`${slug}: ${campo} no respeta el largo máximo ${maximo}`);
    }
};

const validarContenidoComercial = (slug, contenido, errores) => {
    validarTextoOpcional(contenido.displayName, 'displayName', 120, errores, slug);
    validarTextoOpcional(contenido.category, 'category', 120, errores, slug);
    validarTextoOpcional(
        contenido.seoTitle,
        'seoTitle',
        LONGITUD_MAXIMA_SEO_TITLE,
        errores,
        slug
    );
    validarTextoOpcional(
        contenido.seoDescription,
        'seoDescription',
        LONGITUD_MAXIMA_SEO_DESCRIPTION,
        errores,
        slug
    );

    if (!Number.isInteger(contenido.featuredPriority)) {
        errores.push(`${slug}: featuredPriority debe ser entero`);
    }

    for (const [campo, enlace] of [
        ['primaryCta.href', contenido.primaryCta?.href],
        ['relatedPlan.href', contenido.relatedPlan?.href]
    ]) {
        if (!PATRON_ENLACE_INTERNO_COMERCIAL.test(enlace ?? '')) {
            errores.push(`${slug}: ${campo} debe ser una ruta interna`);
        }
    }

    for (const problema of validarCodificacionContenidoComercial(slug, contenido)) {
        errores.push(
            `${slug}: ${problema.campo} contiene mojibake (${problema.patrones.join(
                ', '
            )})`
        );
    }
};

export const mapearContenidoComercial = ({ slug, trabajo, contenido }) => ({
    trabajo_id: trabajo.id,
    slug_snapshot: slug,
    display_name: contenido.displayName ?? null,
    commercial_category: contenido.category ?? null,
    seo_title: contenido.seoTitle ?? null,
    seo_description: contenido.seoDescription ?? null,
    commercial_summary: contenido.commercialSummary ?? null,
    information: contenido.information ?? null,
    challenge: contenido.challenge ?? null,
    outcome: contenido.outcome ?? null,
    featured_priority: contenido.featuredPriority,
    primary_cta_label: contenido.primaryCta?.label ?? null,
    primary_cta_href: contenido.primaryCta?.href ?? null,
    related_plan_label: contenido.relatedPlan?.label ?? null,
    related_plan_href: contenido.relatedPlan?.href ?? null,
    is_commercial_public: PUBLICAR_CONTENIDO_VALIDADO
});

export const analizarBackfillContenidoComercial = ({
    trabajosDb,
    contenidoFuente = contenidoComercialTrabajosBackfill,
    filasComercialesExistentes = [],
    opciones = {},
    advertencias = []
}) => {
    const entradasIniciales = normalizarEntradasContenido(contenidoFuente);
    const entradasContenido = opciones.slug
        ? entradasIniciales.filter(({ slug }) => slug === opciones.slug)
        : entradasIniciales;
    const trabajosFiltrados = opciones.slug
        ? trabajosDb.filter((trabajo) => trabajo.slug === opciones.slug)
        : trabajosDb;
    const errores = [];
    const slugsVistos = new Set();

    for (const { slug, contenido } of entradasContenido) {
        if (!esSlugValido(slug)) {
            errores.push(`Slug inválido en contenido comercial: ${slug}`);
            continue;
        }

        if (slugsVistos.has(slug)) {
            errores.push(`Slug duplicado en contenido comercial: ${slug}`);
            continue;
        }

        slugsVistos.add(slug);
        validarContenidoComercial(slug, contenido, errores);
    }

    if (errores.length > 0) {
        return {
            ok: false,
            modo: opciones.aplicar ? 'apply' : 'dry-run',
            escrituraDb: false,
            errores,
            advertencias
        };
    }

    const contenidoPorSlug = new Map(
        entradasContenido.map(({ slug, contenido }) => [slug, contenido])
    );
    const trabajosPorSlug = new Map(
        trabajosFiltrados.map((trabajo) => [trabajo.slug, trabajo])
    );
    const existentesPorTrabajoId = new Map(
        filasComercialesExistentes.map((fila) => [Number(fila.trabajo_id), fila])
    );
    const filasCrear = [];
    const filasActualizar = [];
    const omitidasPorExistente = [];
    const contenidoSinTrabajoDb = [];
    const trabajosSinContenido = [];

    for (const [slug, contenido] of contenidoPorSlug) {
        const trabajo = trabajosPorSlug.get(slug);

        if (!trabajo) {
            contenidoSinTrabajoDb.push(slug);
            continue;
        }

        const filaExistente = existentesPorTrabajoId.get(Number(trabajo.id));
        const filaMapeada = mapearContenidoComercial({
            slug,
            trabajo,
            contenido
        });

        if (filaExistente) {
            if (opciones.sobrescribir) {
                filasActualizar.push(filaMapeada);
            } else {
                omitidasPorExistente.push({
                    slug,
                    trabajo_id: trabajo.id
                });
            }
            continue;
        }

        filasCrear.push(filaMapeada);
    }

    for (const trabajo of trabajosFiltrados) {
        if (!contenidoPorSlug.has(trabajo.slug)) {
            trabajosSinContenido.push({
                id: trabajo.id,
                slug: trabajo.slug,
                nombre_trabajo: trabajo.nombre_trabajo
            });
        }
    }

    if (opciones.fallarSiFaltaTrabajo && contenidoSinTrabajoDb.length > 0) {
        errores.push(
            `Hay contenido comercial sin trabajo DB: ${contenidoSinTrabajoDb.join(', ')}`
        );
    }

    if (opciones.fallarSiFaltaContenido && trabajosSinContenido.length > 0) {
        errores.push(
            `Hay trabajos DB sin contenido comercial: ${trabajosSinContenido
                .map((trabajo) => trabajo.slug)
                .join(', ')}`
        );
    }

    return {
        ok: errores.length === 0,
        modo: opciones.aplicar ? 'apply' : 'dry-run',
        escrituraDb: opciones.aplicar === true,
        errores,
        advertencias,
        totales: {
            trabajosDb: trabajosFiltrados.length,
            entradasComerciales: entradasContenido.length,
            crear: filasCrear.length,
            actualizar: filasActualizar.length,
            omitidasPorExistente: omitidasPorExistente.length,
            trabajosSinContenido: trabajosSinContenido.length,
            contenidoSinTrabajoDb: contenidoSinTrabajoDb.length
        },
        filasCrear,
        filasActualizar,
        omitidasPorExistente,
        trabajosSinContenido,
        contenidoSinTrabajoDb
    };
};

export const formatearReporteBackfill = (reporte) => {
    const lineas = [
        `BACKFILL WORK COMMERCIAL CONTENT — ${
            reporte.modo === 'apply' ? 'APPLY' : 'DRY RUN'
        }`,
        '',
        `Modo: ${reporte.modo}`,
        `Escritura en DB: ${reporte.escrituraDb ? 'SI' : 'NO'}`,
        '',
        `Trabajos encontrados en DB: ${reporte.totales?.trabajosDb ?? 0}`,
        `Entradas comerciales encontradas: ${reporte.totales?.entradasComerciales ?? 0}`,
        '',
        `Se crearían: ${reporte.totales?.crear ?? 0}`,
        `Se actualizarían: ${reporte.totales?.actualizar ?? 0}`,
        `Se omitirían por existente: ${reporte.totales?.omitidasPorExistente ?? 0}`,
        `Trabajos DB sin contenido comercial: ${reporte.totales?.trabajosSinContenido ?? 0}`,
        `Contenido comercial sin trabajo DB: ${reporte.totales?.contenidoSinTrabajoDb ?? 0}`,
        ''
    ];

    if (reporte.filasCrear?.length > 0) {
        lineas.push('Slugs que se crearían:');
        for (const fila of reporte.filasCrear) {
            lineas.push(`- ${fila.slug_snapshot}`);
        }
        lineas.push('');
    }

    if (reporte.omitidasPorExistente?.length > 0) {
        lineas.push('Slugs omitidos por fila existente:');
        for (const fila of reporte.omitidasPorExistente) {
            lineas.push(`- ${fila.slug}`);
        }
        lineas.push('');
    }

    if (reporte.trabajosSinContenido?.length > 0) {
        lineas.push('Trabajos sin contenido comercial:');
        for (const trabajo of reporte.trabajosSinContenido) {
            lineas.push(`- ${trabajo.slug}`);
        }
        lineas.push('');
    }

    if (reporte.contenidoSinTrabajoDb?.length > 0) {
        lineas.push('Contenido comercial sin trabajo DB:');
        for (const slug of reporte.contenidoSinTrabajoDb) {
            lineas.push(`- ${slug}`);
        }
        lineas.push('');
    }

    if (reporte.errores?.length > 0) {
        lineas.push('Errores:');
        for (const error of reporte.errores) {
            lineas.push(`- ${error}`);
        }
        lineas.push('');
    }

    if (reporte.advertencias?.length > 0) {
        lineas.push('Advertencias:');
        for (const advertencia of reporte.advertencias) {
            lineas.push(`- ${advertencia}`);
        }
        lineas.push('');
    }

    lineas.push('Resultado:');
    lineas.push(
        reporte.escrituraDb
            ? 'Se escribieron datos porque se usó --apply.'
            : 'No se escribieron datos.'
    );
    lineas.push('Para aplicar realmente, usar --apply en una subfase autorizada.');

    return lineas.join('\n');
};
