import { Category } from "../entities/category.entity";

export interface CategoriesRepository {
  findAll(): Promise<Category[]>;
}