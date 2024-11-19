import { Router } from "express";
import { getUserByPartialName } from "../controllers/getUserByName";

const getUserByPartialNameRouter = Router();

getUserByPartialNameRouter.get('/getUserByPartialName/:name', getUserByPartialName);

export default getUserByPartialNameRouter;