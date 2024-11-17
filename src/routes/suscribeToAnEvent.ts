import { Router } from "express";
import { subscribeToEvent } from "../controllers/subscribeToAnEvent";

const subscribeToEventRouter = Router();

subscribeToEventRouter.post('/subscribeToEvent', subscribeToEvent);

export default subscribeToEventRouter;