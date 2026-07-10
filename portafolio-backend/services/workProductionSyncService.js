import { PATRON_ENLACE_INTERNO_COMERCIAL } from '../constants/workCommercialContent.js';
import {
    WORK_SLUG_MAX_LENGTH,
    WORK_SLUG_PATTERN
} from '../constants/workSlugs.js';

const HOSTS_LOCALES_PERMITIDOS = new Set(['localhost', '127.0.0.1', '::1']);
const CAMPOS_INTERNOS_COMERCIALES = new Set([
    'id',
    'trabajo_id',
    'slug_snapshot',
    'created_at',
    'updated_at'
]);

export const CAMPOS_TRABAJO_SINCRONIZABLES = Object.freeze([
    'slug',
    'nombre_trabajo',
    'categoria_trabajo',
    'numero_pagina',
    'style_trabajo',
    'complejidad_trabajo',
    'enlace_trabajo',
    'enlace_trabajoResumido',
    'tiempo_trabajo',
    'resumen_trabajo',
    'informacion_trabajo',
    'opinion_trabajo',
    'valoracion_trabajo',
    'nombre_archivo',
    'nombre_imagen',
    'formato_imagen',
    'performance_mobile',
    'accessibility_mobile',
    'practices_mobile',
    'seo_mobile',
    'performance_desktop',
    'accessibility_desktop',
    'practices_desktop',
    'seo_desktop',
    'estado_proyecto',
    'fecha_finalizacion',
    'enlace_repositorio',
    'rol',
    'categoria_cliente',
    'reto_tecnico',
    'destacado'
]);

const CAMPOS_ENTEROS_TRABAJO = new Set([
    'numero_pagina',
    'performance_mobile',
    'accessibility_mobile',
    'practices_mobile',
    'seo_mobile',
    'performance_desktop',
    'accessibility_desktop',
    'practices_desktop',
    'seo_desktop'
]);

const CAMPOS_URL_PUBLICA = new Set([
    'enlace_trabajo',
    'enlace_trabajoResumido',
    'enlace_repositorio'
]);

export const CAMPOS_CONTENIDO_COMERCIAL_SINCRONIZABLES = Object.freeze([
    'display_name',
    'commercial_category',
    'seo_title',
    'seo_description',
    'commercial_summary',
    'information',
    'challenge',
    'outcome',
    'featured_priority',
    'primary_cta_label',
    'primary_cta_href',
    'related_plan_label',
    'related_plan_href',
    'is_commercial_public'
]);

export const esSlugValidoSincronizacion = (slug) =>
    typeof slug === 'string' &&
    slug.length >= 1 &&
    slug.length <= WORK_SLUG_MAX_LENGTH &&
    WORK_SLUG_PATTERN.test(slug);

const normalizarValor = (valor) => {
    if (valor === undefined) return null;
    if (valor instanceof Date) return valor.toISOString();

    return valor;
};

const normalizarBooleanoSincronizacion = (valor) => {
    if (valor === true || valor === 1 || valor === '1') return true;
    if (
        valor === false ||
        valor === 0 ||
        valor === '0' ||
        valor === '' ||
        valor === null ||
        valor === undefined
    ) {
        return false;
    }

    return null;
};

const sonValoresIguales = (local, produccion, campo) => {
    if (campo === 'destacado') {
        return (
            normalizarBooleanoSincronizacion(local) ===
            normalizarBooleanoSincronizacion(produccion)
        );
    }

    return normalizarValor(local) === normalizarValor(produccion);
};

const esUrlHttpValida = (valor) => {
    if (typeof valor !== 'string' || valor.trim() === '') return true;

    try {
        const url = new URL(valor.trim());

        return ['http:', 'https:'].includes(url.protocol);
    } catch {
        return false;
    }
};

const obtenerBooleanoComercial = (contenidoComercial) => {
    if (typeof contenidoComercial?.is_commercial_public === 'boolean') {
        return contenidoComercial.is_commercial_public;
    }

    if (typeof contenidoComercial?.isCommercialPublic === 'boolean') {
        return contenidoComercial.isCommercialPublic;
    }

    return null;
};

