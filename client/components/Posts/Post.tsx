import { getUser } from '../../context/user.context';
import { useDeletePostMutation } from '../../__generated__/lib/mutations.graphql';
import { GetAllPostsDocument } from '../../__generated__/lib/queries.graphql';

interface Post {
  id: string;
  user: {
    name: string;
    id: string;
  };
  content: string;
  likeCount: number;
}

export default function PostComponent({ post }: { post: Post }) {
  const { user } = getUser();
  const [deletePostMutation] = useDeletePostMutation();

  const deletePost = () => {
    console.log(post.id);
    deletePostMutation({
      variables: {
        deletePostId: post.id,
      },
      refetchQueries: [GetAllPostsDocument],
    })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <p>{post.user.name}</p>
      <p>{post.content}</p>
      <p>{post.likeCount}</p>
      {user?.id === post.user.id && (
        <button onClick={deletePost}>Delete Post</button>
      )}
    </div>
  );
}
