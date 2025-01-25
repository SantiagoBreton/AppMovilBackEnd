import { Router } from "express";
import { getUserBannerImage } from "../controllers/getUserBannerImage";
const getUserBannerImageRouter = Router();

getUserBannerImageRouter.get('/getUserBannerImage/:userId', getUserBannerImage);

export default getUserBannerImageRouter;