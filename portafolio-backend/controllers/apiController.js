// controllers/apiControllers.js
import requestIp from 'request-ip';
import useragent from 'useragent';
import { perfil, habilidades, experiencia, exp_desafio, exp_tecnologia, servicios, trabajos, tra_tecnologia, clientes, mensajes } from '../models/Portafolio.js';

export const guardarMensaje = async (req, res) => {
    try {
        const { nombre, correo, mensaje, origen_url } = req.body;
        const agent = useragent.parse(req.headers['user-agent']);

        const nuevoMensaje = await mensajes.create({
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            navegador: agent.toAgent(),
            fecha: new Date().toISOString(), 
            sistema_operativo: agent.os.toString(),
            dispositivo: agent.device.toString(),
            origen_url: origen_url
        });

        res.status(201).json({ mensaje: '¡Mensaje guardado!', id: nuevoMensaje.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el mensaje.' });
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

export const obtenerExpDesafio = async (req, res) => {
    try {
        const expDesafioSalida = await exp_desafio.findAll();
        res.json(expDesafioSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los Desafíos de Experiencia.' });
    }
};

export const obtenerExpTecnologia = async (req, res) => {
    try {
        const expTecnologiaSalida = await exp_tecnologia.findAll();
        res.json(expTecnologiaSalida);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los Desafíos de Experiencia.' });
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

export const obtenerTraTecnologia = async (req, res) => {
    try {
        const traTecSalida = await tra_tecnologia.findAll();

        res.json(traTecSalida);
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

export const actualizarAuditoriaPageSpeed = async (req, res) => {
    try {
        const { id, url } = req.body;

        if (!id || !url) {
            return res.status(400).json({ mensaje: 'Faltan parámetros: id y url son obligatorios.' });
        }

        const apiKey = process.env.PAGESPEED_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ mensaje: 'Falta la configuración de PAGESPEED_API_KEY en el servidor.' });
        }

        const urlMobile = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile&key=${apiKey}`;
        const urlDesktop = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=desktop&key=${apiKey}`;

        const [resMobile, resDesktop] = await Promise.all([
            fetch(urlMobile),
            fetch(urlDesktop)
        ]);

        const dataMobile = await resMobile.json();
        const dataDesktop = await resDesktop.json();

        if (dataMobile.error || dataDesktop.error) {
            return res.status(400).json({ 
                mensaje: 'Error al consultar PageSpeed en Google.', 
                error: dataMobile.error?.message || dataDesktop.error?.message 
            });
        }

        const catMobile = dataMobile.lighthouseResult?.categories || {};
        const idMobile = dataMobile.lighthouseResult?.id || 'default';
        
        const perfMobile = catMobile['performance'] ? Math.round(catMobile['performance'].score * 100) : 0;
        const accessMobile = catMobile['accessibility'] ? Math.round(catMobile['accessibility'].score * 100) : 0;
        const practicesMobile = catMobile['best-practices'] ? Math.round(catMobile['best-practices'].score * 100) : 0;
        const seoMobile = catMobile['seo'] ? Math.round(catMobile['seo'].score * 100) : 0;
        const linkMobile = `https://pagespeed.web.dev/analysis/${encodeURIComponent(url)}/${idMobile}?form_factor=mobile`;

        // --- PROCESAMIENTO SEGURO DESKTOP ---
        const catDesktop = dataDesktop.lighthouseResult?.categories || {};
        const idDesktop = dataDesktop.lighthouseResult?.id || 'default';

        const perfDesktop = catDesktop['performance'] ? Math.round(catDesktop['performance'].score * 100) : 0;
        const accessDesktop = catDesktop['accessibility'] ? Math.round(catDesktop['accessibility'].score * 100) : 0;
        const practicesDesktop = catDesktop['best-practices'] ? Math.round(catDesktop['best-practices'].score * 100) : 0;
        const seoDesktop = catDesktop['seo'] ? Math.round(catDesktop['seo'].score * 100) : 0;
        const linkDesktop = `https://pagespeed.web.dev/analysis/${encodeURIComponent(url)}/${idDesktop}?form_factor=desktop`;

        await trabajos.update({
            performance_mobile: perfMobile,
            accessibility_mobile: accessMobile,
            practices_mobile: practicesMobile,
            seo_mobile: seoMobile,
            enlace_auditoria_mobile: linkMobile,

            performance_desktop: perfDesktop,
            accessibility_desktop: accessDesktop, 
            practices_desktop: practicesDesktop,
            seo_desktop: seoDesktop,
            enlace_auditoria_desktop: linkDesktop
        }, {
            where: { id: id }
        });

        res.json({
            mensaje: '¡Auditorías Mobile y Desktop sincronizadas en MySQL con éxito!',
            datosActualizados: {
                mobile: { perfMobile, accessMobile, practicesMobile, seoMobile, linkMobile },
                desktop: { perfDesktop, accessDesktop, practicesDesktop, seoDesktop, linkDesktop }
            }
        });

    } catch (error) {
        console.error("Error en auditoría combinada:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor al procesar la auditoría doble.' });
    }
};