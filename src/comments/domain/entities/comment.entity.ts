export class Comment {
  constructor(
    public readonly id: string,
    public readonly postId: string,
    public readonly content: string,
    public readonly source: string,
    public readonly createdAt: Date,
  ) {}
}