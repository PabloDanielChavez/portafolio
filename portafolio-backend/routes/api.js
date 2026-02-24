import express from 'express';
import { obtenerPaginas } from '../controllers/apiController.js';
const router = express.Router();

router.get('/api/paginas', obtenerPaginas);

export default router;