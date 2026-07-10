import { pathToFileURL } from 'node:url';

import db from '../config/db.js';
import { env } from '../config/env.js';
import {
    trabajo_commercial_content,
    trabajos
} from '../models/Portafolio.js';
import { obtenerTrabajosProduccion } from '../services/workProductionApiClient.js';
import {
    analizarSincronizacionTrabajosProduccion,
    aplicarPlanSincronizacionTrabajos,
    CAMPOS_TRABAJO_SINCRONIZABLES,
    formatearReporteSincronizacionTrabajos,
    parsearArgumentosSincronizacionProduccion
} from '../services/workProductionSyncService.js';

const leerTrabajosLocales = async () =>
    trabajos.findAll({
        attributes: ['id', ...CAMPOS_TRABAJO_SINCRONIZABLES],
        raw: true,
        order: [['id', 'ASC']]
    });

const leerContenidoComercialLocal = async () =>
    trabajo_commercial_content.findAll({
        raw: true,
        order: [['trabajo_id', 'ASC']]
    });

export const ejecutarSincronizacionTrabajosDesdeProduccion = async ({
    argumentos = process.argv.slice(2),
    clienteProduccion = obtenerTrabajosProduccion,
    lectorTrabajosLocales = leerTrabajosLocales,
    lectorContenidoComercialLocal = leerContenidoComercialLocal
} = {}) => {
    const opciones = parsearArgumentosSincronizacionProduccion(argumentos);
    const [trabajosProduccion, trabajosLocales, contenidoComercialLocal] =
        await Promise.all([
            clienteProduccion(),
            lectorTrabajosLocales(),
            lectorContenidoComercialLocal()
        ]);
    const reporte = analizarSincronizacionTrabajosProduccion({
        trabajosProduccion,
        trabajosLocales,
        contenidoComercialLocal,
        opciones,
        destino: {
            entorno: env,
            dbConfig: env.db
        }
    });

    if (!reporte.ok || !opciones.aplicar) {
        return reporte;
    }

    const resultadoEscritura = await db.transaction((transaccion) =>
        aplicarPlanSincronizacionTrabajos({
            reporte,
            modelos: {
                trabajos,
                trabajo_commercial_content
            },
            transaccion
        })
    );

    return {
        ...reporte,
        resultadoEscritura
    };
};

const esEjecucionDirecta =
    process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (esEjecucionDirecta) {
    try {
        const argumentos = process.argv.slice(2);
        const opciones = parsearArgumentosSincronizacionProduccion(argumentos);
        const reporte = await ejecutarSincronizacionTrabajosDesdeProduccion({
            argumentos
        });

        if (opciones.json) {
            console.info(JSON.stringify(reporte, null, 2));
        } else {
            console.info(formatearReporteSincronizacionTrabajos(reporte));
        }

        if (!reporte.ok) {
            process.exitCode = 1;
        }
    } catch (error) {
        console.error(
            `No se pudo sincronizar trabajos desde produccion: ${error.message}`
        );
        process.exitCode = 1;
    } finally {
        await db.close();
    }
}
