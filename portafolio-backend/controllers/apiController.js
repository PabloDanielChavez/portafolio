// controllers/apiController.js

import express from "express";
import { perfil, habilidades, experiencia, servicios, trabajos, clientes } from '../models/Portafolio.js';

export const obtenerPerfil = async (req, res) => {
    try {
        const perfilSalida = await perfil.findAll();

        res.json(perfilSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el perfil.' });
    }
};

export const obtenerHabilidades = async (req, res) => {
    try {
        const habilidadesSalida = await habilidades.findAll();

        res.json(habilidadesSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las habilidades.' });
    }
};

export const obtenerExperiencia = async (req, res) => {
    try {
        const experienciaSalida = await experiencia.findAll();

        res.json(experienciaSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la Experiencia.' });
    }
};

export const obtenerServicios = async (req, res) => {
    try {
        const serviciosSalida = await servicios.findAll();

        res.json(serviciosSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el Servicio.' });
    }
};

export const obtenerTrabajos = async (req, res) => {
    try {
        const trabajosSalida = await trabajos.findAll();

        res.json(trabajosSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el Trabajo.' });
    }
};

export const obtenerClientes = async (req, res) => {
    try {
        const clientesSalida = await clientes.findAll();

        res.json(clientesSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el clientes.' });
    }
};