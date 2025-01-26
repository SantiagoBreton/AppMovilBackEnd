import { Router } from "express";
import { getHostInfoByEventId } from "../controllers/getHostInfoByEventId";

const getHostInfoByEventIdRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
getHostInfoByEventIdRouter.get('/getHostInfoByEventId/:eventId', getHostInfoByEventId);

export default getHostInfoByEventIdRouter;