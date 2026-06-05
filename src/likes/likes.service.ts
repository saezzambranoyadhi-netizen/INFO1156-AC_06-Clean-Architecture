import { Injectable } from "@nestjs/common";
import { GetLikesUseCase } from "./application/use-cases/get-likes.use-case";
import { CreateLikeUseCase } from "./application/use-cases/create-like.use-case";
import { AddLikeDto } from "../posts/posts.dtos";

@Injectable()
export class LikesService {
  constructor(
    private readonly getLikesUseCase: GetLikesUseCase,
    private readonly createLikeUseCase: CreateLikeUseCase,
  ) {}

  async findAll(): Promise<any[]> {
    return this.getLikesUseCase.execute();
  }

  async create(postId: string, dto: AddLikeDto): Promise<any> {
    return this.createLikeUseCase.execute(postId, dto);
  }
}