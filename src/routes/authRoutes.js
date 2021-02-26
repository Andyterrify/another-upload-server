import { Router } from 'express';
import authController from '../controllers/authController';
import checkFormData from '../middleware/checkFormData';
import verifyJWT from '../middleware/verifyJWT';

const router = Router();

// router.post('/register', checkFormData.register, authController.register);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/token', authController.refresh);
router.delete('/logout', authController.logout);
// Only to test
router.post('/verify', verifyJWT, authController.verify);

export default router;
