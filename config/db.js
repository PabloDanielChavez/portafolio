import Sequelize from 'sequelize';
import dotenv from 'dotenv'; 

dotenv.config();

console.log('Database URL:', process.env.DATABASE_URL); // Línea de depuración

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definido $env:DATABASE_URL # Para Windows PowerShellida en las variables de entorno");
}

import Sequelize from 'sequelize'
import dotenv from 'dotenv';
dotenv.config()
 
const db = new Sequelize(process.env.DATABASE_URL, {
    define: {
        timestamps: false
    },
    pool:{
        max :5,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});
 
export default db;

// Autenticar la conexión y manejar errores
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;
