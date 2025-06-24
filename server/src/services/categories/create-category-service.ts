import { CategoryInterfaceRepository } from "../../repositories/category-interface-repository.js";

export class CreateCategoryService {
  private categoryRepository: CategoryInterfaceRepository;
  
  constructor(categoryRepository: CategoryInterfaceRepository) {
    this.categoryRepository = categoryRepository;
  }
  
  async execute(name: string, icon?: string | null): Promise<any> {
    if (!name) {
      throw new Error('Name are required');
    }

    // Check if the category with the same name already exists

    const existingCategory = await this.categoryRepository.findByName(name);
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }

    const newCategory = this.categoryRepository.create({name, icon});


    return newCategory;
  }
}
