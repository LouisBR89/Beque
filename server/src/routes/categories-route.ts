import { FastifyInstance } from "fastify";
import { CreateCategoryService } from "../services/categories/create-category-service.js";
import { CategoryRepositoryInMemory } from "../repositories/category-repository-in-memory.js";

export async function categoriesRoutes(fastify: FastifyInstance, opts: any) {
  const categoryRepository = opts.categoryRepository;
  const createCategoryService = new CreateCategoryService(categoryRepository);

  fastify.post('/categories', async (request, reply) => {
    const { name, icon } = request.body as { name: string, icon?: string | null };
    const category = await createCategoryService.execute(name, icon);
    return reply.send(category);
  });

  fastify.get('/categories', async (request, reply) => {
    const categories = await categoryRepository.findAll();
    return reply.send(categories);
  });

  fastify.get('/categories/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const category = await categoryRepository.findById(id);
    return reply.send(category);
  });

  fastify.patch('/categories/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, icon } = request.body as { name?: string, icon?: string | null };
    const category = await categoryRepository.findById(id);
    if (!category) return reply.status(404).send({ error: 'Category not found' });

    if (name) category.name = name;
    if (icon !== undefined) category.icon = icon;

    await categoryRepository.update(category);
    return reply.send(category);
  });

  fastify.delete('/categories/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await categoryRepository.delete(id);
    return reply.status(204).send();
  });
}