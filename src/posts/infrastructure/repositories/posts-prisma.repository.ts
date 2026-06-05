import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma.service";
import { PostsRepository, FeedPost } from "../../domain/repositories/posts.repository";
import { Post } from "../../domain/entities/post.entity";

@Injectable()
export class PostsPrismaRepository implements PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    description: string;
    imageUrl: string;
    categoryId?: string;
  }): Promise<Post> {
    const result = await this.prisma.post.create({ data });
    return new Post(
      result.id,
      result.title,
      result.description,
      result.imageUrl,
      result.categoryId,
      result.createdAt,
      result.updatedAt,
    );
  }

  async findAll(): Promise<Post[]> {
    const results = await this.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return results.map(
      (p) =>
        new Post(
          p.id,
          p.title,
          p.description,
          p.imageUrl,
          p.categoryId,
          p.createdAt,
          p.updatedAt,
        ),
    );
  }

  async findById(id: string): Promise<Post | null> {
    const result = await this.prisma.post.findUnique({ where: { id } });
    if (!result) return null;
    return new Post(
      result.id,
      result.title,
      result.description,
      result.imageUrl,
      result.categoryId,
      result.createdAt,
      result.updatedAt,
    );
  }

  async getFeedPosts(categoryId?: string): Promise<FeedPost[]> {
    const posts = await this.prisma.post.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { comments: true, likes: true, category: true },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      categoryId: post.categoryId,
      category: post.category?.name ?? null,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likesCount: post.likes.reduce((sum, l) => sum + l.weight, 0),
      commentsCount: post.comments.length,
      relevanceScore: 0,
    }));
  }
}