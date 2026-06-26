import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';

import app from '../app.js';
import { env } from '../config/env.js';

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

test('rechaza métodos distintos de POST en /api/contacto', async () => {
    const response = await fetch(`${baseUrl}/api/contacto`);
    const body = await response.json();

    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'POST, OPTIONS');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.has('x-powered-by'), false);
    assert.equal(body.success, false);
});

test('bloquea origins que no están permitidos por CORS', async () => {
    const response = await fetch(`${baseUrl}/api/contacto`, {
        headers: {
            Origin: 'https://sitio-no-permitido.example'
        }
    });
    const body = await response.json();

    assert.equal(response.status, 403);
    assert.equal(body.success, false);
});

test('rechaza bodies inválidos sin exponer detalles internos', async () => {
    const response = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: 'A',
            correo: 'no-es-un-email',
            mensaje: 'corto'
        })
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.success, false);
    assert.equal(typeof body.mensaje, 'string');
    assert.equal('stack' in body, false);
});

test('rechaza con 400 las opciones que no pertenecen al formulario', async () => {
    const response = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: 'Ada Lovelace',
            correo: 'ada@example.com',
            tipoProyecto: 'Aplicación móvil',
            preferenciaContacto: 'telegram',
            mensaje: 'Necesito información sobre un proyecto.'
        })
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.success, false);
    assert.equal(typeof body.mensaje, 'string');
});

test('el honeypot simula éxito sin intentar guardar el mensaje', async () => {
    const response = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            website: 'https://spam.example.com'
        })
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.success, true);
});

test('rechaza JSON malformado y payloads demasiado grandes', async () => {
    const malformedResponse = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"nombre":'
    });
    const largeResponse = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mensaje: 'x'.repeat(101 * 1024)
        })
    });

    assert.equal(malformedResponse.status, 400);
    assert.equal(largeResponse.status, 413);
});

test('aplica el rate limit específico del formulario', async () => {
    const requestsBeforeLimit = Math.max(env.contactRateLimitMax - 3, 0);

    for (let attempt = 0; attempt < requestsBeforeLimit; attempt += 1) {
        const response = await fetch(`${baseUrl}/api/contacto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        assert.equal(response.status, 400);
    }

    const limitedResponse = await fetch(`${baseUrl}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    assert.equal(limitedResponse.status, 429);
});
