import { CategoriesRepository } from "../../domain/repositories/categories.repository";
import { Category } from "../../domain/entities/category.entity";

export class GetCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }
}