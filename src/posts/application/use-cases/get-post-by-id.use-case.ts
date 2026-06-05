import { PostsRepository } from "../../domain/repositories/posts.repository";
import { Post } from "../../domain/entities/post.entity";

export class GetPostByIdUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(id: string): Promise<Post | null> {
    return this.postsRepository.findById(id);
  }
}