import { Router } from "express";
import { getPendingRequestedEvents } from "../controllers/getPendingRequestedEvents";

const getPendingRequestedEventsRouter = Router();

getPendingRequestedEventsRouter.get('/getPendingRequestedEvents/:userId', getPendingRequestedEvents);

export default getPendingRequestedEventsRouter;