import { DataTypes, QueryTypes } from 'sequelize';

import {
    WORK_SLUG_MAX_LENGTH,
    WORK_SLUG_PATTERN,
    WORK_SLUG_UNIQUE_INDEX
} from '../constants/workSlugs.js';

const TABLE_NAME = 'trabajos';

export const WORK_SLUG_BACKFILL = Object.freeze([
    Object.freeze({
        id: 1,
        nombre_trabajo: 'PaginasWebChavez',
        slug: 'paginas-web-chavez'
    }),
    Object.freeze({
        id: 2,
        nombre_trabajo: 'Plomada',
        slug: 'plomada'
    }),
    Object.freeze({
        id: 3,
        nombre_trabajo: 'Montañez',
        slug: 'jardineria-montanez'
    }),
    Object.freeze({
        id: 4,
        nombre_trabajo: 'ELU',
        slug: 'elu'
    }),
    Object.freeze({
        id: 5,
        nombre_trabajo: 'Esperanza De Vida',
        slug: 'esperanza-de-vida'
    })
]);

const readWorkRows = async (queryInterface, includeSlug) =>
    queryInterface.sequelize.query(
        `SELECT id, nombre_trabajo${
            includeSlug ? ', slug' : ''
        } FROM trabajos ORDER BY id`,
        {
            type: QueryTypes.SELECT
        }
    );

const validateWorkInventory = (rows) => {
    const expectedById = new Map(
        WORK_SLUG_BACKFILL.map((work) => [work.id, work])
    );
    const rowsById = new Map(rows.map((row) => [Number(row.id), row]));
    const errors = [];

    for (const expected of WORK_SLUG_BACKFILL) {
        const row = rowsById.get(expected.id);

        if (!row) {
            errors.push(`falta el trabajo ID ${expected.id}`);
            continue;
        }

        if (row.nombre_trabajo !== expected.nombre_trabajo) {
            errors.push(
                `ID ${expected.id}: se esperaba "${expected.nombre_trabajo}" y se encontró "${row.nombre_trabajo}"`
            );
        }
    }

    for (const row of rows) {
        if (!expectedById.has(Number(row.id))) {
            errors.push(
                `ID ${row.id} ("${row.nombre_trabajo}") no tiene slug configurado`
            );
        }
    }

    if (errors.length > 0) {
        throw new Error(
            `El inventario de trabajos no coincide con el mapa de slugs: ${errors.join(
                '; '
            )}.`
        );
    }
};

export const validateMigratedWorkSlugs = (rows) => {
    validateWorkInventory(rows);

    const rowsById = new Map(rows.map((row) => [Number(row.id), row]));
    const seenSlugs = new Set();
    const errors = [];

    for (const expected of WORK_SLUG_BACKFILL) {
        const slug = rowsById.get(expected.id)?.slug;

        if (slug !== expected.slug) {
            errors.push(
                `ID ${expected.id}: se esperaba el slug "${expected.slug}" y se encontró "${slug ?? 'NULL'}"`
            );
            continue;
        }

        if (
            slug.length > WORK_SLUG_MAX_LENGTH ||
            !WORK_SLUG_PATTERN.test(slug)
        ) {
            errors.push(`ID ${expected.id}: el slug "${slug}" no es válido`);
        }

        if (seenSlugs.has(slug)) {
            errors.push(`el slug "${slug}" está duplicado`);
        }

        seenSlugs.add(slug);
    }

    if (errors.length > 0) {
        throw new Error(
            `La validación de slugs de trabajos falló: ${errors.join('; ')}.`
        );
    }
};

const isUniqueSlugIndex = (index) =>
    index.unique === true &&
    index.fields?.length === 1 &&
    (index.fields[0].attribute ?? index.fields[0].name) === 'slug';

export const addWorkSlugs = async (queryInterface) => {
    const currentColumns = await queryInterface.describeTable(TABLE_NAME);
    const columnExists = Boolean(currentColumns.slug);
    const inventory = await readWorkRows(queryInterface, columnExists);

    validateWorkInventory(inventory);

    let columnAdded = false;

    if (!columnExists) {
        await queryInterface.addColumn(TABLE_NAME, 'slug', {
            type: DataTypes.STRING(WORK_SLUG_MAX_LENGTH),
            allowNull: true
        });
        columnAdded = true;
    }

    const rowsWithSlug = columnExists
        ? inventory
        : await readWorkRows(queryInterface, true);
    const rowsById = new Map(
        rowsWithSlug.map((row) => [Number(row.id), row])
    );
    const updatedIds = [];

    for (const expected of WORK_SLUG_BACKFILL) {
        const currentSlug = rowsById.get(expected.id)?.slug;

        if (currentSlug && currentSlug !== expected.slug) {
            throw new Error(
                `El trabajo ID ${expected.id} ya tiene un slug distinto: "${currentSlug}".`
            );
        }

        if (currentSlug === expected.slug) continue;

        await queryInterface.bulkUpdate(
            TABLE_NAME,
            { slug: expected.slug },
            {
                id: expected.id,
                nombre_trabajo: expected.nombre_trabajo
            }
        );
        updatedIds.push(expected.id);
    }

    const migratedRows = await readWorkRows(queryInterface, true);

    validateMigratedWorkSlugs(migratedRows);

    const indexes = await queryInterface.showIndex(TABLE_NAME);
    const namedIndex = indexes.find(
        (index) => index.name === WORK_SLUG_UNIQUE_INDEX
    );

    if (namedIndex && !isUniqueSlugIndex(namedIndex)) {
        throw new Error(
            `El índice "${WORK_SLUG_UNIQUE_INDEX}" existe pero no protege slug como único.`
        );
    }

    const hasUniqueSlugIndex = indexes.some(isUniqueSlugIndex);
    let indexAdded = false;

    if (!hasUniqueSlugIndex) {
        await queryInterface.addIndex(TABLE_NAME, ['slug'], {
            name: WORK_SLUG_UNIQUE_INDEX,
            unique: true
        });
        indexAdded = true;
    }

    const currentSlugColumn = currentColumns.slug;
    const currentSlugType = String(currentSlugColumn?.type ?? '')
        .toUpperCase()
        .replace(/\s+/g, '');
    const needsFinalColumnDefinition =
        columnAdded ||
        currentSlugColumn?.allowNull !== false ||
        !currentSlugType.includes(`VARCHAR(${WORK_SLUG_MAX_LENGTH})`);
    let columnChanged = false;

    if (needsFinalColumnDefinition) {
        await queryInterface.changeColumn(TABLE_NAME, 'slug', {
            type: DataTypes.STRING(WORK_SLUG_MAX_LENGTH),
            allowNull: false
        });
        columnChanged = true;
    }

    return {
        columnAdded,
        updatedIds,
        indexAdded,
        columnChanged
    };
};
