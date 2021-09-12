import { Post } from '../entities/post.entity';

export type PostWithLikesCount = Omit<Post, 'hasLiked' | 'user' | 'likes'>;
