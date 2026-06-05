import { ProhibitedWord } from "../entities/prohibited-word.entity";

export interface ModerationRepository {
  findAll(): Promise<ProhibitedWord[]>;
  create(word: string, category: string): Promise<ProhibitedWord>;
  delete(id: string): Promise<ProhibitedWord>;
  findProhibitedWords(): Promise<{ word: string; category: string }[]>;
}