import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCommentDto } from "../posts/posts.dtos";
import { CommentsService } from "./comments.service";
import { Comment } from "./domain/entities/comment.entity";

@Controller("api/posts/:id/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  list(
    @Param("id") postId: string,
  ): Promise<{ total_comments: number; comments: Comment[] }> {
    return this.commentsService.listByPostId(postId);
  }

  @Post()
  create(
    @Param("id") postId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(postId, body.content);
  }
}