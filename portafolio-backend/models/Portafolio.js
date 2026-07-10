import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import {
    CONTACT_BUDGET_RANGES,
    CONTACT_PREFERENCES,
    CONTACT_PROJECT_TYPES,
    CONTACT_TIMELINES
} from '../constants/contactOptions.js';
import {
    WORK_SLUG_MAX_LENGTH,
    WORK_SLUG_PATTERN,
    WORK_SLUG_UNIQUE_INDEX
} from '../constants/workSlugs.js';
import {
    INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO,
    PATRON_ENLACE_INTERNO_COMERCIAL,
    TABLA_CONTENIDO_COMERCIAL_TRABAJOS
} from '../constants/workCommercialContent.js';

const modelOptions = (name) => ({
    timestamps: false,
    freezeTableName: true,
    tableName: name
});

const stringField = () => ({ type: DataTypes.TEXT, allowNull: false });
const intField = () => ({ type: DataTypes.INTEGER, allowNull: false });
const idField = () => ({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true });
const validContactPhone = /^[+\d\s().-]+$/;

const campoTextoCortoOpcional = (longitud) => ({
    type: DataTypes.STRING(longitud),
    allowNull: true
});

const campoTextoLargoOpcional = () => ({
    type: DataTypes.TEXT,
    allowNull: true
});

const campoEnlaceInternoOpcional = (longitud = 255) => ({
    ...campoTextoCortoOpcional(longitud),
    validate: {
        esEnlaceComercialInterno(valor) {
            if (
                valor !== null &&
                valor !== undefined &&
                !PATRON_ENLACE_INTERNO_COMERCIAL.test(valor)
            ) {
                throw new Error('El enlace comercial debe ser una ruta interna.');
            }
        }
    }
});

export const perfil = db.define('perfil', {
    id: idField(),
    nombre: stringField(),
    apellido: stringField(),
    edad: intField(),
    fecha_nacimiento: { type: DataTypes.STRING(10), allowNull: false },
    ubicacion: stringField(),
    nombre_instagram: stringField(),
    nombre_facebook: stringField(),
    nombre_linkedin: stringField(),
    nombre_github: stringField(),
    numero_whatsapp: stringField(),
    informacion_resumida: stringField(),
    informacion_detallada: stringField(),
    foto_perfil: stringField(),
    profesion: stringField(),
    clientes_felices: intField(),
    tiempo_experiencia: intField(),
    trabajos_completos: intField(),
    opiniones_recibidas: intField()
}, modelOptions('perfil'));

export const experiencia = db.define('experiencia', {
    id: idField(),
    nombre_empresa: stringField(),
    tipo_empresa: stringField(),
    enlace_empresa: stringField(),
    tiempo_inicio: stringField(),
    tiempo_final: stringField(),
    puesto_empresa: stringField(),
    detalle_puesto: stringField(),
    empresa_imagen: stringField(),
    empresa_imagenFormato: stringField(),
    rol_descripcion_larga: stringField(),
    tecnologias: stringField(),
    logros: stringField(),
    desafios_soluciones: stringField(),
    desafio: stringField(),
    solucion: stringField(),
    imagenes_proyecto: stringField()
}, modelOptions('experiencia'));

export const exp_desafio = db.define('exp_desafio', {
    id: idField(),
    exp_id: intField(),
    exp_desafio: stringField(),
    exp_solucion: stringField()
}, modelOptions('exp_desafio'));

export const exp_tecnologia = db.define('exp_tecnologia', {
    id : idField(),
    exp_id : intField(),
    SASS : intField(),
    Node : intField(),
    Next : intField(),
    React : intField()
}, modelOptions('exp_tecnologia'));

export const habilidades = db.define('habilidades', {
    id: idField(),
    nombre_habilidad: stringField(),
    categoria_habilidad: stringField()
}, modelOptions('habilidades'));

export const servicios = db.define('servicios', {
    id: idField(),
    nombre_servicio: stringField(),
    informacion_servicio: stringField(),
    reactIcon: stringField()
}, modelOptions('servicios'));

