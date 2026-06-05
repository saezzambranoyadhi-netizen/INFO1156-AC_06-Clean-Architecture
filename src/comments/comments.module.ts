import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CommentsPrismaRepository } from "./infrastructure/repositories/comments-prisma.repository";
import { ListCommentsUseCase } from "./application/use-cases/list-comments.use-case";
import { CreateCommentUseCase } from "./application/use-cases/create-comment.use-case";
import { PostsModule } from "../posts/posts.module";
import { ModerationModule } from "../moderation/moderation.module";
import { PostsService } from "../posts/posts.service";
import { ModerationService } from "../moderation/moderation.service";

@Module({
  imports: [PostsModule, ModerationModule],
  controllers: [CommentsController],
  providers: [
    CommentsPrismaRepository,
    {
      provide: "CommentsRepository",
      useClass: CommentsPrismaRepository,
    },
    {
      provide: ListCommentsUseCase,
      useFactory: (repo: CommentsPrismaRepository) =>
        new ListCommentsUseCase(repo),
      inject: [CommentsPrismaRepository],
    },
    {
      provide: CreateCommentUseCase,
      useFactory: (
        repo: CommentsPrismaRepository,
        postsService: PostsService,
        moderationService: ModerationService,
      ) =>
        new CreateCommentUseCase(
          repo,
          async (postId) => {
            const post = await postsService.findById(postId);
            return !!post;
          },
          async (content) => moderationService.moderate(content),
        ),
      inject: [CommentsPrismaRepository, PostsService, ModerationService],
    },
    {
      provide: CommentsService,
      useFactory: (
        listUseCase: ListCommentsUseCase,
        createUseCase: CreateCommentUseCase,
      ) => new CommentsService(listUseCase, createUseCase),
      inject: [ListCommentsUseCase, CreateCommentUseCase],
    },
  ],
})
export class CommentsModule {}