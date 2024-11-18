import { Router } from "express";
import { getUserData } from "../controllers/getUserData";

const userDataRouter = Router();

userDataRouter.get('/getUserData/:userId', getUserData);

export default userDataRouter;