import { Router } from "express";
import { confirmSubscriptionToAnEvent } from "../controllers/confirmSubscriptionToAnEvent";

const confirmSubscriptionToAnEventRouter = Router();

confirmSubscriptionToAnEventRouter.post('/confirmSubscriptionToAnEvent', confirmSubscriptionToAnEvent);

export default confirmSubscriptionToAnEventRouter;