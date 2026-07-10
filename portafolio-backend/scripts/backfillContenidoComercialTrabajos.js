import { pathToFileURL } from 'node:url';

import db from '../config/db.js';
import { contenidoComercialTrabajosBackfill } from '../constants/workCommercialContentBackfill.js';
import {
    trabajo_commercial_content,
    trabajos
} from '../models/Portafolio.js';
import {
    analizarBackfillContenidoComercial,
    formatearReporteBackfill,
    parsearArgumentosBackfill
} from '../services/workCommercialContentBackfillService.js';

const leerDatosDesdeDb = async () => {
    const trabajosDb = await trabajos.findAll({
        attributes: ['id', 'slug', 'nombre_trabajo'],
        raw: true,
        order: [['id', 'ASC']]
    });
    const advertencias = [];
    let filasComercialesExistentes = [];

    try {
        filasComercialesExistentes = await trabajo_commercial_content.findAll({
            attributes: ['id', 'trabajo_id', 'slug_snapshot'],
            raw: true
        });
    } catch (error) {
        advertencias.push(
            `No se pudo leer ${trabajo_commercial_content.getTableName()}; se asume sin filas existentes para dry-run. Detalle: ${error.message}`
        );
    }

    return { trabajosDb, filasComercialesExistentes, advertencias };
};

const ejecutarEscritura = async ({ reporte, sobrescribir }) =>
    db.transaction(async (transaccion) => {
        if (reporte.filasCrear.length > 0) {
            await trabajo_commercial_content.bulkCreate(reporte.filasCrear, {
                transaction: transaccion
            });
        }

        if (sobrescribir) {
            for (const fila of reporte.filasActualizar) {
                await trabajo_commercial_content.update(fila, {
                    where: { trabajo_id: fila.trabajo_id },
                    transaction: transaccion
                });
            }
        }
    });

export const ejecutarBackfillContenidoComercial = async ({
    argumentos = process.argv.slice(2),
    contenidoFuente = contenidoComercialTrabajosBackfill,
    lectorDatos = leerDatosDesdeDb
} = {}) => {
    const opciones = parsearArgumentosBackfill(argumentos);
    const {
        trabajosDb,
        filasComercialesExistentes,
        advertencias = []
    } = await lectorDatos();
    const reporte = analizarBackfillContenidoComercial({
        trabajosDb,
        filasComercialesExistentes,
        contenidoFuente,
        opciones,
        advertencias
    });

    if (!reporte.ok) {
        return reporte;
    }

    if (opciones.aplicar) {
        await ejecutarEscritura({
            reporte,
            sobrescribir: opciones.sobrescribir
        });
    }

    return reporte;
};

const esEjecucionDirecta =
    process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (esEjecucionDirecta) {
    try {
        const argumentos = process.argv.slice(2);
        const opciones = parsearArgumentosBackfill(argumentos);
        const reporte = await ejecutarBackfillContenidoComercial({ argumentos });

        if (opciones.json) {
            console.info(JSON.stringify(reporte, null, 2));
        } else {
            console.info(formatearReporteBackfill(reporte));
        }

        if (!reporte.ok) {
            process.exitCode = 1;
        }
    } catch (error) {
        console.error(`No se pudo analizar el backfill comercial: ${error.message}`);
        process.exitCode = 1;
    } finally {
        await db.close();
    }
}
