import assert from 'node:assert/strict';
import test from 'node:test';

import { mensajes } from '../models/Portafolio.js';
import {
    buildContactRecord,
    saveContact
} from '../services/contactService.js';
import { contactBodySchema } from '../validation/schemas.js';

const fixedDate = new Date('2026-06-26T12:00:00.000Z');

test('mapea y valida las opciones antes de persistirlas con Sequelize', async () => {
    const contact = contactBodySchema.parse({
        nombre: 'María López',
        correo: 'maria@example.com',
        tipoProyecto: 'Tienda Online',
        presupuesto: 'USD 1.000 a 2.500',
        plazo: 'En 1 a 3 meses',
        preferenciaContacto: 'whatsapp',
        telefono: '+54 11 1234-5678',
        mensaje: 'Quiero desarrollar una tienda para mi negocio.',
        origen_url: 'https://example.com/contacto'
    });
    const record = buildContactRecord(contact, {
        createdAt: fixedDate
    });
    const instance = mensajes.build(record);

    await instance.validate();

    assert.equal(instance.tipo_proyecto, 'Tienda Online');
    assert.equal(instance.presupuesto, 'USD 1.000 a 2.500');
    assert.equal(instance.plazo, 'En 1 a 3 meses');
    assert.equal(instance.preferencia_contacto, 'whatsapp');
    assert.equal(instance.telefono, '+54 11 1234-5678');
    assert.equal(instance.fecha, fixedDate.toISOString());
});

test('mapea el payload anterior con columnas nuevas en NULL', async () => {
    const contact = contactBodySchema.parse({
        nombre: 'Ada Lovelace',
        correo: 'ada@example.com',
        mensaje: 'Necesito información sobre un proyecto.',
        origen_url: 'https://example.com/contacto'
    });
    const record = buildContactRecord(contact, {
        createdAt: fixedDate
    });
    const instance = mensajes.build(record);

    await instance.validate();

    assert.equal(instance.tipo_proyecto, null);
    assert.equal(instance.presupuesto, null);
    assert.equal(instance.plazo, null);
    assert.equal(instance.preferencia_contacto, null);
    assert.equal(instance.telefono, null);
});

test('entrega el registro completo a Sequelize create', async () => {
    const contact = contactBodySchema.parse({
        nombre: 'Grace Hopper',
        correo: 'grace@example.com',
        tipoProyecto: 'Desarrollo a medida',
        presupuesto: 'Necesito orientación',
        plazo: 'Todavía no lo definí',
        preferenciaContacto: 'email',
        mensaje: 'Necesito analizar un desarrollo para mi empresa.'
    });
    let savedRecord;
    const messageModel = {
        create: async (record) => {
            savedRecord = record;
            return record;
        }
    };

    await saveContact(messageModel, contact, {
        createdAt: fixedDate,
        requestOrigin: 'https://example.com'
    });

    assert.equal(savedRecord.tipo_proyecto, 'Desarrollo a medida');
    assert.equal(savedRecord.presupuesto, 'Necesito orientación');
    assert.equal(savedRecord.plazo, 'Todavía no lo definí');
    assert.equal(savedRecord.preferencia_contacto, 'email');
    assert.equal(savedRecord.telefono, null);
});
