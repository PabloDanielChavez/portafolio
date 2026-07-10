import assert from 'node:assert/strict';
import test, { after } from 'node:test';

import db from '../config/db.js';
import {
    INDICE_PRIORIDAD_CONTENIDO_COMERCIAL,
    INDICE_PUBLICO_CONTENIDO_COMERCIAL,
    INDICE_SLUG_SNAPSHOT_CONTENIDO_COMERCIAL,
    INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO,
    PATRON_ENLACE_INTERNO_COMERCIAL,
    TABLA_CONTENIDO_COMERCIAL_TRABAJOS
} from '../constants/workCommercialContent.js';
import {
    columnasContenidoComercialTrabajos,
    crearTablaContenidoComercialTrabajos,
    validarEnlaceComercialInterno
} from '../migrations/20260709-create-work-commercial-content.js';
import {
    trabajo_commercial_content,
    trabajos
} from '../models/Portafolio.js';

after(async () => {
    await db.close();
});

const indicesEsperados = [
    INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO,
    INDICE_SLUG_SNAPSHOT_CONTENIDO_COMERCIAL,
    INDICE_PRIORIDAD_CONTENIDO_COMERCIAL,
    INDICE_PUBLICO_CONTENIDO_COMERCIAL
];

const crearHarnessMigracion = ({
    tablaYaExiste = false,
    indices = []
} = {}) => {
    const estado = {
        tablas: tablaYaExiste ? [TABLA_CONTENIDO_COMERCIAL_TRABAJOS] : [],
        indices: indices.map((indice) => ({
            ...indice,
            fields: indice.fields?.map((campo) => ({ ...campo }))
        })),
        tablaCreada: null,
        operaciones: []
    };
    const queryInterface = {
        showAllTables: async () => estado.tablas,
        createTable: async (tabla, columnas) => {
            assert.equal(tabla, TABLA_CONTENIDO_COMERCIAL_TRABAJOS);
            estado.tablas.push(tabla);
            estado.tablaCreada = columnas;
            estado.operaciones.push('createTable');
        },
        showIndex: async (tabla) => {
            assert.equal(tabla, TABLA_CONTENIDO_COMERCIAL_TRABAJOS);
            return estado.indices;
        },
        addIndex: async (tabla, campos, opciones) => {
            assert.equal(tabla, TABLA_CONTENIDO_COMERCIAL_TRABAJOS);
            estado.indices.push({
                name: opciones.name,
                unique: opciones.unique === true,
                fields: campos.map((campo) => ({ attribute: campo }))
            });
            estado.operaciones.push({
                type: 'addIndex',
                fields: campos,
                options: opciones
            });
        },
        addColumn: async () => {
            throw new Error('No debe modificar la tabla trabajos.');
        },
        bulkInsert: async () => {
            throw new Error('No debe insertar contenido comercial.');
        },
        bulkUpdate: async () => {
            throw new Error('No debe modificar registros existentes.');
        }
    };

    return { queryInterface, estado };
};

test('el modelo comercial define tabla separada y relacion 1:1 con trabajos', () => {
    assert.equal(
        trabajo_commercial_content.getTableName(),
        TABLA_CONTENIDO_COMERCIAL_TRABAJOS
    );

    const asociacionComercial = trabajos.associations.commercialContent;
    const asociacionTrabajo = trabajo_commercial_content.associations.trabajo;

    assert.equal(asociacionComercial.associationType, 'HasOne');
    assert.equal(asociacionComercial.foreignKey, 'trabajo_id');
    assert.equal(asociacionComercial.target, trabajo_commercial_content);
    assert.equal(asociacionTrabajo.associationType, 'BelongsTo');
    assert.equal(asociacionTrabajo.foreignKey, 'trabajo_id');
    assert.equal(asociacionTrabajo.target, trabajos);
});

