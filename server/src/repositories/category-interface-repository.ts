import { Category } from "../entities/transaction.js";

export type CreateCategoryDTO = {
  icon?: string | null;
  name: string;
}
export interface CategoryInterfaceRepository {
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(category: CreateCategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}
