
import { ICategoryRepository } from "../../repositories/category-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class UpdateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string, name: string, icon?: string | null) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    category.name = name ?? category.name;
    category.icon = icon ?? category.icon;
    return await this.categoryRepository.update(category);
  }
}
