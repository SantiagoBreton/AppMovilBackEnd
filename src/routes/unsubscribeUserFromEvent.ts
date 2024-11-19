import { Router } from "express";
import { unsubscribeUserFromEvent } from "../controllers/unsubscribeUserFromEvent";

const unsubscribeUserFromEventRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
unsubscribeUserFromEventRouter.delete('/unsubscribeUserFromEvent/:userId/:eventId', unsubscribeUserFromEvent);

export default unsubscribeUserFromEventRouter;
