export interface LikesRepository {
  findAll(): Promise<any[]>;
  create(postId: string, dto: { reactionType?: string; weight?: number }): Promise<any>;
}