import { getUser } from '../../context/user.context';
import {
  useDeletePostMutation,
  useLikePostMutation,
} from '../../__generated__/lib/mutations.graphql';
import { GetAllPostsDocument } from '../../__generated__/lib/queries.graphql';
import { GetAllPostsQuery } from '../../__generated__/lib/queries.graphql';

export default function PostComponent({
  post,
}: {
  post: GetAllPostsQuery['getAllPosts'][0];
}) {
  const { user } = getUser();
  const [deletePostMutation] = useDeletePostMutation();
  const [likePostMutation] = useLikePostMutation();
  // const [likePostMutation2] = useLikePost2

  const deletePost = () => {
    console.log(post.id);
    deletePostMutation({
      variables: {
        deletePostId: post.id,
      },
      refetchQueries: [GetAllPostsDocument],
    })
      .then((data) => {})
      .catch((e) => console.log(e));
  };

  const handleLike = () => {
    likePostMutation({
      variables: {
        likePostPostId: post.id,
      },
    })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
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
      {post.hasLiked === false ? (
        <button onClick={handleLike}>Like Post</button>
      ) : (
        <button
          onClick={() => {
            console.log('unlike');
          }}
        >
          Unlike Post
        </button>
      )}
    </div>
  );
}
