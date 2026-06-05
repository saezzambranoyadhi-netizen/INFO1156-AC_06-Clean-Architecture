import { Injectable } from "@nestjs/common";
import { GetLikesUseCase } from "./application/use-cases/get-likes.use-case";

@Injectable()
export class LikesService {
  constructor(private readonly getLikesUseCase: GetLikesUseCase) {}

  async findAll(): Promise<any[]> {
    return this.getLikesUseCase.execute();
  }
}