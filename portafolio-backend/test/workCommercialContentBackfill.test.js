import assert from 'node:assert/strict';
import test from 'node:test';

import { contenidoComercialTrabajosBackfill } from '../constants/workCommercialContentBackfill.js';
import {
    analizarBackfillContenidoComercial,
    detectarMojibake,
    formatearReporteBackfill,
    mapearContenidoComercial,
    parsearArgumentosBackfill,
    validarCodificacionContenidoComercial
} from '../services/workCommercialContentBackfillService.js';

const trabajosBase = [
    {
        id: 1,
        slug: 'paginas-web-chavez',
        nombre_trabajo: 'PaginasWebChavez',
        resumen_trabajo: 'No debe usarse como commercial_summary',
        opinion_trabajo: 'No debe usarse como outcome'
    },
    {
        id: 2,
        slug: 'plomada',
        nombre_trabajo: 'Plomada'
    },
    {
        id: 3,
        slug: 'jardineria-montanez',
        nombre_trabajo: 'Montañez'
    },
    {
        id: 4,
        slug: 'elu',
        nombre_trabajo: 'ELU'
    },
    {
        id: 5,
        slug: 'esperanza-de-vida',
        nombre_trabajo: 'Esperanza De Vida'
    },
    {
        id: 6,
        slug: 'nuevo-proyecto',
        nombre_trabajo: 'Nuevo proyecto'
    }
];

test('el backfill dry-run compara por slug y no escribe datos', () => {
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        filasComercialesExistentes: [],
        opciones: {}
    });

    assert.equal(reporte.ok, true);
    assert.equal(reporte.modo, 'dry-run');
    assert.equal(reporte.escrituraDb, false);
    assert.equal(reporte.totales.trabajosDb, 6);
    assert.equal(reporte.totales.entradasComerciales, 5);
    assert.equal(reporte.totales.crear, 5);
    assert.equal(reporte.totales.trabajosSinContenido, 1);
    assert.deepEqual(
        reporte.filasCrear.map((fila) => fila.slug_snapshot),
        [
            'paginas-web-chavez',
            'plomada',
            'jardineria-montanez',
            'elu',
            'esperanza-de-vida'
        ]
    );
    assert.deepEqual(
        reporte.trabajosSinContenido.map((trabajo) => trabajo.slug),
        ['nuevo-proyecto']
    );
});

test('el mapeo de campos conserva contenido y evita campos descartados', () => {
    const contenido = contenidoComercialTrabajosBackfill.plomada;
    const fila = mapearContenidoComercial({
        slug: 'plomada',
        trabajo: trabajosBase[1],
        contenido
    });

    assert.equal(fila.trabajo_id, 2);
    assert.equal(fila.slug_snapshot, 'plomada');
    assert.equal(fila.display_name, contenido.displayName);
    assert.equal(fila.commercial_category, contenido.category);
    assert.equal(fila.seo_title, contenido.seoTitle);
    assert.equal(fila.seo_description, contenido.seoDescription);
    assert.equal(fila.commercial_summary, contenido.commercialSummary);
    assert.equal(fila.information, contenido.information);
    assert.equal(fila.challenge, contenido.challenge);
    assert.equal(fila.outcome, contenido.outcome);
    assert.equal(fila.featured_priority, contenido.featuredPriority);
    assert.equal(fila.primary_cta_label, contenido.primaryCta.label);
    assert.equal(fila.primary_cta_href, contenido.primaryCta.href);
    assert.equal(fila.related_plan_label, contenido.relatedPlan.label);
    assert.equal(fila.related_plan_href, contenido.relatedPlan.href);
    assert.equal(fila.is_commercial_public, true);
    assert.equal('opinion_trabajo' in fila, false);
    assert.equal('resumen_trabajo' in fila, false);
});

test('information y challenge pueden quedar null sin tomar contenido legacy', () => {
    const contenido = contenidoComercialTrabajosBackfill['paginas-web-chavez'];
    const fila = mapearContenidoComercial({
        slug: 'paginas-web-chavez',
        trabajo: trabajosBase[0],
        contenido
    });
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: [trabajosBase[0]],
        contenidoFuente: {
            'paginas-web-chavez': contenido
        },
        filasComercialesExistentes: [],
        opciones: {}
    });

    assert.equal(fila.information, null);
    assert.equal(fila.challenge, null);
    assert.equal(fila.commercial_summary.includes('No debe usarse'), false);
    assert.equal(fila.outcome.includes('No debe usarse'), false);
    assert.equal(reporte.ok, true);
    assert.equal(reporte.totales.crear, 1);
});

test('el backfill reporta contenido sin trabajo DB y puede fallar por flag', () => {
    const contenidoFuente = {
        ...contenidoComercialTrabajosBackfill,
        'slug-sin-db': {
            ...contenidoComercialTrabajosBackfill.plomada,
            featuredPriority: 1
        }
    };
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente,
        opciones: {}
    });
    const reporteEstricto = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente,
        opciones: { fallarSiFaltaTrabajo: true }
    });

    assert.equal(reporte.ok, true);
    assert.deepEqual(reporte.contenidoSinTrabajoDb, ['slug-sin-db']);
    assert.equal(reporteEstricto.ok, false);
    assert.match(reporteEstricto.errores[0], /sin trabajo DB/);
});

test('el backfill reporta trabajos DB sin contenido y puede fallar por flag', () => {
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        opciones: {}
    });
    const reporteEstricto = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        opciones: { fallarSiFaltaContenido: true }
    });

    assert.equal(reporte.ok, true);
    assert.deepEqual(
        reporte.trabajosSinContenido.map((trabajo) => trabajo.slug),
        ['nuevo-proyecto']
    );
    assert.equal(reporteEstricto.ok, false);
    assert.match(reporteEstricto.errores[0], /sin contenido comercial/);
});

