import { Router } from 'express';
import authController from '../controllers/authController';
import checkFormData from '../middleware/checkFormData';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post('/register', checkFormData.register, authController.register);
router.post('/login', checkFormData.login, authController.login);
router.post('/refresh', verifyToken.refresh, authController.refresh);
// router.post('/refresh', authController.refresh);
router.delete('/logout', verifyToken.refresh, authController.logout);
// Only to test
router.post('/verify', verifyToken.refresh, authController.verify);

export default router;
