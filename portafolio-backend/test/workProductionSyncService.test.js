import assert from 'node:assert/strict';
import test from 'node:test';

import { obtenerTrabajosProduccion } from '../services/workProductionApiClient.js';
import {
    analizarSincronizacionTrabajosProduccion,
    aplicarPlanSincronizacionTrabajos,
    parsearArgumentosSincronizacionProduccion,
    validarDestinoLocalSincronizacion
} from '../services/workProductionSyncService.js';

const destinoLocalSeguro = {
    entorno: {
        nodeEnv: 'development'
    },
    dbConfig: {
        host: '127.0.0.1',
        name: 'portafolio_local'
    }
};

const destinoProduccion = {
    entorno: {
        nodeEnv: 'production'
    },
    dbConfig: {
        host: 'db.render.com',
        name: 'portafolio_production'
    }
};

const crearTrabajo = (overrides = {}) => ({
    id: 99,
    slug: 'proyecto-base',
    nombre_trabajo: 'Proyecto Base',
    categoria_trabajo: 'Sitio web profesional',
    numero_pagina: 1,
    style_trabajo: 'Moderno',
    complejidad_trabajo: 'Media',
    enlace_trabajo: 'https://example.com',
    enlace_trabajoResumido: 'https://example.com',
    tiempo_trabajo: '3 semanas',
    resumen_trabajo: 'Resumen publico legacy',
    informacion_trabajo: 'Informacion publica legacy',
    opinion_trabajo: 'Opinion legacy publica',
    valoracion_trabajo: '5',
    nombre_archivo: 'proyecto',
    nombre_imagen: 'hero',
    formato_imagen: 'webp',
    performance_mobile: 90,
    accessibility_mobile: 95,
    practices_mobile: 96,
    seo_mobile: 100,
    performance_desktop: 98,
    accessibility_desktop: 100,
    practices_desktop: 100,
    seo_desktop: 100,
    estado_proyecto: 'Publicado',
    fecha_finalizacion: '2026-07-10',
    enlace_repositorio: 'https://github.com/example/proyecto',
    rol: 'Full Stack Developer',
    categoria_cliente: 'Negocio local',
    reto_tecnico: 'Ordenar contenido y conversion.',
    destacado: false,
    ...overrides
});

const contenidoComercialExportable = {
    displayName: 'Proyecto comercial',
    category: 'Landing Page',
    seoTitle: 'Proyecto comercial | PaginasWebChavez',
    seoDescription: 'Descripcion comercial clara y acotada.',
    commercialSummary: 'Resumen comercial',
    information: 'Informacion comercial',
    challenge: 'Desafio comercial',
    outcome: 'Resultado comercial',
    featuredPriority: 60,
    primaryCta: {
        label: 'Consultar',
        href: '/contacto'
    },
    relatedPlan: {
        label: 'Ver landing',
        href: '/servicios/planes/landing_page'
    },
    isCommercialPublic: true
};

test('detecta un trabajo nuevo por slug en dry-run y no copia el id de produccion', () => {
    const trabajoProduccion = crearTrabajo({
        id: 9,
        slug: 'proyecto-nuevo'
    });
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [trabajoProduccion],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.modo, 'dry-run');
    assert.equal(reporte.escrituraDb, false);
    assert.equal(reporte.totales.nuevos, 1);
    assert.equal(reporte.creates[0].slug, 'proyecto-nuevo');
    assert.equal('id' in reporte.creates[0].datos, false);
    assert.equal(reporte.creates[0].idProduccionDiagnostico, 9);
});

test('trabajo existente sin cambios queda como unchanged', () => {
    const trabajo = crearTrabajo({ id: 3, slug: 'plomada' });
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [trabajo],
        trabajosLocales: [trabajo],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro,
        opciones: { soloTrabajos: true }
    });

    assert.equal(reporte.totales.nuevos, 0);
    assert.equal(reporte.totales.sinCambios, 1);
    assert.equal(reporte.unchanged[0].trabajo_id_local, 3);
});

