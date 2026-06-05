import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma.service";
import { CommentsRepository } from "../../domain/repositories/comments.repository";
import { Comment } from "../../domain/entities/comment.entity";

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPostId(postId: string): Promise<Comment[]> {
    const results = await this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });

    return results.map(
      (c) => new Comment(c.id, c.postId, c.content, c.source, c.createdAt),
    );
  }

  async create(postId: string, content: string): Promise<Comment> {
    const result = await this.prisma.comment.create({
      data: {
        postId,
        content,
        source: "comments-module",
      },
    });

    return new Comment(
      result.id,
      result.postId,
      result.content,
      result.source,
      result.createdAt,
    );
  }
}