import { Router } from "express";
import { getSubscribedEvents } from "../controllers/getSubscribedEvents";

const getSubscribedEventsRouter = Router();

getSubscribedEventsRouter.get('/getSubscribedEvents/:userId', getSubscribedEvents);

export default getSubscribedEventsRouter;