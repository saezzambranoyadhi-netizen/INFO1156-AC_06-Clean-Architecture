import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma.service";
import { LikesRepository } from "../../domain/repositories/likes.repository";

@Injectable()
export class LikesPrismaRepository implements LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.like.findMany();
  }

  async create(
    postId: string,
    dto: { reactionType?: string; weight?: number },
  ): Promise<any> {
    return this.prisma.like.create({
      data: {
        postId,
        reactionType: dto.reactionType ?? "like",
        weight: dto.weight ?? 1,
        source: "likes-module",
      },
    });
  }
}