test('trabajo existente con diferencias no actualiza sin --update', () => {
    const local = crearTrabajo({
        id: 2,
        slug: 'plomada',
        performance_mobile: 92
    });
    const produccion = crearTrabajo({
        id: 8,
        slug: 'plomada',
        performance_mobile: 96
    });
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [produccion],
        trabajosLocales: [local],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro,
        opciones: { soloTrabajos: true }
    });

    assert.equal(reporte.totales.conflictos, 1);
    assert.equal(reporte.totales.actualizables, 0);
    assert.equal(reporte.conflicts[0].tipo, 'diferencias-trabajo');
    assert.equal(reporte.conflicts[0].diferencias[0].campo, 'performance_mobile');
});

test('trabajo existente con diferencias se planifica con --apply --update', () => {
    const local = crearTrabajo({
        id: 2,
        slug: 'plomada',
        performance_mobile: 92
    });
    const produccion = crearTrabajo({
        id: 8,
        slug: 'plomada',
        performance_mobile: 96
    });
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [produccion],
        trabajosLocales: [local],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro,
        opciones: {
            aplicar: true,
            actualizar: true,
            soloTrabajos: true
        }
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.modo, 'apply');
    assert.equal(reporte.totales.actualizables, 1);
    assert.equal(reporte.updates[0].trabajo_id_local, 2);
});

test('parseo de flags exige --apply para --update y soporta slug', () => {
    const opciones = parsearArgumentosSincronizacionProduccion([
        '--apply',
        '--update',
        '--slug=plomada',
        '--json',
        '--fail-on-conflict',
        '--fail-on-missing-local-db',
        '--works-only'
    ]);

    assert.equal(opciones.aplicar, true);
    assert.equal(opciones.actualizar, true);
    assert.equal(opciones.slug, 'plomada');
    assert.equal(opciones.json, true);
    assert.equal(opciones.fallarPorConflicto, true);
    assert.equal(opciones.fallarSiDbNoLocal, true);
    assert.equal(opciones.soloTrabajos, true);
    assert.throws(
        () => parsearArgumentosSincronizacionProduccion(['--update']),
        /requiere --apply/
    );
});

test('destino de produccion aborta si se intenta aplicar', () => {
    const trabajo = crearTrabajo({ slug: 'proyecto-nuevo' });
    const seguridad = validarDestinoLocalSincronizacion(destinoProduccion);
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [trabajo],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoProduccion,
        opciones: { aplicar: true }
    });

    assert.equal(seguridad.ok, false);
    assert.equal(reporte.ok, false);
    assert.equal(
        reporte.errores.some((error) => error.includes('produccion')),
        true
    );
});

test('slug duplicado en origen aborta y IDs duplicados quedan como diagnostico', () => {
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [
            crearTrabajo({ id: 8, slug: 'duplicado' }),
            crearTrabajo({ id: 8, slug: 'duplicado' })
        ],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, false);
    assert.equal(
        reporte.errores.some((error) => error.includes('Slug duplicado')),
        true
    );
    assert.equal(
        reporte.warnings.some((warning) => warning.includes('IDs duplicados')),
        true
    );
});

test('commercialContent publico sin estado de publicacion no se importa', () => {
    const trabajo = crearTrabajo({
        slug: 'proyecto-comercial',
        commercialContent: {
            ...contenidoComercialExportable,
            isCommercialPublic: undefined
        }
    });
    delete trabajo.commercialContent.isCommercialPublic;

    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [trabajo],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.totales.commercialNotImportable, 1);
    assert.match(
        reporte.commercialContent.notImportable[0].razon,
        /is_commercial_public/
    );
});

test('asocia commercialContent exportable usando id local, no id de produccion', () => {
    const trabajoProduccion = crearTrabajo({
        id: 99,
        slug: 'plomada',
        commercialContent: contenidoComercialExportable
    });
    const trabajoLocal = crearTrabajo({
        id: 2,
        slug: 'plomada'
    });
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [trabajoProduccion],
        trabajosLocales: [trabajoLocal],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.commercialContent.creates[0].datos.trabajo_id, 2);
});

test('proyecto sin commercialContent no rompe el plan', () => {
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [crearTrabajo({ slug: 'sin-comercial' })],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.totales.missingCommercialContent, 1);
});

