import { Router } from "express";
import { getEvents } from "../controllers/getEvents";

const getEventsRouter = Router();

getEventsRouter.get('/getEvents', getEvents);

export default getEventsRouter;