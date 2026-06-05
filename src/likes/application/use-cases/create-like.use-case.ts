import { NotFoundException } from "@nestjs/common";
import { LikesRepository } from "../../domain/repositories/likes.repository";

export type PostExistsChecker = (postId: string) => Promise<boolean>;

export class CreateLikeUseCase {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly checkPostExists: PostExistsChecker,
  ) {}

  async execute(
    postId: string,
    dto: { reactionType?: string; weight?: number },
  ): Promise<any> {
    const postExists = await this.checkPostExists(postId);
    if (!postExists) {
      throw new NotFoundException("Post no encontrado");
    }
    return this.likesRepository.create(postId, dto);
  }
}