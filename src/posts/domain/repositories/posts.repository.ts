import { Post } from "../entities/post.entity";

export type FeedPost = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string | null;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  commentsCount: number;
  relevanceScore: number;
};

export interface PostsRepository {
  create(data: {
    title: string;
    description: string;
    imageUrl: string;
    categoryId?: string;
  }): Promise<Post>;
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  getFeedPosts(categoryId?: string): Promise<FeedPost[]>;
}