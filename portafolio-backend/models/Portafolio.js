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
const jsonField = () => ({ type: DataTypes.JSON, allowNull: true });

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

// Buscá esta parte dentro de models/Portafolio.js y dejala así:

export const trabajos = db.define('trabajos', {
    id: idField(),
    nombre_trabajo: stringField(),
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

export const tra_tecnologia = db.define('tra_tecnologia', {
    id: idField(),
    tra_id: intField(),
    SASS : intField(),
    Node : intField(),
    Next : intField(),
    React : intField()
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

// Al final de models/Portafolio.js

export const mensajes = db.define('mensajes', {
    id: idField(),
    nombre: stringField(),
    correo: stringField(),
    mensaje: stringField(),
    fecha: stringField(),
    navegador: stringField(),
    sistema_operativo: stringField(),
    dispositivo: stringField(),
    origen_url: stringField()
}, modelOptions('mensajes'));