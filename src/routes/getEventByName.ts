import { Router } from "express";
import { getEventByPartialName } from "../controllers/getEventByName";

const getEventByPartialNameRouter = Router();

getEventByPartialNameRouter.get('/getEventByPartialName/:name', getEventByPartialName);

export default getEventByPartialNameRouter;