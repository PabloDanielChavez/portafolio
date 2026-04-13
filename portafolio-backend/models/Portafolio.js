import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';

export const perfil = db.define('perfil', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_instagram: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_facebook: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_linkedin: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_github: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    numero_whatsapp: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_resumida: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_detallada: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    profesion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    clientes_felices: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tiempo_experiencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trabajos_completos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    opiniones_recibidas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'perfil'
});

export const experiencia = db.define('experiencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_empresa: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo_empresa: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enlace_empresa: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiempo_inicio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiempo_final: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    puesto_empresa: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    detalle_puesto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    empresa_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    empresa_imagenFormato: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'experiencia'
});

export const habilidades = db.define('habilidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_habilidad: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria_habilidad: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiempo_habilidad: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    experiencia_habilidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre_archivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    formato_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'habilidades'
});

export const servicios = db.define('servicios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_servicio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_servicio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    reactIcon: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'servicios'
});

export const trabajos = db.define('trabajos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    numero_pagina: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    style_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    complejidad_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enlace_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enlace_trabajoResumido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiempo_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    resumen_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    opinion_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    valoracion_trabajo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_archivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    formato_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'trabajos'
});

export const clientes = db.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cliente: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    opinion_cliente: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    valoracion_cliente: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ubicacion_cliente: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_archivo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    formato_imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'clientes'
});