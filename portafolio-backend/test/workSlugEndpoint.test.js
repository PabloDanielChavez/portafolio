import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import express from 'express';

import {
    createGetWorksController,
    createGetWorkBySlugController
} from '../controllers/apiController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { errorHandler } from '../middleware/errorHandlers.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { workSlugParamsSchema } from '../validation/schemas.js';

const works = [
    {
        id: 1,
        nombre_trabajo: 'PaginasWebChavez',
        slug: 'paginas-web-chavez',
        categoria_trabajo: 'Portfolio',
        informacion_trabajo: 'InformaciÃ³n legacy',
        reto_tecnico: 'Reto legacy',
        opinion_trabajo: 'No debe exponerse como resultado',
        valoracion_trabajo: 'No debe exponerse como valoraciÃ³n comercial',
        commercialContent: {
            id: 99,
            trabajo_id: 1,
            slug_snapshot: 'snapshot-distinto',
            display_name: 'PaginasWebChavez comercial',
            commercial_category: 'Sitio web profesional',
            seo_title: 'Title comercial',
            seo_description: 'Description comercial',
            commercial_summary: 'Resumen comercial',
            information: 'InformaciÃ³n comercial',
            challenge: 'DesafÃ­o comercial',
            outcome: 'Resultado comercial',
            featured_priority: 30,
            primary_cta_label: 'CTA comercial',
            primary_cta_href: '/contacto',
            related_plan_label: 'Plan comercial',
            related_plan_href: '/servicios',
            is_commercial_public: true,
            created_at: '2026-07-10',
            updated_at: '2026-07-10'
        }
    },
    {
        id: 2,
        nombre_trabajo: 'Plomada',
        slug: 'plomada',
        categoria_trabajo: 'Landing',
        informacion_trabajo: 'InformaciÃ³n legacy Plomada',
        reto_tecnico: 'Reto legacy Plomada',
        commercialContent: null
    },
    {
        id: 3,
        nombre_trabajo: 'Montañez',
        slug: 'jardineria-montanez',
        categoria_trabajo: 'Landing'
    },
    {
        id: 4,
        nombre_trabajo: 'ELU',
        slug: 'elu',
        categoria_trabajo: 'Landing'
    },
    {
        id: 5,
        nombre_trabajo: 'Esperanza De Vida',
        slug: 'esperanza-de-vida',
        categoria_trabajo: 'Plataforma'
    }
];

let findOneCalls = 0;
const workModel = {
    findAll: async () => works,
    findOne: async ({ where }) => {
        findOneCalls += 1;

        if (where.slug === 'database-error') {
            throw new Error('Fallo simulado de base de datos.');
        }

        return works.find((work) => work.slug === where.slug) ?? null;
    }
};

const app = express();

app.get(
    '/api/trabajos',
    asyncHandler(createGetWorksController(workModel))
);
app.get(
    '/api/trabajos/:slug',
    validateRequest(workSlugParamsSchema, 'params'),
    asyncHandler(createGetWorkBySlugController(workModel))
);
app.use(errorHandler);

let server;
let baseUrl;

before(async () => {
    await new Promise((resolve) => {
        server = app.listen(0, '127.0.0.1', () => {
            const address = server.address();
            baseUrl = `http://127.0.0.1:${address.port}`;
            resolve();
        });
    });
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
});

test('GET /api/trabajos conserva el listado legacy y agrega commercialContent', async () => {
    const response = await fetch(`${baseUrl}/api/trabajos`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.length, works.length);
    assert.equal(body[0].id, works[0].id);
    assert.equal(body[0].slug, works[0].slug);
    assert.equal(body[0].nombre_trabajo, works[0].nombre_trabajo);
    assert.equal(body[0].commercialContent.displayName, 'PaginasWebChavez comercial');
    assert.equal(body[0].commercialContent.category, 'Sitio web profesional');
    assert.equal(body[0].commercialContent.featuredPriority, 30);
    assert.equal('trabajo_id' in body[0].commercialContent, false);
    assert.equal('slug_snapshot' in body[0].commercialContent, false);
    assert.equal('is_commercial_public' in body[0].commercialContent, false);
    assert.equal(body[0].slug, 'paginas-web-chavez');
    assert.equal(body[1].commercialContent.displayName, 'Plomada');
});

for (const work of works) {
    test(`GET /api/trabajos/${work.slug} devuelve el trabajo con commercialContent`, async () => {
        const response = await fetch(
            `${baseUrl}/api/trabajos/${work.slug}`
        );
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.equal(body.id, work.id);
        assert.equal(body.slug, work.slug);
        assert.equal(body.nombre_trabajo, work.nombre_trabajo);
        assert.equal(typeof body.commercialContent.displayName, 'string');
        assert.equal(typeof body.commercialContent.commercialSummary, 'string');
        assert.equal('id' in body.commercialContent, false);
        assert.equal('created_at' in body.commercialContent, false);
        assert.equal('updated_at' in body.commercialContent, false);
    });
}

test('un slug válido inexistente devuelve 404', async () => {
    const response = await fetch(
        `${baseUrl}/api/trabajos/slug-inexistente`
    );
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.success, false);
    assert.equal(body.message, 'El trabajo solicitado no existe.');
});

test('slugs inválidos e IDs públicos devuelven 400 sin consultar el modelo', async () => {
    const invalidSlugs = [
        'Paginas-Web-Chavez',
        'paginas_web_chavez',
        'paginas--web',
        '-plomada',
        'plomada-',
        '01',
        '1',
        'slug con espacios',
        'slug!'
    ];

    for (const slug of invalidSlugs) {
        const callsBeforeRequest = findOneCalls;
        const response = await fetch(
            `${baseUrl}/api/trabajos/${encodeURIComponent(slug)}`
        );
        const body = await response.json();

        assert.equal(response.status, 400, slug);
        assert.equal(body.success, false, slug);
        assert.equal(findOneCalls, callsBeforeRequest, slug);
    }
});

test('un error inesperado del modelo devuelve 500 sin exponer detalles', async () => {
    const originalConsoleError = console.error;
    console.error = () => {};

    try {
        const response = await fetch(
            `${baseUrl}/api/trabajos/database-error`
        );
        const body = await response.json();

        assert.equal(response.status, 500);
        assert.equal(body.success, false);
        assert.equal(body.message, 'No se pudo procesar la solicitud.');
        assert.equal(JSON.stringify(body).includes('Fallo simulado'), false);
    } finally {
        console.error = originalConsoleError;
    }
});
