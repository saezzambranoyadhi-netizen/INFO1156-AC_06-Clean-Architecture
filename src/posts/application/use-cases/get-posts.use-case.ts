import { PostsRepository } from "../../domain/repositories/posts.repository";
import { Post } from "../../domain/entities/post.entity";

export class GetPostsUseCase {
  constructor(private readonly postsRepository: PostsRepository) {}

  async execute(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }
}