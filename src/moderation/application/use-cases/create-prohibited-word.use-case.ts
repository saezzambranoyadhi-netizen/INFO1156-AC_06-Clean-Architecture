import { ModerationRepository } from "../../domain/repositories/moderation.repository";
import { ProhibitedWord } from "../../domain/entities/prohibited-word.entity";

export class CreateProhibitedWordUseCase {
  constructor(private readonly moderationRepository: ModerationRepository) {}

  async execute(word: string, category: string): Promise<ProhibitedWord> {
    return this.moderationRepository.create(word, category);
  }
}