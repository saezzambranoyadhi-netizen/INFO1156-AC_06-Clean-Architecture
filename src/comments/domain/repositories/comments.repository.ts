import { Comment } from "../entities/comment.entity";

export interface CommentsRepository {
  findByPostId(postId: string): Promise<Comment[]>;
  create(postId: string, content: string): Promise<Comment>;
}