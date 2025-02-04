import { Router } from 'express';
import { upload, uploadUserProfileImage } from '../controllers/uploadUserProfileImage';

const uploadUserProfileImageRouter = Router();

uploadUserProfileImageRouter.use('/uploads', (req, res, next) => {
  console.log('Serving static files from /uploads');
  next();
});
uploadUserProfileImageRouter.use('/uploads', require('express').static('uploads'));

uploadUserProfileImageRouter.post('/uploadUserImage', upload.single('file'), (req, res, next) => {
  uploadUserProfileImage(req, res).catch(next);
});

export default uploadUserProfileImageRouter;
