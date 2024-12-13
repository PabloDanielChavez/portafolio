import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Verificar que la URL de la base de datos esté definida
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno");
}

// Crear instancia de Sequelize
const db = new Sequelize(process.env.DATABASE_URL, {
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

// Autenticar la conexión y manejar errores
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;
