import { NotFoundException } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments.repository";
import { Comment } from "../../domain/entities/comment.entity";

export type PostExistsChecker = (postId: string) => Promise<boolean>;

export class ListCommentsUseCase {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly checkPostExists: PostExistsChecker,
  ) {}

  async execute(
    postId: string,
  ): Promise<{ total_comments: number; comments: Comment[] }> {
    const postExists = await this.checkPostExists(postId);
    if (!postExists) {
      throw new NotFoundException("Post no encontrado");
    }

    const comments = await this.commentsRepository.findByPostId(postId);
    return {
      total_comments: comments.length,
      comments,
    };
  }
}