export const parsearArgumentosSincronizacionProduccion = (argumentos = []) => {
    const opciones = {
        aplicar: false,
        actualizar: false,
        slug: null,
        json: false,
        fallarPorConflicto: false,
        fallarSiDbNoLocal: false,
        soloTrabajos: false,
        soloComercial: false
    };

    for (let indice = 0; indice < argumentos.length; indice += 1) {
        const argumento = argumentos[indice];

        if (argumento === '--apply') {
            opciones.aplicar = true;
            continue;
        }
        if (argumento === '--update') {
            opciones.actualizar = true;
            continue;
        }
        if (argumento === '--json') {
            opciones.json = true;
            continue;
        }
        if (argumento === '--fail-on-conflict') {
            opciones.fallarPorConflicto = true;
            continue;
        }
        if (argumento === '--fail-on-missing-local-db') {
            opciones.fallarSiDbNoLocal = true;
            continue;
        }
        if (argumento === '--works-only') {
            opciones.soloTrabajos = true;
            continue;
        }
        if (argumento === '--commercial-only') {
            opciones.soloComercial = true;
            continue;
        }
        if (argumento === '--slug') {
            opciones.slug = argumentos[indice + 1];
            indice += 1;
            continue;
        }
        if (argumento.startsWith('--slug=')) {
            opciones.slug = argumento.slice('--slug='.length);
            continue;
        }

        throw new Error(`Argumento no reconocido: ${argumento}`);
    }

    if (opciones.soloTrabajos && opciones.soloComercial) {
        throw new Error('--works-only y --commercial-only no pueden combinarse.');
    }

    if (opciones.actualizar && !opciones.aplicar) {
        throw new Error('--update requiere --apply.');
    }

    if (opciones.slug && !esSlugValidoSincronizacion(opciones.slug)) {
        throw new Error(`El slug filtrado no es valido: ${opciones.slug}`);
    }

    return opciones;
};

export const validarDestinoLocalSincronizacion = ({ entorno, dbConfig }) => {
    const nodeEnv = entorno?.nodeEnv ?? entorno?.NODE_ENV ?? 'development';
    const host = String(dbConfig?.host ?? '').trim().toLowerCase();
    const database = String(dbConfig?.name ?? dbConfig?.database ?? '').trim();
    const errores = [];

    if (nodeEnv === 'production') {
        errores.push('NODE_ENV indica produccion.');
    }

    if (!HOSTS_LOCALES_PERMITIDOS.has(host)) {
        errores.push(`DB_HOST no es local/controlado: ${host || '(vacio)'}.`);
    }

    if (!database) {
        errores.push('DB_NAME esta vacio.');
    }

    if (/prod|production|render/i.test(database)) {
        errores.push(`DB_NAME parece productivo: ${database}.`);
    }

    return {
        ok: errores.length === 0,
        errores,
        destino: {
            nodeEnv,
            host,
            database
        }
    };
};

const crearDatosTrabajo = (trabajoProduccion) => {
    const datos = {};

    for (const campo of CAMPOS_TRABAJO_SINCRONIZABLES) {
        datos[campo] =
            campo === 'destacado'
                ? normalizarBooleanoSincronizacion(trabajoProduccion[campo])
                : trabajoProduccion[campo];
    }

    return datos;
};

const validarTrabajoProduccion = (trabajo, errores, advertencias) => {
    if (!trabajo || typeof trabajo !== 'object') {
        errores.push('Produccion devolvio un trabajo no valido.');
        return;
    }

    if (!esSlugValidoSincronizacion(trabajo.slug)) {
        errores.push(`Slug invalido en produccion: ${trabajo.slug}`);
    }

    for (const campo of CAMPOS_TRABAJO_SINCRONIZABLES) {
        if (!(campo in trabajo)) {
            errores.push(`${trabajo.slug ?? '(sin slug)'}: falta ${campo}`);
            continue;
        }

        if (CAMPOS_ENTEROS_TRABAJO.has(campo) && !Number.isInteger(trabajo[campo])) {
            errores.push(`${trabajo.slug}: ${campo} debe ser entero`);
        }

        if (
            campo === 'destacado' &&
            normalizarBooleanoSincronizacion(trabajo[campo]) === null
        ) {
            errores.push(`${trabajo.slug}: destacado debe ser booleano`);
        }

        if (
            CAMPOS_URL_PUBLICA.has(campo) &&
            typeof trabajo[campo] === 'string' &&
            trabajo[campo].trim() &&
            !esUrlHttpValida(trabajo[campo])
        ) {
            advertencias.push(
                `${trabajo.slug}: ${campo} no parece URL HTTP(S); se reporta sin bloquear.`
            );
        }
    }

    if (trabajo.commercialContent && typeof trabajo.commercialContent === 'object') {
        for (const campo of Object.keys(trabajo.commercialContent)) {
            if (CAMPOS_INTERNOS_COMERCIALES.has(campo)) {
                errores.push(
                    `${trabajo.slug}: commercialContent publico expone campo interno ${campo}`
                );
            }
        }
    }
};

