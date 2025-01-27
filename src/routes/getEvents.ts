import { Router } from "express";
import { getEvents } from "../controllers/getEvents";

const getEventsRouter = Router();

getEventsRouter.get('/getEvents/:distanceRadius/:userLatitude/:userLongitude', getEvents);

export default getEventsRouter;