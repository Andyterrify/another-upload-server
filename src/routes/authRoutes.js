import { Router } from "express";
import authController from "../controllers/authController";
import checkFormData from "../middleware/checkFormData"

const router = Router()

router.post('/register', checkFormData.register, authController.register)
router.post('/login', authController.login)

export default router