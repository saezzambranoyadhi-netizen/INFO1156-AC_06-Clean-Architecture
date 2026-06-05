import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments.repository";
import { Comment } from "../../domain/entities/comment.entity";

export type ModerationResult = {
  approved: boolean;
  reason?: string;
};

export type PostExistsChecker = (postId: string) => Promise<boolean>;
export type ContentModerator = (content: string) => Promise<ModerationResult>;

export class CreateCommentUseCase {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly checkPostExists: PostExistsChecker,
    private readonly moderateContent: ContentModerator,
  ) {}

  async execute(postId: string, content: string): Promise<Comment> {
    const postExists = await this.checkPostExists(postId);
    if (!postExists) {
      throw new NotFoundException("Post no encontrado");
    }

    const moderation = await this.moderateContent(content);
    if (!moderation.approved) {
      throw new BadRequestException(
        moderation.reason ?? "Comentario bloqueado por moderación",
      );
    }

    return this.commentsRepository.create(postId, content);
  }
}