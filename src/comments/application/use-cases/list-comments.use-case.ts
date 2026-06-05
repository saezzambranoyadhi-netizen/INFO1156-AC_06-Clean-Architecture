import { CommentsRepository } from "../../domain/repositories/comments.repository";
import { Comment } from "../../domain/entities/comment.entity";

export class ListCommentsUseCase {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async execute(postId: string): Promise<{ total_comments: number; comments: Comment[] }> {
    const comments = await this.commentsRepository.findByPostId(postId);
    return {
      total_comments: comments.length,
      comments,
    };
  }
}