import { Router } from "express";
import { getAllCategories } from "../controllers/getAllCategories";

const getAllCategoriesRouter = Router();

getAllCategoriesRouter.get('/getAllCategories', getAllCategories);

export default getAllCategoriesRouter;