import { Router } from "express";
import { updateEventDate } from "../controllers/updateEventDate";

const updateEventDateRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
updateEventDateRouter.get('/updateEventDate/:eventId/:newDate', updateEventDate);

export default updateEventDateRouter;
