import { v4 as uuidv4 } from 'uuid';
import { getUser } from '../../context/user.context';
import {
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../__generated__/lib/mutations.graphql';
import { GetAllPostsQuery } from '../../__generated__/lib/queries.graphql';

export default function PostComponent({
  post,
}: {
  post: GetAllPostsQuery['getAllPosts'][0];
}) {
  const { user } = getUser();
  const [deletePostMutation] = useDeletePostMutation();
  const [likePostMutation] = useLikePostMutation();
  const [unLikePostMutation] = useUnlikePostMutation();

  const deletePost = () => {
    console.log(post.id);
    deletePostMutation({
      variables: {
        deletePostId: post.id,
      },
      optimisticResponse: {
        deletePost: {
          __typename: 'DeletedItem',
          id: post.id,
        },
      },
      update(cache, { data }) {
        console.log(data);
        const normalizedId = cache.identify({
          id: post.id,
          __typename: 'Post',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    }).catch((e) => console.log(e));
  };

  const handleLike = () => {
    likePostMutation({
      variables: {
        likePostPostId: post.id,
      },
      optimisticResponse: {
        likePost: {
          id: uuidv4(),
          __typename: 'Like',
          post: {
            __typename: 'Post',
            id: post.id,
            content: post.content,
            userId: post.user.id,
            user: {
              __typename: 'User',
              id: post.user.id,
              name: post.user.name,
              imageUrl: post.user.imageUrl,
            },
            likeCount: post.likeCount + 1,
            hasLiked: true,
          },
        },
      },
    }).catch((e) => console.log(e));
  };

  const handleUnLike = () => {
    unLikePostMutation({
      variables: {
        unLikePostPostId: post.id,
      },
      optimisticResponse: {
        unLikePost: {
          id: uuidv4(),
          __typename: 'Like',
          post: {
            __typename: 'Post',
            id: post.id,
            content: post.content,
            userId: post.user.id,
            user: {
              __typename: 'User',
              id: post.user.id,
              name: post.user.name,
              imageUrl: post.user.imageUrl,
            },
            likeCount: post.likeCount - 1,
            hasLiked: false,
            createdAt: post.createdAt,
          },
        },
      },
    }).catch((e) => console.log(e));
  };

  return (
    <div style={{ border: '2px solid black' }}>
      <p>{post.user.name}</p>
      <p>{post.content}</p>
      <p>LikeCount: {post.likeCount}</p>
      {user?.id === post.user.id && (
        <button onClick={deletePost}>Delete Post</button>
      )}
      <p>hasLiked: {JSON.stringify(post.hasLiked)}</p>
      {post.hasLiked === false && (
        <button onClick={handleLike}>Like Post</button>
      )}
      {post.hasLiked === true && (
        <button onClick={handleUnLike}>Unlike Post</button>
      )}
    </div>
  );
}
