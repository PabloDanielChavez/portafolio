import Sequelize from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config();

console.log('Database URL:', process.env.DATABASE_URL); // Línea de depuración

// if (!process.env.DATABASE_URL) {
//     throw new Error("DATABASE_URL no está definido $env:DATABASE_URL # Para Windows PowerShellida en las variables de entorno");
// }

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
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
