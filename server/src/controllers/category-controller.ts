
import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepositoryPrisma } from "../repositories/category-repository-prisma.js";
import { CreateCategoryService } from "../services/categories/create-category-service.js";
import { ListCategoriesService } from "../services/categories/list-categories-service.js";
import { GetCategoryService } from "../services/categories/get-category-service.js";
import { UpdateCategoryService } from "../services/categories/update-category-service.js";
import { DeleteCategoryService } from "../services/categories/delete-category-service.js";

export async function createCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { name, icon } = request.body as { name: string; icon?: string | null };

  const repository = new CategoryRepositoryPrisma();
  const service = new CreateCategoryService(repository);
  const category = await service.execute(name, icon);

  return reply.status(201).send(category);
}

export async function listCategoriesController(_: FastifyRequest, reply: FastifyReply) {
  const repository = new CategoryRepositoryPrisma();
  const service = new ListCategoriesService(repository);

  const categories = await service.execute();
  return reply.status(200).send(categories);
}

export async function getCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const repository = new CategoryRepositoryPrisma();
  const service = new GetCategoryService(repository);

  const category = await service.execute(id);
  return reply.status(200).send(category);
}

export async function updateCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, icon } = request.body as { name?: string; icon?: string | null };

  const repository = new CategoryRepositoryPrisma();
  const service = new UpdateCategoryService(repository);

  const updated = await service.execute(id, name, icon);
  return reply.status(200).send(updated);
}

export async function deleteCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const repository = new CategoryRepositoryPrisma();
  const service = new DeleteCategoryService(repository);

  await service.execute(id);
  return reply.status(204).send();
}
