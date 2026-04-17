import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const modelOptions = (name) => ({
    timestamps: false,
    freezeTableName: true,
    tableName: name
});

// En lugar de una constante, usamos una función (flecha)
const stringField = () => ({ type: DataTypes.TEXT, allowNull: false });
const intField = () => ({ type: DataTypes.INTEGER, allowNull: false });
const idField = () => ({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true });

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
    empresa_imagenFormato: stringField()
}, modelOptions('experiencia'));

export const habilidades = db.define('habilidades', {
    id: idField(),
    nombre_habilidad: stringField(),
    categoria_habilidad: stringField(),
    tiempo_habilidad: stringField(),
    experiencia_habilidad: intField(),
    nombre_archivo: stringField(),
    nombre_imagen: stringField(),
    formato_imagen: stringField()
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
    categoria_trabajo: stringField(),
    numero_pagina: stringField(),
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
    formato_imagen: stringField()
}, modelOptions('trabajos'));

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