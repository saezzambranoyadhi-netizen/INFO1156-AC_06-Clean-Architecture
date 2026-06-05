import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Category } from "./domain/entities/category.entity";

@Controller("api/categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}