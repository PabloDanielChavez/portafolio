import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import express from 'express';

import {
    createGetAllController,
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
        slug: 'paginas-web-chavez'
    },
    {
        id: 2,
        nombre_trabajo: 'Plomada',
        slug: 'plomada'
    },
    {
        id: 3,
        nombre_trabajo: 'Montañez',
        slug: 'jardineria-montanez'
    },
    {
        id: 4,
        nombre_trabajo: 'ELU',
        slug: 'elu'
    },
    {
        id: 5,
        nombre_trabajo: 'Esperanza De Vida',
        slug: 'esperanza-de-vida'
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
    asyncHandler(createGetAllController(workModel))
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

test('GET /api/trabajos conserva el listado con slugs', async () => {
    const response = await fetch(`${baseUrl}/api/trabajos`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, works);
});

for (const work of works) {
    test(`GET /api/trabajos/${work.slug} devuelve el trabajo`, async () => {
        const response = await fetch(
            `${baseUrl}/api/trabajos/${work.slug}`
        );
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.deepEqual(body, work);
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
