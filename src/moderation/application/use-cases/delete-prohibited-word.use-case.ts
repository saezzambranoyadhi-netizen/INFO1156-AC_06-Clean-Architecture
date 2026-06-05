import { ModerationRepository } from "../../domain/repositories/moderation.repository";
import { ProhibitedWord } from "../../domain/entities/prohibited-word.entity";

export class DeleteProhibitedWordUseCase {
  constructor(private readonly moderationRepository: ModerationRepository) {}

  async execute(id: string): Promise<ProhibitedWord> {
    return this.moderationRepository.delete(id);
  }
}