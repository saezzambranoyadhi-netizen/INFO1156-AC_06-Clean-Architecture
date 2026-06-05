import { ModerationRepository } from "../../domain/repositories/moderation.repository";
import { ProhibitedWord } from "../../domain/entities/prohibited-word.entity";

export class GetProhibitedWordsUseCase {
  constructor(private readonly moderationRepository: ModerationRepository) {}

  async execute(): Promise<ProhibitedWord[]> {
    return this.moderationRepository.findAll();
  }
}