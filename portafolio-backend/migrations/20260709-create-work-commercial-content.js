import { DataTypes } from 'sequelize';

import {
    INDICE_PRIORIDAD_CONTENIDO_COMERCIAL,
    INDICE_PUBLICO_CONTENIDO_COMERCIAL,
    INDICE_SLUG_SNAPSHOT_CONTENIDO_COMERCIAL,
    INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO,
    PATRON_ENLACE_INTERNO_COMERCIAL,
    TABLA_CONTENIDO_COMERCIAL_TRABAJOS
} from '../constants/workCommercialContent.js';
import { WORK_SLUG_MAX_LENGTH } from '../constants/workSlugs.js';

const TABLA_TRABAJOS = 'trabajos';

const obtenerNombreTabla = (tabla) => {
    if (typeof tabla === 'string') return tabla;

    return tabla?.tableName ?? tabla?.name;
};

const existeTabla = async (queryInterface) => {
    if (typeof queryInterface.showAllTables === 'function') {
        const tablas = await queryInterface.showAllTables();

        return tablas
            .map(obtenerNombreTabla)
            .includes(TABLA_CONTENIDO_COMERCIAL_TRABAJOS);
    }

    try {
        await queryInterface.describeTable(TABLA_CONTENIDO_COMERCIAL_TRABAJOS);
        return true;
    } catch {
        return false;
    }
};

const tieneIndice = (indices, nombreIndice) =>
    indices.some((indice) => indice.name === nombreIndice);

const agregarIndiceSiFalta = async (
    queryInterface,
    indices,
    campos,
    opciones
) => {
    if (tieneIndice(indices, opciones.name)) {
        return false;
    }

    await queryInterface.addIndex(
        TABLA_CONTENIDO_COMERCIAL_TRABAJOS,
        campos,
        opciones
    );
    indices.push({
        name: opciones.name,
        unique: opciones.unique === true,
        fields: campos.map((campo) => ({ attribute: campo }))
    });

    return true;
};

export const columnasContenidoComercialTrabajos = Object.freeze({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    trabajo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TABLA_TRABAJOS,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    slug_snapshot: {
        type: DataTypes.STRING(WORK_SLUG_MAX_LENGTH),
        allowNull: true
    },
    display_name: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    commercial_category: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    seo_title: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    seo_description: {
        type: DataTypes.STRING(180),
        allowNull: true
    },
    commercial_summary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    information: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    challenge: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    outcome: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    featured_priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    primary_cta_label: {
        type: DataTypes.STRING(80),
        allowNull: true
    },
    primary_cta_href: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    related_plan_label: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    related_plan_href: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    is_commercial_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

export const validarEnlaceComercialInterno = (valor) =>
    valor === null ||
    valor === undefined ||
    PATRON_ENLACE_INTERNO_COMERCIAL.test(valor);

export const crearTablaContenidoComercialTrabajos = async (queryInterface) => {
    const creada = !(await existeTabla(queryInterface));

    if (creada) {
        await queryInterface.createTable(
            TABLA_CONTENIDO_COMERCIAL_TRABAJOS,
            columnasContenidoComercialTrabajos
        );
    }

    const indices =
        typeof queryInterface.showIndex === 'function'
            ? await queryInterface.showIndex(TABLA_CONTENIDO_COMERCIAL_TRABAJOS)
            : [];
    const indicesAgregados = [];

    if (
        await agregarIndiceSiFalta(
            queryInterface,
            indices,
            ['trabajo_id'],
            {
                name: INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO,
                unique: true
            }
        )
    ) {
        indicesAgregados.push(INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO);
    }

    if (
        await agregarIndiceSiFalta(
            queryInterface,
            indices,
            ['slug_snapshot'],
            {
                name: INDICE_SLUG_SNAPSHOT_CONTENIDO_COMERCIAL
            }
        )
    ) {
        indicesAgregados.push(INDICE_SLUG_SNAPSHOT_CONTENIDO_COMERCIAL);
    }

    if (
        await agregarIndiceSiFalta(
            queryInterface,
            indices,
            ['featured_priority'],
            {
                name: INDICE_PRIORIDAD_CONTENIDO_COMERCIAL
            }
        )
    ) {
        indicesAgregados.push(INDICE_PRIORIDAD_CONTENIDO_COMERCIAL);
    }

    if (
        await agregarIndiceSiFalta(
            queryInterface,
            indices,
            ['is_commercial_public'],
            {
                name: INDICE_PUBLICO_CONTENIDO_COMERCIAL
            }
        )
    ) {
        indicesAgregados.push(INDICE_PUBLICO_CONTENIDO_COMERCIAL);
    }

    return {
        creada,
        indicesAgregados
    };
};
