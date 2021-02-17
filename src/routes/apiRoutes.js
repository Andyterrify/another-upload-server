import { Router } from "express";
import multer, { diskStorage } from 'multer';
import userController from "../controllers/userController";
import verifyToken from '../middleware/verifyToken'

import uploadController from '../controllers/uploadController'
import shortUrlController from '../controllers/shortUrlController'

// import uploadController from '../controllers/uploadController'

const router = Router()
<<<<<<< HEAD

/**
 * This middleware is going to be checking for a valid token - you will need to comment it out until tokengen is sorted.
 * In ANY of the controllers referenced here, you'll be able to use `req.decoded` to access the token (this is so we can verify
 * whether it's a user token or a services token) 
 */
router.use(verifyToken)

// const multerStorage = diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now())
//     }
// })
// const upload = multer({ storage: multerStorage })

const storage = multer.diskStorage({
=======
const multerStorage = diskStorage({
>>>>>>> fba26c77f40057ed6fd477bcc57b458833a1a0d0
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

router.post('/short-urls')

//These routes will use the decoded JWT to access the correct user
router.get('/user', userController.retrieve)
router.patch('/user', userController.update)
router.delete('/user', userController.delete)

export default router