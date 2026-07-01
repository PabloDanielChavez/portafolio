import db from '../config/db.js';
import { addWorkSlugs } from '../migrations/20260701-add-work-slugs.js';

try {
    await db.authenticate();

    const result = await addWorkSlugs(db.getQueryInterface());

    console.info(
        [
            result.columnAdded
                ? 'Columna slug agregada'
                : 'Columna slug ya existente',
            result.updatedIds.length > 0
                ? `IDs actualizados: ${result.updatedIds.join(', ')}`
                : 'Backfill ya aplicado',
            result.indexAdded
                ? 'Índice único agregado'
                : 'Índice único ya existente',
            result.columnChanged
                ? 'Columna slug configurada como obligatoria'
                : 'Columna slug ya era obligatoria'
        ].join('. ') + '.'
    );
} catch (error) {
    console.error(
        `No se pudo migrar los slugs de trabajos: ${error.message}`
    );
    process.exitCode = 1;
} finally {
    await db.close();
}
