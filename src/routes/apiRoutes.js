import { Router } from "express";
import multer, { diskStorage } from 'multer';

import shortUrlController from '../controllers/shortUrlController'

// import uploadController from '../controllers/uploadController'

const router = Router()
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

router.post('/short-urls')

export default router