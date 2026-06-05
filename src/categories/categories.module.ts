import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { CategoriesPrismaRepository } from "./infrastructure/repositories/categories-prisma.repository";
import { GetCategoriesUseCase } from "./application/use-cases/get-categories.use-case";

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesPrismaRepository,
    {
      provide: "CategoriesRepository",
      useClass: CategoriesPrismaRepository,
    },
    {
      provide: GetCategoriesUseCase,
      useFactory: (repo: CategoriesPrismaRepository) =>
        new GetCategoriesUseCase(repo),
      inject: [CategoriesPrismaRepository],
    },
  ],
})
export class CategoriesModule {}