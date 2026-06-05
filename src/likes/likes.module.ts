import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { LikesPrismaRepository } from "./infrastructure/repositories/likes-prisma.repository";
import { GetLikesUseCase } from "./application/use-cases/get-likes.use-case";

@Module({
  controllers: [LikesController],
  providers: [
    LikesService,
    LikesPrismaRepository,
    {
      provide: "LikesRepository",
      useClass: LikesPrismaRepository,
    },
    {
      provide: GetLikesUseCase,
      useFactory: (repo: LikesPrismaRepository) =>
        new GetLikesUseCase(repo),
      inject: [LikesPrismaRepository],
    },
  ],
})
export class LikesModule {}