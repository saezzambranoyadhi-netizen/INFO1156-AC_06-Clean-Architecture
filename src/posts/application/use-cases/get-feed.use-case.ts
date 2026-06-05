import { PostsRepository, FeedPost } from "../../domain/repositories/posts.repository";
import { FeedRankingStrategyFactory } from "../../domain/strategies/feed-ranking.strategy";

export class GetFeedUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly rankingFactory: FeedRankingStrategyFactory,
  ) {}

  async execute(
    mode: string,
    categoryId?: string,
  ): Promise<{ mode: string; count: number; rows: FeedPost[] }> {
    const feedPosts = await this.postsRepository.getFeedPosts(categoryId);
    const rankedPosts = this.rankingFactory.forMode(mode).rank(feedPosts);

    return {
      mode,
      count: rankedPosts.length,
      rows: rankedPosts,
    };
  }
}