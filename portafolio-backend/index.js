import app from './app.js';
import db from './config/db.js';
import { env } from './config/env.js';

let server;
let isShuttingDown = false;

const logError = (message, error) => {
    if (env.isProduction) {
        console.error(`${message}: ${error.name}`);
        return;
    }

    console.error(message, error);
};

const startServer = async () => {
    try {
        await db.authenticate();
        console.info('Conexión a la base de datos verificada.');

        server = app.listen(env.port, () => {
            console.info(`Servidor iniciado en el puerto ${env.port}.`);
        });
    } catch (error) {
        logError('No se pudo iniciar el servidor', error);
        await db.close().catch(() => {});
        process.exitCode = 1;
    }
};

const shutdown = async (signal) => {
    if (isShuttingDown) return;

    isShuttingDown = true;
    console.info(`Señal ${signal} recibida. Cerrando el servidor...`);

    const forceShutdownTimer = setTimeout(() => {
        console.error('El cierre ordenado superó el tiempo permitido.');
        process.exit(1);
    }, 10_000);
    forceShutdownTimer.unref();

    try {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) reject(error);
                    else resolve();
                });
            });
        }

        await db.close();
        clearTimeout(forceShutdownTimer);
        process.exit(0);
    } catch (error) {
        logError('Error durante el cierre', error);
        clearTimeout(forceShutdownTimer);
        process.exit(1);
    }
};

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

startServer();
