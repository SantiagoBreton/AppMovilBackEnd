import { Router } from 'express';
import { upload, uploadUserBanner } from '../controllers/uploadUserBanner';

const uploadUserBannerRouter = Router();

// Serve uploaded files statically
uploadUserBannerRouter.use('/uploads', (req, res, next) => {
  console.log('Serving static files from /uploads');
  next();
});
uploadUserBannerRouter.use('/uploads', require('express').static('uploads'));

// Define the route for file uploads
uploadUserBannerRouter.post('/uploadUserBanner', upload.single('file'), (req, res, next) => {
    uploadUserBanner(req, res).catch(next);
});

export default uploadUserBannerRouter;
