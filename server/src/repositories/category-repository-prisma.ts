import { prisma } from "../database/prisma.js";
import { Category } from "../entities/transaction.js";
import { ICategoryRepository, CreateCategoryDTO } from "./category-interface-repository.js";

export class CategoryRepositoryPrisma implements ICategoryRepository {

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      }
    })

    return category || null;
  }
  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
        }
      }
    })
    return category || null;
  }
  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    return categories;
  }
  async create(category: CreateCategoryDTO): Promise<Category> {
    const newCategory = await prisma.category.create({
      data: {
        name: category.name,
        icon: category.icon ?? null
      }
    })
    // this.categories.push(newCategory);
    return newCategory;
  }

  async update(category: Category): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
        icon: category.icon ?? null
      }
    })
    return updatedCategory;
  }
  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id: id,
      }
    })
  }
}
