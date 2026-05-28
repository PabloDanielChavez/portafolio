// controllers/apiControllers.js

import { perfil, habilidades, experiencia, servicios, trabajos, clientes, mensajes } from '../models/Portafolio.js';

// 2. Creamos el nuevo controlador para recibir y guardar los datos
export const guardarMensaje = async (req, res) => {
    try {
        // req.body es el "paquete" que te manda el frontend
        const { nombre, correo, mensaje } = req.body;
        
        // Captura de metadatos
        const clientIp = requestIp.getClientIp(req); 
        const agent = useragent.parse(req.headers['user-agent']);

        // Guardamos en la base de datos usando Sequelize
        const nuevoMensaje = await mensajes.create({
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            metadata: {
                fecha: new Date().toISOString(),
                navegador: agent.toAgent(),
                sistema_operativo: agent.os.toString(),
                dispositivo: agent.device.toString()
            },
            origen_url: window.location.href
        });

        // Le respondemos al frontend que todo salió de 10
        res.status(201).json({ 
            mensaje: '¡Mensaje guardado con éxito!', 
            id: nuevoMensaje.id 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el mensaje en la base de datos.' });
    }
};
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