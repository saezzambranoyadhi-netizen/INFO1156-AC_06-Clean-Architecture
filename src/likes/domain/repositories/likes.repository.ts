export interface LikesRepository {
  findAll(): Promise<any[]>;
}