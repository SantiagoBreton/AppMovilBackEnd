import { Router } from "express";
import { denySubscriptionToAnEvent } from "../controllers/denySubscriptionToAnEvent";

const denySubscriptionToAnEventRouter = Router();

denySubscriptionToAnEventRouter.delete('/denySubscriptionToAnEvent/:eventId/:userId', denySubscriptionToAnEvent);

export default denySubscriptionToAnEventRouter;