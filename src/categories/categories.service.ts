import { Injectable } from "@nestjs/common";
import { GetCategoriesUseCase } from "./application/use-cases/get-categories.use-case";
import { Category } from "./domain/entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(private readonly getCategoriesUseCase: GetCategoriesUseCase) {}

  async findAll(): Promise<Category[]> {
    return this.getCategoriesUseCase.execute();
  }
}
