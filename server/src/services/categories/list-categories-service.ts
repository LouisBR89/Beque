
import { ICategoryRepository } from "../../repositories/category-interface-repository.js";

export class ListCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute() {
    return await this.categoryRepository.findAll();
  }
}
