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
    }).catch((e) => console.log(e));
  };

  const handleUnLike = () => {
    unLikePostMutation({
      variables: {
        unLikePostPostId: post.id,
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
