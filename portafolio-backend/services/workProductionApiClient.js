const URL_PRODUCCION_POR_DEFECTO =
    'https://portafolio-backend-rvor.onrender.com/api';

const normalizarBaseUrl = (baseUrl) => {
    const valor = String(baseUrl ?? URL_PRODUCCION_POR_DEFECTO).trim();

    if (!valor) {
        throw new Error('La URL base de produccion no puede estar vacia.');
    }

    return valor.replace(/\/+$/, '');
};

const crearUrlApi = (baseUrl, ruta) => `${normalizarBaseUrl(baseUrl)}${ruta}`;

const obtenerJson = async ({ url, fetcher = fetch, timeoutMs = 60_000 }) => {
    let respuesta;

    try {
        respuesta = await fetcher(url, {
            headers: {
                Accept: 'application/json'
            },
            signal: AbortSignal.timeout(timeoutMs)
        });
    } catch (error) {
        throw new Error(`No se pudo consultar produccion: ${error.message}`);
    }

    if (!respuesta?.ok) {
        throw new Error(
            `Produccion respondio ${respuesta?.status ?? 'sin estado'} para ${url}`
        );
    }

    try {
        return await respuesta.json();
    } catch (error) {
        throw new Error(`Produccion no devolvio JSON valido: ${error.message}`);
    }
};

export const obtenerTrabajosProduccion = async ({
    baseUrl = URL_PRODUCCION_POR_DEFECTO,
    fetcher = fetch,
    timeoutMs
} = {}) => {
    const datos = await obtenerJson({
        url: crearUrlApi(baseUrl, '/trabajos'),
        fetcher,
        timeoutMs
    });

    if (!Array.isArray(datos)) {
        throw new Error('GET /api/trabajos de produccion no devolvio un array.');
    }

    return datos;
};

export const obtenerTrabajoProduccionPorSlug = async ({
    slug,
    baseUrl = URL_PRODUCCION_POR_DEFECTO,
    fetcher = fetch,
    timeoutMs
} = {}) => {
    if (typeof slug !== 'string' || slug.trim().length === 0) {
        throw new Error('El slug de produccion es obligatorio.');
    }

    return obtenerJson({
        url: crearUrlApi(baseUrl, `/trabajos/${encodeURIComponent(slug)}`),
        fetcher,
        timeoutMs
    });
};

export const URL_PRODUCCION_TRABAJOS = URL_PRODUCCION_POR_DEFECTO;
