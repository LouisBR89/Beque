
import { FastifyInstance } from "fastify";
import {
  createCategoryController,
  listCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController
} from "../controllers/category-controller.js";

export default async function (app: FastifyInstance) {
  app.post('/categories', createCategoryController);
  app.get('/categories', listCategoriesController);
  app.get('/categories/:id', getCategoryController);
  app.patch('/categories/:id', updateCategoryController);
  app.delete('/categories/:id', deleteCategoryController);
}
