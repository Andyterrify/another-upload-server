import { Router } from "express";
import multer, { diskStorage } from 'multer';
import userController from "../controllers/userController";
import verifyToken from '../middleware/verifyToken'

// import uploadController from '../controllers/uploadController'

const router = Router()

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
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Data.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload2 = multer({ storage: storage, fileFilter: fileFilter });

// router.get('/', exampleController.newFile)
// router.get('/file/get', uploadController.getFile)
// router.post('/file/new', upload.single('image'), uploadController.newFile)

router.post('/upload', upload2.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploaded successfully'
        });
    } catch (error) {
        console.log(error);
    }
});

//These routes will use the decoded JWT to access the correct user
router.get('/user', userController.retrieve)
router.patch('/user', userController.update)
router.delete('/user', userController.delete)

export default router