const validarContenidoComercialImportable = ({ slug, contenido }) => {
    const errores = [];
    const estadoPublico = obtenerBooleanoComercial(contenido);

    if (!contenido || typeof contenido !== 'object') {
        return {
            importable: false,
            razon: 'sin commercialContent'
        };
    }

    if (estadoPublico === null) {
        return {
            importable: false,
            razon:
                'commercialContent publico no informa is_commercial_public/isCommercialPublic'
        };
    }

    if (!Number.isInteger(contenido.featuredPriority)) {
        errores.push(`${slug}: featuredPriority debe ser entero`);
    }

    for (const [campo, href] of [
        ['primaryCta.href', contenido.primaryCta?.href],
        ['relatedPlan.href', contenido.relatedPlan?.href]
    ]) {
        if (!PATRON_ENLACE_INTERNO_COMERCIAL.test(href ?? '')) {
            errores.push(`${slug}: ${campo} debe ser ruta interna`);
        }
    }

    return {
        importable: errores.length === 0,
        errores,
        razon: errores.join('; '),
        estadoPublico
    };
};

const mapearContenidoComercialProduccion = ({
    slug,
    contenido,
    trabajoIdLocal
}) => ({
    trabajo_id: trabajoIdLocal,
    slug_snapshot: slug,
    display_name: contenido.displayName ?? contenido.display_name ?? null,
    commercial_category:
        contenido.category ?? contenido.commercial_category ?? null,
    seo_title: contenido.seoTitle ?? contenido.seo_title ?? null,
    seo_description:
        contenido.seoDescription ?? contenido.seo_description ?? null,
    commercial_summary:
        contenido.commercialSummary ?? contenido.commercial_summary ?? null,
    information: contenido.information ?? null,
    challenge: contenido.challenge ?? null,
    outcome: contenido.outcome ?? null,
    featured_priority:
        contenido.featuredPriority ?? contenido.featured_priority ?? 0,
    primary_cta_label:
        contenido.primaryCta?.label ?? contenido.primary_cta_label ?? null,
    primary_cta_href:
        contenido.primaryCta?.href ?? contenido.primary_cta_href ?? null,
    related_plan_label:
        contenido.relatedPlan?.label ?? contenido.related_plan_label ?? null,
    related_plan_href:
        contenido.relatedPlan?.href ?? contenido.related_plan_href ?? null,
    is_commercial_public: obtenerBooleanoComercial(contenido)
});

const compararCampos = ({ local, produccion, campos }) => {
    const diferencias = [];

    for (const campo of campos) {
        if (!sonValoresIguales(local?.[campo], produccion?.[campo], campo)) {
            diferencias.push({
                campo,
                local: normalizarValor(local?.[campo]),
                produccion: normalizarValor(produccion?.[campo])
            });
        }
    }

    return diferencias;
};

