import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/db.js';

export const usuario = db.define('usuario', { 
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recordar: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario'
});