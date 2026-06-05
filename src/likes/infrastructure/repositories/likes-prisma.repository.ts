import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma.service";
import { LikesRepository } from "../../domain/repositories/likes.repository";

@Injectable()
export class LikesPrismaRepository implements LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.like.findMany();
  }
}