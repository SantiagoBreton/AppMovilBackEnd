import { Router } from "express";
import { getEventByPartialName } from "../controllers/getEventByName";

const getEventByPartialNameRouter = Router();

getEventByPartialNameRouter.get('/getEventByPartialName/:currentUserId/:name', getEventByPartialName);

export default getEventByPartialNameRouter;