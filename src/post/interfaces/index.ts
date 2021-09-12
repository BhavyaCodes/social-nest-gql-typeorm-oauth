import { Post } from '../entities/post.entity';

export type PostWithLikesCount = Omit<Post, 'hasLiked' | 'user' | 'likes'>;

export type PostWithLikesCountAndHasLiked = Omit<Post, 'user' | 'likes'>;
