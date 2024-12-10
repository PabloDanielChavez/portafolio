import express from 'express'; // version de imports
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la base de datos

db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Las siguientes lineas son lineas de middleware

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug'); // Por ejemplo este es un middleware de EXPRESS

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Portafolio"
    next();
});

// Agregar body parser para leer los datos del formulario CLASE 427

app.use(express.urlencoded({extended: true}));

// Definir la carpeta PUBLIC
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})