test('CTA comercial invalido genera error cuando el contenido es exportable', () => {
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [
            crearTrabajo({
                slug: 'cta-invalido',
                commercialContent: {
                    ...contenidoComercialExportable,
                    primaryCta: {
                        label: 'CTA',
                        href: 'https://example.com'
                    }
                }
            })
        ],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, false);
    assert.equal(
        reporte.errores.some((error) => error.includes('ruta interna')),
        true
    );
});

test('respuesta parcial no escribe datos invalidos', () => {
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [
            {
                id: 1,
                slug: 'parcial'
            }
        ],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro,
        opciones: { aplicar: true }
    });

    assert.equal(reporte.ok, false);
    assert.equal(reporte.escrituraDb, true);
    assert.equal(reporte.errores.length > 0, true);
});

test('no elimina registros locales ausentes en produccion', () => {
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [crearTrabajo({ slug: 'plomada' })],
        trabajosLocales: [
            crearTrabajo({ id: 1, slug: 'plomada' }),
            crearTrabajo({ id: 2, slug: 'solo-local' })
        ],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro,
        opciones: { soloTrabajos: true }
    });

    assert.equal(reporte.ok, true);
    assert.equal('deletes' in reporte, false);
});

test('aplicar plan crea trabajos y commercialContent con el id local creado', async () => {
    const llamadas = {
        trabajosCreate: [],
        commercialCreate: []
    };
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [
            crearTrabajo({
                id: 20,
                slug: 'nuevo-comercial',
                commercialContent: contenidoComercialExportable
            })
        ],
        trabajosLocales: [],
        contenidoComercialLocal: [],
        destino: destinoLocalSeguro,
        opciones: { aplicar: true }
    });

    const resultado = await aplicarPlanSincronizacionTrabajos({
        reporte,
        transaccion: { id: 'tx-test' },
        modelos: {
            trabajos: {
                async create(datos) {
                    llamadas.trabajosCreate.push(datos);

                    return {
                        get() {
                            return {
                                ...datos,
                                id: 6
                            };
                        }
                    };
                },
                async update() {
                    throw new Error('No debe actualizar trabajos.');
                }
            },
            trabajo_commercial_content: {
                async create(datos) {
                    llamadas.commercialCreate.push(datos);
                },
                async update() {
                    throw new Error('No debe actualizar contenido.');
                }
            }
        }
    });

    assert.equal(resultado.trabajosCreados, 1);
    assert.equal(resultado.contenidosComercialesCreados, 1);
    assert.equal(llamadas.trabajosCreate[0].id, undefined);
    assert.equal(llamadas.commercialCreate[0].trabajo_id, 6);
});

test('idempotencia despues de sincronizar deja sin cambios', () => {
    const trabajo = crearTrabajo({
        id: 6,
        slug: 'sincronizado'
    });
    const filaComercial = {
        trabajo_id: 6,
        slug_snapshot: 'sincronizado',
        display_name: contenidoComercialExportable.displayName,
        commercial_category: contenidoComercialExportable.category,
        seo_title: contenidoComercialExportable.seoTitle,
        seo_description: contenidoComercialExportable.seoDescription,
        commercial_summary: contenidoComercialExportable.commercialSummary,
        information: contenidoComercialExportable.information,
        challenge: contenidoComercialExportable.challenge,
        outcome: contenidoComercialExportable.outcome,
        featured_priority: contenidoComercialExportable.featuredPriority,
        primary_cta_label: contenidoComercialExportable.primaryCta.label,
        primary_cta_href: contenidoComercialExportable.primaryCta.href,
        related_plan_label: contenidoComercialExportable.relatedPlan.label,
        related_plan_href: contenidoComercialExportable.relatedPlan.href,
        is_commercial_public: true
    };
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion: [
            {
                ...trabajo,
                commercialContent: contenidoComercialExportable
            }
        ],
        trabajosLocales: [trabajo],
        contenidoComercialLocal: [filaComercial],
        destino: destinoLocalSeguro
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.totales.nuevos, 0);
    assert.equal(reporte.totales.conflictos, 0);
    assert.equal(reporte.commercialContent.unchanged.length, 1);
});

test('error HTTP de produccion no devuelve datos para escribir', async () => {
    await assert.rejects(
        () =>
            obtenerTrabajosProduccion({
                fetcher: async () => ({
                    ok: false,
                    status: 500
                })
            }),
        /Produccion respondio 500/
    );
});
