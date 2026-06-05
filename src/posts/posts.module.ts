import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { PostsPrismaRepository } from "./infrastructure/repositories/posts-prisma.repository";
import { CreatePostUseCase } from "./application/use-cases/create-post.use-case";
import { GetPostsUseCase } from "./application/use-cases/get-posts.use-case";
import { GetPostByIdUseCase } from "./application/use-cases/get-post-by-id.use-case";
import { GetFeedUseCase } from "./application/use-cases/get-feed.use-case";
import { FeedRankingStrategyFactory } from "./domain/strategies/feed-ranking.strategy";
import { ModerationModule } from "../moderation/moderation.module";
import { ModerationService } from "../moderation/moderation.service";

@Module({
  imports: [ModerationModule],
  controllers: [PostsController],
  providers: [
    PostsPrismaRepository,
    FeedRankingStrategyFactory,
    {
      provide: "PostsRepository",
      useClass: PostsPrismaRepository,
    },
    {
      provide: CreatePostUseCase,
      useFactory: (
        repo: PostsPrismaRepository,
        moderationService: ModerationService,
      ) =>
        new CreatePostUseCase(repo, (text) =>
          moderationService.moderate(text),
        ),
      inject: [PostsPrismaRepository, ModerationService],
    },
    {
      provide: GetPostsUseCase,
      useFactory: (repo: PostsPrismaRepository) => new GetPostsUseCase(repo),
      inject: [PostsPrismaRepository],
    },
    {
      provide: GetPostByIdUseCase,
      useFactory: (repo: PostsPrismaRepository) =>
        new GetPostByIdUseCase(repo),
      inject: [PostsPrismaRepository],
    },
    {
      provide: GetFeedUseCase,
      useFactory: (
        repo: PostsPrismaRepository,
        factory: FeedRankingStrategyFactory,
      ) => new GetFeedUseCase(repo, factory),
      inject: [PostsPrismaRepository, FeedRankingStrategyFactory],
    },
    {
      provide: PostsService,
      useFactory: (
        createUseCase: CreatePostUseCase,
        getPostsUseCase: GetPostsUseCase,
        getPostByIdUseCase: GetPostByIdUseCase,
        getFeedUseCase: GetFeedUseCase,
      ) =>
        new PostsService(
          createUseCase,
          getPostsUseCase,
          getPostByIdUseCase,
          getFeedUseCase,
        ),
      inject: [
        CreatePostUseCase,
        GetPostsUseCase,
        GetPostByIdUseCase,
        GetFeedUseCase,
      ],
    },
  ],
  exports: [PostsService],
})
export class PostsModule {}