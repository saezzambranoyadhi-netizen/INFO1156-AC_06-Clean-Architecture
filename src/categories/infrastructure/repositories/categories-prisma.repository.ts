import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma.service";
import { CategoriesRepository } from "../../domain/repositories/categories.repository";
import { Category } from "../../domain/entities/category.entity";

@Injectable()
export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const results = await this.prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return results.map((c) => new Category(c.id, c.name, c.slug));
  }
}