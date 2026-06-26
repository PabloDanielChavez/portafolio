import assert from 'node:assert/strict';
import test from 'node:test';

import { addContactFields } from '../migrations/20260626-add-contact-fields.js';

const expectedColumns = [
    'tipo_proyecto',
    'presupuesto',
    'plazo',
    'preferencia_contacto',
    'telefono'
];

test('la migración agrega únicamente las columnas faltantes', async () => {
    const addedColumns = [];
    const queryInterface = {
        describeTable: async () => ({
            id: {},
            nombre: {},
            presupuesto: {}
        }),
        addColumn: async (table, column, definition) => {
            assert.equal(table, 'mensajes');
            assert.equal(definition.allowNull, true);
            addedColumns.push(column);
        }
    };

    const result = await addContactFields(queryInterface);

    assert.deepEqual(
        result,
        expectedColumns.filter((column) => column !== 'presupuesto')
    );
    assert.deepEqual(addedColumns, result);
});

test('la migración es idempotente cuando las columnas ya existen', async () => {
    let additions = 0;
    const queryInterface = {
        describeTable: async () =>
            Object.fromEntries(expectedColumns.map((column) => [column, {}])),
        addColumn: async () => {
            additions += 1;
        }
    };

    const result = await addContactFields(queryInterface);

    assert.deepEqual(result, []);
    assert.equal(additions, 0);
});
