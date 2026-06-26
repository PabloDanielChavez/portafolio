import assert from 'node:assert/strict';
import test from 'node:test';

import { contactBodySchema } from '../validation/schemas.js';

test('mantiene compatibilidad con el payload anterior del frontend', () => {
    const result = contactBodySchema.safeParse({
        nombre: '  María   López  ',
        correo: '  PERSONA@EXAMPLE.COM ',
        mensaje: 'Hola,\r\n\r\n\r\nquiero consultar por un sitio web.',
        origen_url: 'https://example.com/contacto'
    });

    assert.equal(result.success, true);
    assert.equal(result.data.nombre, 'María López');
    assert.equal(result.data.correo, 'persona@example.com');
    assert.equal(
        result.data.mensaje,
        'Hola,\n\nquiero consultar por un sitio web.'
    );
});

test('acepta, normaliza y conserva todas las opciones del formulario', () => {
    const result = contactBodySchema.safeParse({
        nombre: '  María   López ',
        correo: 'maria@example.com',
        tipoProyecto: 'Sitio Web Profesional',
        presupuesto: 'USD 1.000 a 2.500',
        plazo: 'Durante el próximo mes',
        preferenciaContacto: 'whatsapp',
        telefono: ' +54 (11) 1234-5678 ',
        mensaje: 'Necesito renovar el sitio web de mi empresa.',
        origen_url: 'https://example.com/contacto',
        website: ''
    });

    assert.equal(result.success, true);
    assert.equal(result.data.nombre, 'María López');
    assert.equal(result.data.tipoProyecto, 'Sitio Web Profesional');
    assert.equal(result.data.presupuesto, 'USD 1.000 a 2.500');
    assert.equal(result.data.plazo, 'Durante el próximo mes');
    assert.equal(result.data.preferenciaContacto, 'whatsapp');
    assert.equal(result.data.telefono, '+54 (11) 1234-5678');
});

test('acepta email como alias y valida los campos opcionales', () => {
    const result = contactBodySchema.safeParse({
        nombre: 'Ada Lovelace',
        email: 'ada@example.com',
        telefono: '+54 (11) 1234-5678',
        asunto: 'Nuevo proyecto',
        mensaje: 'Necesito información sobre un nuevo proyecto.',
        website: ''
    });

    assert.equal(result.success, true);
    assert.equal(result.data.correo, 'ada@example.com');
});

test('rechaza campos extra, HTML y scripts', () => {
    const extraField = contactBodySchema.safeParse({
        nombre: 'Ada Lovelace',
        correo: 'ada@example.com',
        mensaje: 'Necesito información sobre un nuevo proyecto.',
        role: 'admin'
    });
    const unsafeContent = contactBodySchema.safeParse({
        nombre: 'Ada Lovelace',
        correo: 'ada@example.com',
        mensaje: '<script>alert(1)</script> consulta de proyecto'
    });

    assert.equal(extraField.success, false);
    assert.equal(unsafeContent.success, false);
});

test('aplica longitudes y formatos máximos', () => {
    const result = contactBodySchema.safeParse({
        nombre: 'A',
        correo: `${'a'.repeat(110)}@example.com`,
        telefono: '123ABC',
        mensaje: 'x'.repeat(2501)
    });

    assert.equal(result.success, false);
});

test('rechaza opciones cerradas inválidas y WhatsApp sin teléfono', () => {
    const invalidOption = contactBodySchema.safeParse({
        nombre: 'Ada Lovelace',
        correo: 'ada@example.com',
        tipoProyecto: 'Aplicación móvil',
        presupuesto: 'Sin límite',
        plazo: 'Mañana',
        preferenciaContacto: 'telegram',
        mensaje: 'Necesito información sobre un nuevo proyecto.'
    });
    const whatsappWithoutPhone = contactBodySchema.safeParse({
        nombre: 'Ada Lovelace',
        correo: 'ada@example.com',
        tipoProyecto: 'Landing Page',
        preferenciaContacto: 'whatsapp',
        mensaje: 'Necesito información sobre un nuevo proyecto.'
    });

    assert.equal(invalidOption.success, false);
    assert.equal(whatsappWithoutPhone.success, false);
});
