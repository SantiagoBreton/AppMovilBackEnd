import { Router } from "express";
import { getUserRating } from "../controllers/getUserRating";

const getUserRatingRouter = Router();

getUserRatingRouter.get('/getUserRating/:userId', getUserRating);

export default getUserRatingRouter;