import { BadRequestException } from "@nestjs/common";
import { PostsRepository } from "../../domain/repositories/posts.repository";
import { Post } from "../../domain/entities/post.entity";

export type ModerationResult = {
  approved: boolean;
  reason?: string;
};

export type ContentModerator = (text: string) => Promise<ModerationResult>;

export class CreatePostUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly moderateContent: ContentModerator,
  ) {}

  async execute(data: {
    title: string;
    description: string;
    imageUrl: string;
    categoryId?: string;
  }): Promise<Post> {
    const text = `${data.title} ${data.description}`;
    const moderation = await this.moderateContent(text);

    if (!moderation.approved) {
      throw new BadRequestException(
        moderation.reason ?? "Post bloqueado por moderación",
      );
    }

    return this.postsRepository.create(data);
  }
}