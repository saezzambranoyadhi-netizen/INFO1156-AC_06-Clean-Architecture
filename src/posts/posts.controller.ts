import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto, FeedQueryDto } from "./posts.dtos";
import { Post as PostEntity } from "./domain/entities/post.entity";
import { FeedPost } from "./domain/repositories/posts.repository";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Body() body: CreatePostDto,
  ): Promise<{ ok: boolean; payload: PostEntity }> {
    const created = await this.postsService.create(body);
    return {
      ok: true,
      payload: created,
    };
  }

  @Get()
  async findAll(): Promise<{ total: number; items: PostEntity[] }> {
    const posts = await this.postsService.findAll();
    return {
      total: posts.length,
      items: posts,
    };
  }

  @Get("feed")
  async getFeed(
    @Query() query: FeedQueryDto,
  ): Promise<{ mode: string; count: number; rows: FeedPost[] }> {
    const mode = query.mode ?? "latest";
    return this.postsService.getFeed(mode, query.categoryId);
  }
}