export const trabajos = db.define('trabajos', {
    id: idField(),
    nombre_trabajo: stringField(),
    slug: {
        type: DataTypes.STRING(WORK_SLUG_MAX_LENGTH),
        allowNull: false,
        unique: WORK_SLUG_UNIQUE_INDEX,
        validate: {
            len: [1, WORK_SLUG_MAX_LENGTH],
            is: WORK_SLUG_PATTERN
        }
    },
    categoria_trabajo: stringField(),
    numero_pagina: intField(),
    style_trabajo: stringField(),
    complejidad_trabajo: stringField(),
    enlace_trabajo: stringField(),
    enlace_trabajoResumido: stringField(),
    tiempo_trabajo: stringField(),
    resumen_trabajo: stringField(),
    informacion_trabajo: stringField(),
    opinion_trabajo: stringField(),
    valoracion_trabajo: stringField(),
    nombre_archivo: stringField(),
    nombre_imagen: stringField(),
    formato_imagen: stringField(),
    performance_mobile: intField(),
    accessibility_mobile: intField(),
    practices_mobile: intField(),
    seo_mobile: intField(),
    estado_proyecto: stringField(),
    fecha_finalizacion: stringField(),
    enlace_repositorio: stringField(),
    performance_desktop: intField(),
    practices_desktop: intField(),
    accessibility_desktop: intField(),
    seo_desktop: intField(),
    rol: stringField(),
    categoria_cliente: stringField(),
    reto_tecnico: stringField(),
    destacado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, modelOptions('trabajos'));

export const trabajo_commercial_content = db.define(
    TABLA_CONTENIDO_COMERCIAL_TRABAJOS,
    {
        id: idField(),
        trabajo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: INDICE_UNICO_CONTENIDO_COMERCIAL_TRABAJO
        },
        slug_snapshot: campoTextoCortoOpcional(WORK_SLUG_MAX_LENGTH),
        display_name: campoTextoCortoOpcional(120),
        commercial_category: campoTextoCortoOpcional(120),
        seo_title: campoTextoCortoOpcional(120),
        seo_description: campoTextoCortoOpcional(180),
        commercial_summary: campoTextoLargoOpcional(),
        information: campoTextoLargoOpcional(),
        challenge: campoTextoLargoOpcional(),
        outcome: campoTextoLargoOpcional(),
        featured_priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true
            }
        },
        primary_cta_label: campoTextoCortoOpcional(80),
        primary_cta_href: campoEnlaceInternoOpcional(),
        related_plan_label: campoTextoCortoOpcional(120),
        related_plan_href: campoEnlaceInternoOpcional(),
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
    },
    modelOptions(TABLA_CONTENIDO_COMERCIAL_TRABAJOS)
);

trabajos.hasOne(trabajo_commercial_content, {
    foreignKey: 'trabajo_id',
    as: 'commercialContent'
});

trabajo_commercial_content.belongsTo(trabajos, {
    foreignKey: 'trabajo_id',
    as: 'trabajo'
});

export const tra_tecnologia = db.define('tra_tecnologia', {
    id: idField(),
    tra_id: intField(),
    SASS : intField(),
    Node : intField(),
    Next : intField(),
    React : intField(),
    GoogleTagManager: intField(),
    GoogleAnalytics: intField(),
    Sequelize: intField(),
    MySQL: intField(),
    Express: intField()
}, modelOptions('tra_tecnologia'));

export const clientes = db.define('clientes', {
    id: idField(),
    nombre_cliente: stringField(),
    opinion_cliente: stringField(),
    valoracion_cliente: stringField(),
    ubicacion_cliente: stringField(),
    nombre_archivo: stringField(),
    nombre_imagen: stringField(),
    formato_imagen: stringField()
}, modelOptions('clientes'));

export const mensajes = db.define('mensajes', {
    id: idField(),
    nombre: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            len: [2, 80]
        }
    },
    correo: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            isEmail: true,
            len: [3, 120]
        }
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [10, 3000]
        }
    },
    tipo_proyecto: {
        type: DataTypes.STRING(40),
        allowNull: true,
        validate: {
            isIn: [CONTACT_PROJECT_TYPES]
        }
    },
    presupuesto: {
        type: DataTypes.STRING(40),
        allowNull: true,
        validate: {
            isIn: [CONTACT_BUDGET_RANGES]
        }
    },
    plazo: {
        type: DataTypes.STRING(40),
        allowNull: true,
        validate: {
            isIn: [CONTACT_TIMELINES]
        }
    },
    preferencia_contacto: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            isIn: [CONTACT_PREFERENCES]
        }
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
            len: [8, 30],
            is: validContactPhone
        }
    },
    fecha: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    navegador: {
        type: DataTypes.STRING(512),
        allowNull: true
    },
    sistema_operativo: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    dispositivo: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    origen_url: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, modelOptions('mensajes'));
