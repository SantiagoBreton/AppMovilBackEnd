import { Router } from "express";
import { userLogin } from "../controllers/userLogin";

const userLoginRouter = Router();

userLoginRouter.post('/userLogin', userLogin);

export default userLoginRouter;