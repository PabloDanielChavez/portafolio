import express from 'express';
import { loginUsuario, registroUsuario/*, adminPost*/ } from '../controllers/authController.js';
const router = express.Router();

// router.post('/authRoutes/register', registroUsuario);
// router.post('/authRoutes/login', loginUsuario);
/*router.post('/authRoutes/admin', adminPost);*/

export default router;