import { Router } from "express";
import { createEvent } from "../controllers/createEvent";

const eventRouter = Router();

eventRouter.post('/createEvent', createEvent);

export default eventRouter;