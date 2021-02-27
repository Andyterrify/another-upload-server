import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import userController from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

import uploadController from '../controllers/uploadController';
import shortUrlController from '../controllers/shortUrlController';

// import uploadController from '../controllers/uploadController'

const router = Router();
const multerStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now());
  },
});
const upload = multer({ storage: multerStorage });

router.get('/', uploadController.newFile);
router.get('/file/get', uploadController.getFile);
router.post('/file/new', upload.single('image'), uploadController.newFile);

router.post('/short-urls', shortUrlController.create);
router.patch('/short-urls', shortUrlController.update);
router.delete('/short-urls', shortUrlController.delete);

// These routes will use the decoded JWT to access the correct user
router.get('/user', userController.retrieve);
router.patch('/user', userController.update);
router.delete('/user', userController.delete);

export default router;
