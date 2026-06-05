import { Injectable } from "@nestjs/common";
import { ListCommentsUseCase } from "./application/use-cases/list-comments.use-case";
import { CreateCommentUseCase } from "./application/use-cases/create-comment.use-case";
import { Comment } from "./domain/entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    private readonly listCommentsUseCase: ListCommentsUseCase,
    private readonly createCommentUseCase: CreateCommentUseCase,
  ) {}

  async listByPostId(
    postId: string,
  ): Promise<{ total_comments: number; comments: Comment[] }> {
    return this.listCommentsUseCase.execute(postId);
  }

  async create(postId: string, content: string): Promise<Comment> {
    return this.createCommentUseCase.execute(postId, content);
  }
}