import { Router } from "express";
import { createNewUserRating } from "../controllers/createNewRating";

const createNewUserRatingRouter = Router();

createNewUserRatingRouter.post('/createNewUserRating', createNewUserRating);

export default createNewUserRatingRouter;