import { env } from '../config/env.js';
import db from '../config/db.js';
import { HttpError } from '../errors/HttpError.js';
import {
    clientes,
    exp_desafio,
    exp_tecnologia,
    experiencia,
    habilidades,
    mensajes,
    perfil,
    servicios,
    tra_tecnologia,
    trabajos
} from '../models/Portafolio.js';
import { validateProjectAuditUrl } from '../services/auditSecurityService.js';
import { saveContact } from '../services/contactService.js';

export const createGetAllController = (model) => async (req, res) => {
    const data = await model.findAll();

    res.json(data);
};

export const obtenerPerfil = createGetAllController(perfil);
export const obtenerHabilidades = createGetAllController(habilidades);
export const obtenerExperiencia = createGetAllController(experiencia);
export const obtenerExpDesafio = createGetAllController(exp_desafio);
export const obtenerExpTecnologia = createGetAllController(exp_tecnologia);
export const obtenerServicios = createGetAllController(servicios);
export const obtenerTrabajos = createGetAllController(trabajos);
export const obtenerTraTecnologia = createGetAllController(tra_tecnologia);
export const obtenerClientes = createGetAllController(clientes);

export const createGetWorkBySlugController = (model = trabajos) =>
    async (req, res) => {
        const { slug } = req.validated.params;
        const work = await model.findOne({
            where: { slug }
        });

        if (!work) {
            throw new HttpError(404, 'El trabajo solicitado no existe.');
        }

        res.json(work);
    };

export const obtenerTrabajoPorSlug = createGetWorkBySlugController();

export const guardarMensaje = async (req, res) => {
    const contact = req.validated.body;

    await saveContact(mensajes, contact, {
        requestOrigin: req.get('origin')
    });

    const message = 'Mensaje recibido correctamente.';

    res.status(201).json({
        success: true,
        message,
        mensaje: message
    });
};

export const obtenerSalud = async (req, res) => {
    try {
        await db.authenticate();
    } catch {
        throw new HttpError(503, 'El servicio no está disponible.');
    }

    res.json({
        success: true,
        status: 'ok'
    });
};

const getPageSpeedUrl = (url, strategy) => {
    const query = new URLSearchParams({
        url,
        category: 'performance',
        strategy,
        key: env.pageSpeedApiKey
    });

    for (const category of ['accessibility', 'best-practices', 'seo']) {
        query.append('category', category);
    }

    return `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${query}`;
};

const fetchPageSpeed = async (url, strategy) => {
    try {
        const response = await fetch(getPageSpeedUrl(url, strategy), {
            headers: {
                Accept: 'application/json'
            },
            signal: AbortSignal.timeout(45_000)
        });

        if (!response.ok) {
            throw new HttpError(502, 'No se pudo completar la auditoría.');
        }

        const data = await response.json();

        if (data.error || !data.lighthouseResult?.categories) {
            throw new HttpError(502, 'No se pudo completar la auditoría.');
        }

        return data;
    } catch (error) {
        if (error instanceof HttpError) throw error;

        throw new HttpError(502, 'No se pudo completar la auditoría.');
    }
};

const getAuditMetrics = (data, url, strategy) => {
    const categories = data.lighthouseResult.categories;
    const auditId = data.lighthouseResult.id || 'default';
    const score = (category) =>
        categories[category]
            ? Math.round(categories[category].score * 100)
            : 0;

    return {
        performance: score('performance'),
        accessibility: score('accessibility'),
        practices: score('best-practices'),
        seo: score('seo'),
        link: `https://pagespeed.web.dev/analysis/${encodeURIComponent(
            url
        )}/${encodeURIComponent(auditId)}?form_factor=${strategy}`
    };
};

export const createActualizarAuditoriaPageSpeed = ({
    projectModel = trabajos,
    pageSpeedFetcher = fetchPageSpeed,
    pageSpeedApiKey = env.pageSpeedApiKey,
    allowedHosts = env.auditAllowedHosts,
    isProduction = env.isProduction
} = {}) => async (req, res) => {
    const { id, url } = req.validated.body;
    const project = await projectModel.findByPk(id, {
        attributes: [
            'id',
            'enlace_trabajo',
            'enlace_trabajoResumido'
        ]
    });

    if (!project) {
        throw new HttpError(404, 'El proyecto solicitado no existe.');
    }

    const validatedUrl = validateProjectAuditUrl({
        requestedUrl: url,
        project,
        allowedHosts,
        isProduction
    });

    if (!pageSpeedApiKey) {
        throw new HttpError(503, 'El servicio de auditoría no está disponible.');
    }

    const [mobileData, desktopData] = await Promise.all([
        pageSpeedFetcher(validatedUrl, 'mobile'),
        pageSpeedFetcher(validatedUrl, 'desktop')
    ]);
    const mobile = getAuditMetrics(mobileData, validatedUrl, 'mobile');
    const desktop = getAuditMetrics(desktopData, validatedUrl, 'desktop');

    const [affectedRows] = await projectModel.update(
        {
            performance_mobile: mobile.performance,
            accessibility_mobile: mobile.accessibility,
            practices_mobile: mobile.practices,
            seo_mobile: mobile.seo,
            performance_desktop: desktop.performance,
            accessibility_desktop: desktop.accessibility,
            practices_desktop: desktop.practices,
            seo_desktop: desktop.seo
        },
        {
            where: { id }
        }
    );

    if (!Number.isInteger(affectedRows) || affectedRows < 1) {
        throw new HttpError(
            409,
            'No se pudo actualizar la auditoría del proyecto.'
        );
    }

    res.json({
        success: true,
        mensaje:
            '¡Auditorías Mobile y Desktop sincronizadas en MySQL con éxito!',
        datosActualizados: {
            mobile: {
                perfMobile: mobile.performance,
                accessMobile: mobile.accessibility,
                practicesMobile: mobile.practices,
                seoMobile: mobile.seo,
                linkMobile: mobile.link
            },
            desktop: {
                perfDesktop: desktop.performance,
                accessDesktop: desktop.accessibility,
                practicesDesktop: desktop.practices,
                seoDesktop: desktop.seo,
                linkDesktop: desktop.link
            }
        }
    });
};

export const actualizarAuditoriaPageSpeed =
    createActualizarAuditoriaPageSpeed();
