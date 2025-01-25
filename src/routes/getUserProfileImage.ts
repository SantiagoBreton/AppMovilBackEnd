import { Router } from "express";
import { getUserProfileImage } from "../controllers/getUserProfileImage";

const getUserProfileImageRouter = Router();

getUserProfileImageRouter.get('/getUserProfileImage/:userId', getUserProfileImage);

export default getUserProfileImageRouter;