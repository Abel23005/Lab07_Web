import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signUp', AuthController.signUp.bind(AuthController));
router.post('/signIn', AuthController.signIn.bind(AuthController));

export default router;
