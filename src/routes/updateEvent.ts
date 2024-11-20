import { Router } from "express";
import { updateEvent } from "../controllers/updateEvent";

const updateEventRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
updateEventRouter.get('/updateEvent/:eventId/:newName/:newDescription/:newDate', updateEvent);

export default updateEventRouter;