test('el modelo comercial conserva defaults y campos nullable de transicion', async () => {
    const atributos = trabajo_commercial_content.rawAttributes;

    assert.equal(atributos.trabajo_id.allowNull, false);
    assert.equal(
        atributos.trabajo_id.unique,
        INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO
    );
    assert.equal(atributos.featured_priority.allowNull, false);
    assert.equal(atributos.featured_priority.defaultValue, 0);
    assert.equal(atributos.is_commercial_public.allowNull, false);
    assert.equal(atributos.is_commercial_public.defaultValue, false);
    assert.equal(atributos.slug_snapshot.allowNull, true);
    assert.equal(atributos.commercial_summary.allowNull, true);
    assert.equal(atributos.information.allowNull, true);
    assert.equal(atributos.challenge.allowNull, true);
    assert.equal(atributos.outcome.allowNull, true);

    const contenidoComercial = trabajo_commercial_content.build({
        trabajo_id: 1
    });

    await contenidoComercial.validate();

    assert.equal(contenidoComercial.featured_priority, 0);
    assert.equal(contenidoComercial.is_commercial_public, false);
});

test('el modelo valida CTAs como rutas internas sin dependencias nuevas', async () => {
    assert.equal(validarEnlaceComercialInterno('/contacto'), true);
    assert.equal(
        validarEnlaceComercialInterno('/servicios/planes/landing_page'),
        true
    );
    assert.equal(validarEnlaceComercialInterno('https://example.com'), false);
    assert.equal(validarEnlaceComercialInterno('/trabajos/../admin'), false);
    assert.equal(PATRON_ENLACE_INTERNO_COMERCIAL.test('/contacto'), true);

    await trabajo_commercial_content
        .build({
            trabajo_id: 1,
            primary_cta_href: '/contacto',
            related_plan_href: '/servicios/planes/landing_page'
        })
        .validate();

    await assert.rejects(
        () =>
            trabajo_commercial_content
                .build({
                    trabajo_id: 1,
                    primary_cta_href: 'https://example.com'
                })
                .validate(),
        /ruta interna/
    );
});

test('la migracion crea tabla comercial con campos, defaults y relacion', async () => {
    const { queryInterface, estado } = crearHarnessMigracion();
    const resultado = await crearTablaContenidoComercialTrabajos(queryInterface);

    assert.deepEqual(resultado, {
        creada: true,
        indicesAgregados: indicesEsperados
    });
    assert.equal(estado.operaciones[0], 'createTable');
    assert.equal(estado.tablaCreada.trabajo_id.allowNull, false);
    assert.deepEqual(estado.tablaCreada.trabajo_id.references, {
        model: 'trabajos',
        key: 'id'
    });
    assert.equal(estado.tablaCreada.trabajo_id.onUpdate, 'CASCADE');
    assert.equal(estado.tablaCreada.trabajo_id.onDelete, 'RESTRICT');
    assert.equal(estado.tablaCreada.featured_priority.defaultValue, 0);
    assert.equal(estado.tablaCreada.is_commercial_public.defaultValue, false);
    assert.equal(estado.tablaCreada.slug_snapshot.allowNull, true);
    assert.equal(estado.tablaCreada.information.allowNull, true);
    assert.equal(estado.tablaCreada.challenge.allowNull, true);
    assert.equal(
        estado.tablaCreada.seo_description.type.toString(),
        'VARCHAR(180)'
    );
    assert.equal(
        estado.tablaCreada.primary_cta_href.type.toString(),
        'VARCHAR(255)'
    );
    assert.equal(estado.tablaCreada.commercial_summary.type.toString(), 'TEXT');
});

test('la migracion es idempotente si tabla e indices ya existen', async () => {
    const { queryInterface, estado } = crearHarnessMigracion({
        tablaYaExiste: true,
        indices: indicesEsperados.map((name) => ({ name }))
    });
    const resultado = await crearTablaContenidoComercialTrabajos(queryInterface);

    assert.deepEqual(resultado, {
        creada: false,
        indicesAgregados: []
    });
    assert.deepEqual(estado.operaciones, []);
});

test('la migracion no inserta backfill ni modifica trabajos', async () => {
    const { queryInterface, estado } = crearHarnessMigracion();

    await crearTablaContenidoComercialTrabajos(queryInterface);

    assert.equal(
        estado.operaciones.some((operacion) =>
            ['addColumn', 'bulkInsert', 'bulkUpdate'].includes(operacion)
        ),
        false
    );
    assert.equal(columnasContenidoComercialTrabajos.trabajo_id.allowNull, false);
});