export const analizarSincronizacionTrabajosProduccion = ({
    trabajosProduccion = [],
    trabajosLocales = [],
    contenidoComercialLocal = [],
    opciones = {},
    destino = null,
    advertencias = []
}) => {
    const opcionesNormalizadas = {
        aplicar: false,
        actualizar: false,
        fallarPorConflicto: false,
        fallarSiDbNoLocal: false,
        soloTrabajos: false,
        soloComercial: false,
        ...opciones
    };
    const errores = [];
    const advertenciasFinales = [...advertencias];
    const seguridadDestino = destino
        ? validarDestinoLocalSincronizacion(destino)
        : {
            ok: true,
            errores: [],
            destino: null
        };

    if (!Array.isArray(trabajosProduccion)) {
        errores.push('La fuente de produccion no devolvio una lista de trabajos.');
    }

    if (!Array.isArray(trabajosLocales)) {
        errores.push('La fuente local no devolvio una lista de trabajos.');
    }

    if (!seguridadDestino.ok) {
        advertenciasFinales.push(
            `Destino local no confirmado: ${seguridadDestino.errores.join(' ')}`
        );

        if (opcionesNormalizadas.aplicar || opcionesNormalizadas.fallarSiDbNoLocal) {
            errores.push(...seguridadDestino.errores);
        }
    }

    const origenFiltrado = opcionesNormalizadas.slug
        ? trabajosProduccion.filter(
            (trabajo) => trabajo.slug === opcionesNormalizadas.slug
        )
        : trabajosProduccion;
    const localesFiltrados = opcionesNormalizadas.slug
        ? trabajosLocales.filter(
            (trabajo) => trabajo.slug === opcionesNormalizadas.slug
        )
        : trabajosLocales;
    const slugsProduccion = new Set();
    const idsProduccion = new Set();
    const idsProduccionDuplicados = [];

    for (const trabajo of origenFiltrado) {
        validarTrabajoProduccion(trabajo, errores, advertenciasFinales);

        if (slugsProduccion.has(trabajo.slug)) {
            errores.push(`Slug duplicado en produccion: ${trabajo.slug}`);
        }
        slugsProduccion.add(trabajo.slug);

        if (trabajo.id !== undefined && trabajo.id !== null) {
            if (idsProduccion.has(trabajo.id)) {
                idsProduccionDuplicados.push(trabajo.id);
            }
            idsProduccion.add(trabajo.id);
        }
    }

    if (idsProduccionDuplicados.length > 0) {
        advertenciasFinales.push(
            `IDs duplicados en produccion detectados solo como diagnostico: ${[
                ...new Set(idsProduccionDuplicados)
            ].join(', ')}`
        );
    }

    const trabajosLocalesPorSlug = new Map(
        localesFiltrados.map((trabajo) => [trabajo.slug, trabajo])
    );
    const contenidoLocalPorTrabajoId = new Map(
        contenidoComercialLocal.map((fila) => [Number(fila.trabajo_id), fila])
    );
    const creates = [];
    const updates = [];
    const unchanged = [];
    const conflicts = [];
    const missingCommercialContent = [];
    const contenidoComercial = {
        creates: [],
        updates: [],
        unchanged: [],
        notImportable: []
    };

    for (const trabajoProduccion of origenFiltrado) {
        const slug = trabajoProduccion.slug;
        const trabajoLocal = trabajosLocalesPorSlug.get(slug);
        const datosTrabajo = crearDatosTrabajo(trabajoProduccion);

        if (!trabajoLocal) {
            if (opcionesNormalizadas.soloComercial) {
                conflicts.push({
                    slug,
                    tipo: 'trabajo-local-inexistente',
                    razon:
                        'No se puede sincronizar contenido comercial sin trabajo local.'
                });
            } else {
                creates.push({
                    slug,
                    tipo: 'crear-trabajo',
                    razon: 'No existe trabajo local con ese slug.',
                    campos: CAMPOS_TRABAJO_SINCRONIZABLES,
                    datos: datosTrabajo,
                    idProduccionDiagnostico: trabajoProduccion.id ?? null
                });
            }
        } else {
            const diferencias = compararCampos({
                local: trabajoLocal,
                produccion: datosTrabajo,
                campos: CAMPOS_TRABAJO_SINCRONIZABLES
            });

            if (diferencias.length === 0) {
                unchanged.push({
                    slug,
                    tipo: 'sin-cambios',
                    trabajo_id_local: trabajoLocal.id
                });
            } else if (opcionesNormalizadas.actualizar) {
                updates.push({
                    slug,
                    tipo: 'actualizar-trabajo',
                    razon: 'Existen diferencias y se solicito --update.',
                    trabajo_id_local: trabajoLocal.id,
                    diferencias,
                    datos: datosTrabajo
                });
            } else {
                conflicts.push({
                    slug,
                    tipo: 'diferencias-trabajo',
                    razon: 'Omitido; requiere --apply --update para actualizar.',
                    trabajo_id_local: trabajoLocal.id,
                    diferencias
                });
            }
        }

        if (opcionesNormalizadas.soloTrabajos) continue;

        const validacionComercial = validarContenidoComercialImportable({
            slug,
            contenido: trabajoProduccion.commercialContent
        });

        if (!validacionComercial.importable) {
            const destinoLista =
                validacionComercial.razon === 'sin commercialContent'
                    ? missingCommercialContent
                    : contenidoComercial.notImportable;
            destinoLista.push({
                slug,
                razon: validacionComercial.razon
            });

            if (validacionComercial.errores?.length > 0) {
                errores.push(...validacionComercial.errores);
            }
            continue;
        }

        const trabajoIdLocal = trabajoLocal?.id ?? null;
        const filaComercial = mapearContenidoComercialProduccion({
            slug,
            contenido: trabajoProduccion.commercialContent,
            trabajoIdLocal
        });
        const filaComercialLocal = trabajoIdLocal
            ? contenidoLocalPorTrabajoId.get(Number(trabajoIdLocal))
            : null;

        if (!filaComercialLocal) {
            contenidoComercial.creates.push({
                slug,
                tipo: 'crear-contenido-comercial',
                razon: trabajoIdLocal
                    ? 'No existe fila comercial local.'
                    : 'Se asociara al id local luego de crear el trabajo.',
                trabajo_id_local: trabajoIdLocal,
                asociarPorSlug: trabajoIdLocal ? null : slug,
                datos: filaComercial
            });
            continue;
        }

        const diferenciasComerciales = compararCampos({
            local: filaComercialLocal,
            produccion: filaComercial,
            campos: CAMPOS_CONTENIDO_COMERCIAL_SINCRONIZABLES
        });

        if (diferenciasComerciales.length === 0) {
            contenidoComercial.unchanged.push({
                slug,
                tipo: 'contenido-comercial-sin-cambios',
                trabajo_id_local: trabajoIdLocal
            });
        } else if (opcionesNormalizadas.actualizar) {
            contenidoComercial.updates.push({
                slug,
                tipo: 'actualizar-contenido-comercial',
                trabajo_id_local: trabajoIdLocal,
                diferencias: diferenciasComerciales,
                datos: filaComercial
            });
        } else {
            conflicts.push({
                slug,
                tipo: 'diferencias-contenido-comercial',
                razon:
                    'Contenido comercial local con diferencias; requiere --apply --update.',
                trabajo_id_local: trabajoIdLocal,
                diferencias: diferenciasComerciales
            });
        }
    }

    if (opcionesNormalizadas.fallarPorConflicto && conflicts.length > 0) {
        errores.push(`Hay conflictos: ${conflicts.map((item) => item.slug).join(', ')}`);
    }

    const ok = errores.length === 0;

    return {
        ok,
        origen: 'produccion',
        destino: 'local',
        modo: opcionesNormalizadas.aplicar ? 'apply' : 'dry-run',
        escrituraDb: opcionesNormalizadas.aplicar === true,
        seguridadDestino,
        errores,
        warnings: advertenciasFinales,
        totales: {
            trabajosProduccion: origenFiltrado.length,
            trabajosLocal: localesFiltrados.length,
            nuevos: creates.length,
            actualizables: updates.length + contenidoComercial.updates.length,
            sinCambios: unchanged.length + contenidoComercial.unchanged.length,
            conflictos: conflicts.length,
            errores: errores.length,
            commercialCreates: contenidoComercial.creates.length,
            commercialNotImportable: contenidoComercial.notImportable.length,
            missingCommercialContent: missingCommercialContent.length
        },
        creates,
        updates,
        unchanged,
        conflicts,
        missingCommercialContent,
        commercialContent: contenidoComercial
    };
};

