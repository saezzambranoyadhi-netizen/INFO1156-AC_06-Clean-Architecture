import { Injectable } from "@nestjs/common";
import { GetProhibitedWordsUseCase } from "./application/use-cases/get-prohibited-words.use-case";
import { CreateProhibitedWordUseCase } from "./application/use-cases/create-prohibited-word.use-case";
import { DeleteProhibitedWordUseCase } from "./application/use-cases/delete-prohibited-word.use-case";
import { ModerationPrismaRepository } from "./infrastructure/repositories/moderation-prisma.repository";
import { ProhibitedWord } from "./domain/entities/prohibited-word.entity";

export type ModerationResult = {
  approved: boolean;
  reason?: string;
  category?: string;
};

const buildFuzzyRegex = (word: string) => {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped.split("").join("[^a-zA-Z0-9]*"), "gi");
};

@Injectable()
export class ModerationService {
  constructor(
    private readonly getProhibitedWordsUseCase: GetProhibitedWordsUseCase,
    private readonly createProhibitedWordUseCase: CreateProhibitedWordUseCase,
    private readonly deleteProhibitedWordUseCase: DeleteProhibitedWordUseCase,
    private readonly moderationRepository: ModerationPrismaRepository,
  ) {}

  async moderate(text: string): Promise<ModerationResult> {
    const words = await this.moderationRepository.findProhibitedWords();

    for (const pw of words) {
      const regex = buildFuzzyRegex(pw.word);
      if (regex.test(text)) {
        return {
          approved: false,
          reason: `Contiene palabra prohibida: "${pw.word}"`,
          category: pw.category,
        };
      }
    }

    return { approved: true };
  }

  async findAll(): Promise<ProhibitedWord[]> {
    return this.getProhibitedWordsUseCase.execute();
  }

  async create(word: string, category: string): Promise<ProhibitedWord> {
    return this.createProhibitedWordUseCase.execute(word, category);
  }

  async delete(id: string): Promise<ProhibitedWord> {
    return this.deleteProhibitedWordUseCase.execute(id);
  }
}