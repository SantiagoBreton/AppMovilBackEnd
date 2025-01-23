import { Router } from "express";
import { getAllRequestingUsersToAnEvent } from "../controllers/getAllRequestingUsersToAnEvent";

const getAllRequestingUsersToAnEventRouter = Router();

getAllRequestingUsersToAnEventRouter.get('/getAllRequestingUsersToAnEvent/:eventId', getAllRequestingUsersToAnEvent);

export default getAllRequestingUsersToAnEventRouter;