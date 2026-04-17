import express from 'express';
import cors from 'cors'; 
import router from './routes/api.js';

import db from './config/db.js';

const app = express();

//  Permitir CORS desde localhost:3000 (React)
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://portafolio-ajb1.onrender.com'
    ], // React
    credentials: true
}));

// Base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

app.use('/', router);

// Puerto
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`El servidor está funcionando en http://localhost:${port}`);
});

