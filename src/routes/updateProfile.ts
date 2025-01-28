import { Router } from "express";
import { updateProfile } from "../controllers/updateProfile";

const updateProfileRouter = Router();

// Definir la ruta para obtener los eventos de un usuario por su userId
updateProfileRouter.get('/updateProfile', updateProfile);

export default updateProfileRouter;