test('no sobrescribe filas existentes por defecto y --overwrite cambia el reporte', () => {
    const filasComercialesExistentes = [
        {
            id: 10,
            trabajo_id: 2,
            slug_snapshot: 'plomada'
        }
    ];
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        filasComercialesExistentes,
        opciones: {}
    });
    const reporteSobrescritura = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        filasComercialesExistentes,
        opciones: { sobrescribir: true }
    });

    assert.equal(reporte.totales.crear, 4);
    assert.equal(reporte.totales.omitidasPorExistente, 1);
    assert.deepEqual(reporte.omitidasPorExistente, [
        {
            slug: 'plomada',
            trabajo_id: 2
        }
    ]);
    assert.equal(reporteSobrescritura.totales.actualizar, 1);
    assert.equal(reporteSobrescritura.totales.omitidasPorExistente, 0);
});

test('--slug limita el alcance a un proyecto', () => {
    const opciones = parsearArgumentosBackfill(['--slug=plomada']);
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        opciones
    });

    assert.equal(opciones.slug, 'plomada');
    assert.equal(reporte.totales.trabajosDb, 1);
    assert.equal(reporte.totales.entradasComerciales, 1);
    assert.deepEqual(
        reporte.filasCrear.map((fila) => fila.slug_snapshot),
        ['plomada']
    );
});

test('valida slugs duplicados, slugs invalidos, CTAs y featuredPriority', () => {
    const contenidoInvalido = [
        {
            slug: 'plomada',
            contenido: contenidoComercialTrabajosBackfill.plomada
        },
        {
            slug: 'plomada',
            contenido: contenidoComercialTrabajosBackfill.plomada
        },
        {
            slug: 'Slug-Invalido',
            contenido: contenidoComercialTrabajosBackfill.plomada
        },
        {
            slug: 'cta-invalido',
            contenido: {
                ...contenidoComercialTrabajosBackfill.plomada,
                primaryCta: {
                    label: 'CTA',
                    href: 'https://example.com'
                }
            }
        },
        {
            slug: 'prioridad-invalida',
            contenido: {
                ...contenidoComercialTrabajosBackfill.plomada,
                featuredPriority: 1.5
            }
        }
    ];
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoInvalido,
        opciones: {}
    });

    assert.equal(reporte.ok, false);
    assert.equal(
        reporte.errores.some((error) => error.includes('duplicado')),
        true
    );
    assert.equal(
        reporte.errores.some((error) => error.includes('inválido')),
        true
    );
    assert.equal(
        reporte.errores.some((error) => error.includes('ruta interna')),
        true
    );
    assert.equal(
        reporte.errores.some((error) => error.includes('featuredPriority')),
        true
    );
});

test('detecta mojibake comercial sin modificar valores', () => {
    const valoresCorruptos = [
        'JardinerÃƒÂ­a',
        'PÃƒÂ¡gina',
        'PaginasWebChavez Ã¢â‚¬â€ Sitio web profesional',
        'Texto con ï¿½ reemplazo'
    ];

    for (const valor of valoresCorruptos) {
        assert.equal(detectarMojibake(valor).length > 0, true);
    }

    assert.deepEqual(
        detectarMojibake(
            'Jardinería Montañez — Página web rápida, clara y profesional'
        ),
        []
    );
    assert.equal(valoresCorruptos[0], 'JardinerÃƒÂ­a');
});

test('identifica slug y campo afectados por mojibake', () => {
    const problemas = validarCodificacionContenidoComercial('plomada', {
        ...contenidoComercialTrabajosBackfill.plomada,
        seoTitle: 'Plomada Ã¢â‚¬â€ PÃƒÂ¡gina web',
        primaryCta: {
            label: 'Consultar',
            href: '/contacto'
        }
    });

    assert.deepEqual(problemas, [
        {
            slug: 'plomada',
            campo: 'seoTitle',
            patrones: [
                'secuencia U+00C3',
                'secuencia U+00C2',
                'secuencia U+00E2'
            ]
        }
    ]);
});

test('el backfill aborta si existe mojibake en contenido fuente', () => {
    const contenidoFuente = {
        plomada: {
            ...contenidoComercialTrabajosBackfill.plomada,
            seoDescription: 'PÃƒÂ¡gina web para servicios'
        }
    };
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente,
        opciones: {}
    });

    assert.equal(reporte.ok, false);
    assert.equal(
        reporte.errores.some((error) => error.includes('contiene mojibake')),
        true
    );
    assert.equal(reporte.escrituraDb, false);
});

test('las entradas limpias del backfill pasan validacion de codificacion', () => {
    for (const [slug, contenido] of Object.entries(
        contenidoComercialTrabajosBackfill
    )) {
        assert.deepEqual(validarCodificacionContenidoComercial(slug, contenido), []);
    }
});

test('genera salida legible para dry-run', () => {
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb: trabajosBase,
        contenidoFuente: contenidoComercialTrabajosBackfill,
        opciones: {}
    });
    const salida = formatearReporteBackfill(reporte);

    assert.equal(salida.includes('BACKFILL WORK COMMERCIAL CONTENT'), true);
    assert.equal(salida.includes('Escritura en DB: NO'), true);
    assert.equal(salida.includes('Se crearían: 5'), true);
    assert.equal(salida.includes('nuevo-proyecto'), true);
    assert.equal(salida.includes('No se escribieron datos.'), true);
});
