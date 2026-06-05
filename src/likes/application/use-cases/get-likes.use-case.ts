import { LikesRepository } from "../../domain/repositories/likes.repository";

export class GetLikesUseCase {
  constructor(private readonly likesRepository: LikesRepository) {}

  async execute(): Promise<any[]> {
    return this.likesRepository.findAll();
  }
}