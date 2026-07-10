import assert from 'node:assert/strict';
import test from 'node:test';

import {
    resolverContenidoComercialTrabajo,
    serializarTrabajo
} from '../services/workCommercialContentSerializer.js';

const crearTrabajo = (overrides = {}) => ({
    id: 1,
    slug: 'paginas-web-chavez',
    nombre_trabajo: 'PaginasWebChavez',
    categoria_trabajo: 'Portfolio legacy',
    resumen_trabajo: 'No debe usarse como commercialSummary',
    informacion_trabajo: 'InformaciÃ³n legacy permitida',
    reto_tecnico: 'Reto tÃ©cnico legacy permitido',
    opinion_trabajo: 'No debe usarse como outcome',
    valoracion_trabajo: 'No debe usarse como testimonio',
    destacado: true,
    commercialContent: null,
    ...overrides
});

const contenidoComercialPublicado = {
    id: 50,
    trabajo_id: 1,
    slug_snapshot: 'slug-viejo',
    display_name: 'Nombre comercial',
    commercial_category: 'CategorÃ­a comercial',
    seo_title: 'SEO title comercial',
    seo_description: 'SEO description comercial',
    commercial_summary: 'Resumen comercial',
    information: 'InformaciÃ³n comercial',
    challenge: 'DesafÃ­o comercial',
    outcome: 'Resultado comercial',
    featured_priority: 25,
    primary_cta_label: 'CTA comercial',
    primary_cta_href: '/contacto',
    related_plan_label: 'Plan relacionado',
    related_plan_href: '/servicios/planes/landing_page',
    is_commercial_public: true,
    created_at: '2026-07-10',
    updated_at: '2026-07-10'
};

test('usa contenido comercial publicado y oculta campos internos', () => {
    const serializado = serializarTrabajo(
        crearTrabajo({
            commercialContent: contenidoComercialPublicado
        })
    );

    assert.equal(serializado.slug, 'paginas-web-chavez');
    assert.equal(serializado.commercialContent.displayName, 'Nombre comercial');
    assert.equal(serializado.commercialContent.category, 'CategorÃ­a comercial');
    assert.equal(serializado.commercialContent.seoTitle, 'SEO title comercial');
    assert.equal(
        serializado.commercialContent.seoDescription,
        'SEO description comercial'
    );
    assert.equal(
        serializado.commercialContent.commercialSummary,
        'Resumen comercial'
    );
    assert.equal(serializado.commercialContent.information, 'InformaciÃ³n comercial');
    assert.equal(serializado.commercialContent.challenge, 'DesafÃ­o comercial');
    assert.equal(serializado.commercialContent.outcome, 'Resultado comercial');
    assert.equal(serializado.commercialContent.featuredPriority, 25);
    assert.deepEqual(serializado.commercialContent.primaryCta, {
        label: 'CTA comercial',
        href: '/contacto'
    });
    assert.deepEqual(serializado.commercialContent.relatedPlan, {
        label: 'Plan relacionado',
        href: '/servicios/planes/landing_page'
    });

    for (const campoInterno of [
        'id',
        'trabajo_id',
        'slug_snapshot',
        'is_commercial_public',
        'created_at',
        'updated_at'
    ]) {
        assert.equal(campoInterno in serializado.commercialContent, false);
    }
});

test('un trabajo sin fila comercial usa legacy permitido y fallback sobrio', () => {
    const commercialContent = resolverContenidoComercialTrabajo(crearTrabajo());

    assert.equal(commercialContent.displayName, 'PaginasWebChavez');
    assert.equal(commercialContent.category, 'Portfolio legacy');
    assert.equal(
        commercialContent.information,
        'InformaciÃ³n legacy permitida'
    );
    assert.equal(commercialContent.challenge, 'Reto tÃ©cnico legacy permitido');
    assert.equal(
        commercialContent.commercialSummary.includes('No debe usarse'),
        false
    );
    assert.equal(commercialContent.outcome.includes('No debe usarse'), false);
    assert.equal(commercialContent.featuredPriority, 0);
    assert.deepEqual(commercialContent.primaryCta, {
        label: 'Quiero una web similar',
        href: '/contacto'
    });
    assert.deepEqual(commercialContent.relatedPlan, {
        label: 'Ver servicios web',
        href: '/servicios'
    });
});

test('contenido comercial no publicado no filtra contenido editorial', () => {
    const commercialContent = resolverContenidoComercialTrabajo(
        crearTrabajo({
            commercialContent: {
                ...contenidoComercialPublicado,
                display_name: 'No publicado',
                is_commercial_public: false
            }
        })
    );

    assert.equal(commercialContent.displayName, 'PaginasWebChavez');
    assert.equal(commercialContent.category, 'Portfolio legacy');
    assert.equal(commercialContent.seoTitle, 'PaginasWebChavez — Proyecto web');
    assert.equal(commercialContent.outcome.includes('No publicado'), false);
});

test('campos comerciales vacios y CTAs invalidos pasan a fallback seguro', () => {
    const commercialContent = resolverContenidoComercialTrabajo(
        crearTrabajo({
            commercialContent: {
                ...contenidoComercialPublicado,
                display_name: '   ',
                commercial_category: '',
                commercial_summary: '  ',
                information: null,
                challenge: undefined,
                featured_priority: 1.5,
                primary_cta_label: '',
                primary_cta_href: 'https://example.com',
                related_plan_label: '   ',
                related_plan_href: '//example.com'
            }
        })
    );

    assert.equal(commercialContent.displayName, 'PaginasWebChavez');
    assert.equal(commercialContent.category, 'Portfolio legacy');
    assert.equal(
        commercialContent.commercialSummary.includes('PaginasWebChavez'),
        true
    );
    assert.equal(
        commercialContent.information,
        'InformaciÃ³n legacy permitida'
    );
    assert.equal(commercialContent.challenge, 'Reto tÃ©cnico legacy permitido');
    assert.equal(commercialContent.featuredPriority, 0);
    assert.deepEqual(commercialContent.primaryCta, {
        label: 'Quiero una web similar',
        href: '/contacto'
    });
    assert.deepEqual(commercialContent.relatedPlan, {
        label: 'Ver servicios web',
        href: '/servicios'
    });
});

test('information y challenge nulos en DB se resuelven campo por campo', () => {
    const trabajoBase = crearTrabajo({
        commercialContent: {
            ...contenidoComercialPublicado,
            information: null,
            challenge: null,
            outcome: 'Resultado comercial vigente',
            is_commercial_public: true
        }
    });
    const commercialContent = resolverContenidoComercialTrabajo(
        trabajoBase
    );

    assert.equal(
        commercialContent.information,
        trabajoBase.informacion_trabajo
    );
    assert.equal(commercialContent.challenge, trabajoBase.reto_tecnico);
    assert.equal(commercialContent.outcome, 'Resultado comercial vigente');
    assert.equal(typeof commercialContent.information, 'string');
    assert.equal(typeof commercialContent.challenge, 'string');
});

test('slug canonico viene de trabajos y no de slug_snapshot', () => {
    const serializado = serializarTrabajo(
        crearTrabajo({
            slug: 'slug-canonico',
            commercialContent: {
                ...contenidoComercialPublicado,
                slug_snapshot: 'slug-snapshot-viejo'
            }
        })
    );

    assert.equal(serializado.slug, 'slug-canonico');
    assert.equal('slug_snapshot' in serializado.commercialContent, false);
});
