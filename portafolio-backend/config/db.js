import { Sequelize } from 'sequelize';

import { env } from './env.js';

const db = new Sequelize(env.db.name, env.db.user, env.db.password, {
    host: env.db.host,
    port: env.db.port,
    dialect: 'mysql',
    logging:
        !env.isProduction && env.db.logging
            ? (message) => console.debug(message)
            : false,
    define: {
        timestamps: false
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    ...(env.db.ssl
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: env.db.sslRejectUnauthorized
                }
            }
        }
        : {})
});

export default db;
