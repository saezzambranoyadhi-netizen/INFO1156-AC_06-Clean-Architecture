import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { AddLikeDto } from "../posts/posts.dtos";

@Controller("api/posts/:id/likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.likesService.findAll();
  }

  @Post()
  create(@Param("id") postId: string, @Body() body: AddLikeDto): Promise<any> {
    return this.likesService.create(postId, body);
  }
}