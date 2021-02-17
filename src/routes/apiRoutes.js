import { Router } from "express";
import multer, { diskStorage } from 'multer';

import uploadController from '../controllers/uploadController'

const router = Router()
const multerStorage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now())
    }
})
const upload = multer({ storage: multerStorage })

router.get('/', uploadController.newFile)
router.get('/file/get', uploadController.getFile)
router.post('/file/new', upload.single('image'), uploadController.newFile)

export default router