export const aplicarPlanSincronizacionTrabajos = async ({
    reporte,
    modelos,
    transaccion
}) => {
    if (!reporte?.ok) {
        throw new Error('No se puede aplicar una sincronizacion con errores.');
    }

    if (!reporte.escrituraDb) {
        return {
            trabajosCreados: 0,
            trabajosActualizados: 0,
            contenidosComercialesCreados: 0,
            contenidosComercialesActualizados: 0
        };
    }

    const { trabajos, trabajo_commercial_content: contenidoComercial } = modelos;
    const trabajosCreadosPorSlug = new Map();
    let trabajosCreados = 0;
    let trabajosActualizados = 0;
    let contenidosComercialesCreados = 0;
    let contenidosComercialesActualizados = 0;

    for (const accion of reporte.creates) {
        const trabajoCreado = await trabajos.create(accion.datos, {
            transaction: transaccion
        });
        trabajosCreadosPorSlug.set(
            accion.slug,
            typeof trabajoCreado.get === 'function'
                ? trabajoCreado.get({ plain: true })
                : trabajoCreado
        );
        trabajosCreados += 1;
    }

    for (const accion of reporte.updates) {
        await trabajos.update(accion.datos, {
            where: { id: accion.trabajo_id_local },
            transaction: transaccion
        });
        trabajosActualizados += 1;
    }

    for (const accion of reporte.commercialContent.creates) {
        const datos = { ...accion.datos };

        if (!datos.trabajo_id && accion.asociarPorSlug) {
            datos.trabajo_id = trabajosCreadosPorSlug.get(
                accion.asociarPorSlug
            )?.id;
        }

        if (!datos.trabajo_id) {
            throw new Error(
                `No se pudo resolver trabajo_id local para ${accion.slug}.`
            );
        }

        await contenidoComercial.create(datos, {
            transaction: transaccion
        });
        contenidosComercialesCreados += 1;
    }

    for (const accion of reporte.commercialContent.updates) {
        await contenidoComercial.update(accion.datos, {
            where: { trabajo_id: accion.trabajo_id_local },
            transaction: transaccion
        });
        contenidosComercialesActualizados += 1;
    }

    return {
        trabajosCreados,
        trabajosActualizados,
        contenidosComercialesCreados,
        contenidosComercialesActualizados
    };
};

