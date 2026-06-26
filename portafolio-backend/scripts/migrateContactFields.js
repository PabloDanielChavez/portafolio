import db from '../config/db.js';
import { addContactFields } from '../migrations/20260626-add-contact-fields.js';

try {
    await db.authenticate();

    const addedColumns = await addContactFields(db.getQueryInterface());

    if (addedColumns.length === 0) {
        console.info('La tabla mensajes ya tiene todas las columnas de contacto.');
    } else {
        console.info(`Columnas agregadas: ${addedColumns.join(', ')}.`);
    }
} catch (error) {
    console.error(
        `No se pudo actualizar la tabla mensajes: ${error.name}`
    );
    process.exitCode = 1;
} finally {
    await db.close();
}
