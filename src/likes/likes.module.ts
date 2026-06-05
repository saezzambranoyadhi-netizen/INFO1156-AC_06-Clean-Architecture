import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { LikesPrismaRepository } from "./infrastructure/repositories/likes-prisma.repository";
import { GetLikesUseCase } from "./application/use-cases/get-likes.use-case";
import { CreateLikeUseCase } from "./application/use-cases/create-like.use-case";
import { PostsModule } from "../posts/posts.module";
import { PostsService } from "../posts/posts.service";

@Module({
  imports: [PostsModule],
  controllers: [LikesController],
  providers: [
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
    {
      provide: CreateLikeUseCase,
      useFactory: (
        repo: LikesPrismaRepository,
        postsService: PostsService,
      ) =>
        new CreateLikeUseCase(repo, async (postId) => {
          const post = await postsService.findById(postId);
          return !!post;
        }),
      inject: [LikesPrismaRepository, PostsService],
    },
    {
      provide: LikesService,
      useFactory: (
        getUseCase: GetLikesUseCase,
        createUseCase: CreateLikeUseCase,
      ) => new LikesService(getUseCase, createUseCase),
      inject: [GetLikesUseCase, CreateLikeUseCase],
    },
  ],
})
export class LikesModule {}