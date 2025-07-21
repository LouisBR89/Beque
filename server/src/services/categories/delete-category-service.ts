
import { ICategoryRepository } from "../../repositories/category-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class DeleteCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    await this.categoryRepository.delete(id);
  }
}
