import { FastifyInstance } from 'fastify';
import {
  createCategoryController,
  listCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController
} from '../controllers/category-controller.js';

export async function categoriesRoutes(fastify: FastifyInstance) {
  fastify.post('/categories', createCategoryController);
  fastify.get('/categories', listCategoriesController);
  fastify.get('/categories/:id', getCategoryController);
  fastify.patch('/categories/:id', updateCategoryController);
  fastify.delete('/categories/:id', deleteCategoryController);
}
