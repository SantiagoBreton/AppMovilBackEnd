import { Router } from "express";
import { getEventsByUserId } from "../controllers/getEventsByUserId";

const getEventsByUserIdRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
getEventsByUserIdRouter.get('/getEventsByUserId/:userId', getEventsByUserId);

export default getEventsByUserIdRouter;

