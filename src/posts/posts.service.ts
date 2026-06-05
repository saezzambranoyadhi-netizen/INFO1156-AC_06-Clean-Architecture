import { Injectable } from "@nestjs/common";
import { CreatePostUseCase } from "./application/use-cases/create-post.use-case";
import { GetPostsUseCase } from "./application/use-cases/get-posts.use-case";
import { GetPostByIdUseCase } from "./application/use-cases/get-post-by-id.use-case";
import { GetFeedUseCase } from "./application/use-cases/get-feed.use-case";
import { Post } from "./domain/entities/post.entity";
import { FeedPost } from "./domain/repositories/posts.repository";

@Injectable()
export class PostsService {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly getFeedUseCase: GetFeedUseCase,
  ) {}

  async create(data: {
    title: string;
    description: string;
    imageUrl: string;
    categoryId?: string;
  }): Promise<Post> {
    return this.createPostUseCase.execute(data);
  }

  async findAll(): Promise<Post[]> {
    return this.getPostsUseCase.execute();
  }

  async findById(id: string): Promise<Post | null> {
    return this.getPostByIdUseCase.execute(id);
  }

  async getFeed(
    mode: string,
    categoryId?: string,
  ): Promise<{ mode: string; count: number; rows: FeedPost[] }> {
    return this.getFeedUseCase.execute(mode, categoryId);
  }
}