import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma.service";
import { ModerationRepository } from "../../domain/repositories/moderation.repository";
import { ProhibitedWord } from "../../domain/entities/prohibited-word.entity";

@Injectable()
export class ModerationPrismaRepository implements ModerationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProhibitedWord[]> {
    const results = await this.prisma.prohibitedWord.findMany({
      orderBy: { createdAt: "desc" },
    });

    return results.map(
      (w) => new ProhibitedWord(w.id, w.word, w.category, w.createdAt),
    );
  }

  async create(word: string, category: string): Promise<ProhibitedWord> {
    const result = await this.prisma.prohibitedWord.create({
      data: { word, category },
    });

    return new ProhibitedWord(
      result.id,
      result.word,
      result.category,
      result.createdAt,
    );
  }

  async delete(id: string): Promise<ProhibitedWord> {
    try {
      const result = await this.prisma.prohibitedWord.delete({ where: { id } });
      return new ProhibitedWord(
        result.id,
        result.word,
        result.category,
        result.createdAt,
      );
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        "code" in err &&
        (err as { code: string }).code === "P2025"
      ) {
        throw new NotFoundException("Palabra prohibida no encontrada");
      }
      throw err;
    }
  }

  async findProhibitedWords(): Promise<{ word: string; category: string }[]> {
    return this.prisma.prohibitedWord.findMany({
      select: { word: true, category: true },
    });
  }
}