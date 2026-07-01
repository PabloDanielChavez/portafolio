import assert from 'node:assert/strict';
import test from 'node:test';

import {
    WORK_SLUG_BACKFILL,
    addWorkSlugs,
    validateMigratedWorkSlugs
} from '../migrations/20260701-add-work-slugs.js';

const createExpectedRows = ({ withSlugs = false } = {}) =>
    WORK_SLUG_BACKFILL.map((work) => ({
        id: work.id,
        nombre_trabajo: work.nombre_trabajo,
        ...(withSlugs ? { slug: work.slug } : {})
    }));

const createMigrationHarness = ({
    columnExists = false,
    allowNull = true,
    columnType = 'VARCHAR(160)',
    rows = createExpectedRows({ withSlugs: columnExists }),
    indexes = []
} = {}) => {
    const state = {
        columnExists,
        allowNull,
        columnType,
        rows: rows.map((row) => ({ ...row })),
        indexes: indexes.map((index) => ({
            ...index,
            fields: index.fields?.map((field) => ({ ...field }))
        })),
        operations: []
    };
    const queryInterface = {
        describeTable: async (table) => {
            assert.equal(table, 'trabajos');

            return {
                id: {},
                nombre_trabajo: {},
                ...(state.columnExists
                    ? {
                          slug: {
                              allowNull: state.allowNull,
                              type: state.columnType
                          }
                      }
                    : {})
            };
        },
        sequelize: {
            query: async () => state.rows.map((row) => ({ ...row }))
        },
        addColumn: async (table, column, definition) => {
            assert.equal(table, 'trabajos');
            assert.equal(column, 'slug');
            assert.equal(definition.allowNull, true);
            assert.equal(definition.type.toString(), 'VARCHAR(160)');
            state.columnExists = true;
            state.rows = state.rows.map((row) => ({
                ...row,
                slug: null
            }));
            state.operations.push('addColumn');
        },
        bulkUpdate: async (table, values, where) => {
            assert.equal(table, 'trabajos');

            const row = state.rows.find(
                (candidate) =>
                    candidate.id === where.id &&
                    candidate.nombre_trabajo === where.nombre_trabajo
            );

            if (row) row.slug = values.slug;

            state.operations.push({
                type: 'bulkUpdate',
                where: { ...where },
                slug: values.slug
            });
        },
        showIndex: async (table) => {
            assert.equal(table, 'trabajos');
            return state.indexes;
        },
        addIndex: async (table, fields, options) => {
            assert.equal(table, 'trabajos');
            assert.deepEqual(fields, ['slug']);
            assert.equal(options.name, 'trabajos_slug_unique');
            assert.equal(options.unique, true);
            state.indexes.push({
                name: options.name,
                unique: true,
                fields: [{ attribute: 'slug' }]
            });
            state.operations.push('addIndex');
        },
        changeColumn: async (table, column, definition) => {
            assert.equal(table, 'trabajos');
            assert.equal(column, 'slug');
            assert.equal(definition.allowNull, false);
            assert.equal(definition.type.toString(), 'VARCHAR(160)');
            state.allowNull = false;
            state.columnType = 'VARCHAR(160)';
            state.operations.push('changeColumn');
        }
    };

    return { queryInterface, state };
};

test('la migración agrega, completa y protege los cinco slugs', async () => {
    const { queryInterface, state } = createMigrationHarness();

    const result = await addWorkSlugs(queryInterface);

    assert.deepEqual(result, {
        columnAdded: true,
        updatedIds: [1, 2, 3, 4, 5],
        indexAdded: true,
        columnChanged: true
    });
    assert.deepEqual(
        state.rows.map(({ id, slug }) => ({ id, slug })),
        WORK_SLUG_BACKFILL.map(({ id, slug }) => ({ id, slug }))
    );

    for (const update of state.operations.filter(
        (operation) => operation.type === 'bulkUpdate'
    )) {
        const expected = WORK_SLUG_BACKFILL.find(
            (work) => work.id === update.where.id
        );

        assert.deepEqual(update.where, {
            id: expected.id,
            nombre_trabajo: expected.nombre_trabajo
        });
        assert.equal(update.slug, expected.slug);
    }
});

test('la migración es idempotente después de completarse', async () => {
    const uniqueIndex = {
        name: 'trabajos_slug_unique',
        unique: true,
        fields: [{ attribute: 'slug' }]
    };
    const { queryInterface, state } = createMigrationHarness({
        columnExists: true,
        allowNull: false,
        rows: createExpectedRows({ withSlugs: true }),
        indexes: [uniqueIndex]
    });

    const result = await addWorkSlugs(queryInterface);

    assert.deepEqual(result, {
        columnAdded: false,
        updatedIds: [],
        indexAdded: false,
        columnChanged: false
    });
    assert.deepEqual(state.operations, []);
});

test('la migración se detiene antes de escribir si ID y nombre no coinciden', async () => {
    const rows = createExpectedRows();
    rows[2].nombre_trabajo = 'Proyecto incorrecto';
    const { queryInterface, state } = createMigrationHarness({ rows });

    await assert.rejects(
        () => addWorkSlugs(queryInterface),
        /ID 3: se esperaba "Montañez"/
    );
    assert.deepEqual(state.operations, []);
});

test('la migración se detiene si aparece un trabajo sin slug configurado', async () => {
    const rows = [
        ...createExpectedRows(),
        {
            id: 6,
            nombre_trabajo: 'Proyecto nuevo'
        }
    ];
    const { queryInterface, state } = createMigrationHarness({ rows });

    await assert.rejects(
        () => addWorkSlugs(queryInterface),
        /ID 6 .* no tiene slug configurado/
    );
    assert.deepEqual(state.operations, []);
});

test('la migración no sobrescribe un slug existente distinto', async () => {
    const rows = createExpectedRows({ withSlugs: true });
    rows[3].slug = 'slug-no-confirmado';
    const { queryInterface, state } = createMigrationHarness({
        columnExists: true,
        rows
    });

    await assert.rejects(
        () => addWorkSlugs(queryInterface),
        /ID 4 ya tiene un slug distinto/
    );
    assert.deepEqual(state.operations, []);
});

test('la validación detecta slugs inválidos o duplicados', () => {
    const invalidRows = createExpectedRows({ withSlugs: true });
    invalidRows[1].slug = 'Slug Inválido';

    assert.throws(
        () => validateMigratedWorkSlugs(invalidRows),
        /validación de slugs de trabajos falló/
    );

    const duplicateRows = createExpectedRows({ withSlugs: true });
    duplicateRows[4].slug = duplicateRows[3].slug;

    assert.throws(
        () => validateMigratedWorkSlugs(duplicateRows),
        /validación de slugs de trabajos falló/
    );
});
