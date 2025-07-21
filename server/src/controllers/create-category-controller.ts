import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepositoryPrisma } from "../repositories/category-repository-prisma.js";
import { CreateCategoryService } from "../services/categories/create-category-service.js";

export async function createCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { name, icon } = request.body as { name: string; icon?: string | null };
  
  const categoryRepository = new CategoryRepositoryPrisma();
  const createCategoryService = new CreateCategoryService(categoryRepository)
  const category = await createCategoryService.execute(name, icon);
  
  return reply.status(201).send(category);
}