export const formatearReporteSincronizacionTrabajos = (reporte) => {
    const lineas = [
        `SYNC WORKS FROM PRODUCTION — ${reporte.modo === 'apply' ? 'APPLY' : 'DRY RUN'}`,
        '',
        `Origen: ${reporte.origen}`,
        `Destino: ${reporte.destino}`,
        `Escritura: ${reporte.escrituraDb ? 'SI' : 'NO'}`,
        '',
        `Trabajos produccion: ${reporte.totales?.trabajosProduccion ?? 0}`,
        `Trabajos local: ${reporte.totales?.trabajosLocal ?? 0}`,
        `Nuevos: ${reporte.totales?.nuevos ?? 0}`,
        `Actualizables: ${reporte.totales?.actualizables ?? 0}`,
        `Sin cambios: ${reporte.totales?.sinCambios ?? 0}`,
        `Conflictos: ${reporte.totales?.conflictos ?? 0}`,
        `Errores: ${reporte.totales?.errores ?? 0}`,
        ''
    ];

    if (reporte.creates?.length > 0) {
        lineas.push('Trabajos nuevos detectados:');
        for (const accion of reporte.creates) {
            lineas.push(`- ${accion.slug}`);
        }
        lineas.push('');
    }

    if (reporte.conflicts?.length > 0) {
        lineas.push('Conflictos/diferencias:');
        for (const conflicto of reporte.conflicts) {
            lineas.push(`- ${conflicto.slug}: ${conflicto.razon}`);
            for (const diferencia of conflicto.diferencias ?? []) {
                lineas.push(
                    `  - ${diferencia.campo}: local ${JSON.stringify(
                        diferencia.local
                    )} -> produccion ${JSON.stringify(diferencia.produccion)}`
                );
            }
        }
        lineas.push('');
    }

    if (reporte.commercialContent?.notImportable?.length > 0) {
        lineas.push('Contenido comercial no importable desde API publica:');
        for (const item of reporte.commercialContent.notImportable) {
            lineas.push(`- ${item.slug}: ${item.razon}`);
        }
        lineas.push('');
    }

    if (reporte.missingCommercialContent?.length > 0) {
        lineas.push('Trabajos sin commercialContent en origen:');
        for (const item of reporte.missingCommercialContent) {
            lineas.push(`- ${item.slug}: ${item.razon}`);
        }
        lineas.push('');
    }

    if (reporte.warnings?.length > 0) {
        lineas.push('Advertencias:');
        for (const advertencia of reporte.warnings) {
            lineas.push(`- ${advertencia}`);
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

    lineas.push('Resultado:');
    lineas.push(
        reporte.escrituraDb
            ? 'Se escribieron datos porque se uso --apply.'
            : 'No se escribieron datos.'
    );
    lineas.push('Para aplicar realmente, usar --apply en una subfase autorizada.');

    return lineas.join('\n');
};
