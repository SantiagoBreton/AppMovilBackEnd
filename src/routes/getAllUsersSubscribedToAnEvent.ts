import { Router } from "express";
import { getAllUsersSubscribedToAnEvent } from "../controllers/getAllUsersSubscribedToAnEvent";

const getAllUsersSubscribedToAnEventRouter = Router();

getAllUsersSubscribedToAnEventRouter.get('/getAllUsersSubscribedToAnEvent/:eventId', getAllUsersSubscribedToAnEvent);

export default getAllUsersSubscribedToAnEventRouter;