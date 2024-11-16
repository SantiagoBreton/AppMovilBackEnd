import { Router } from "express";
import { deleteEventById } from "../controllers/deleteEventById";

const deleteEventByIdRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
deleteEventByIdRouter.delete('/deleteEventById/:eventId', deleteEventById);

export default deleteEventByIdRouter;
