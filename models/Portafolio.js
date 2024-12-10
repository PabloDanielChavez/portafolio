import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';

export const Datos = db.define('datospersonales', {
    fecha_nac: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    sitio_web: {
        type: Sequelize.STRING
    },
    ubicacion: {
        type: Sequelize.STRING
    },
    trabajo: {
        type: Sequelize.STRING
    }
});

export const Habilidad = db.define('habilidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    experiencia: {
        type: Sequelize.STRING
    },
    categoria: {
        type: Sequelize.STRING
    }
});

export const Destacados = db.define('destacados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    nombre_img: {
        type: Sequelize.STRING
    },
    formato_img: {
        type: Sequelize.STRING
    },
    version: {
        type: Sequelize.STRING
    },
    fecha_version: {
        type: Sequelize.STRING
    },
    informacion: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    tableName: 'destacados'
});

export const Servicios = db.define('servicios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    informacion: {
        type: Sequelize.STRING
    },
    informacion_resumida: {
        type: Sequelize.STRING
    },
    paginas: {
        type: Sequelize.STRING
    },
    revision: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.STRING
    },
    descuento: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    tableName: 'servicios'
});

export const Versiones = db.define('versiones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    version: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    informacion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_front_end: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_back_end: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'versiones'
});