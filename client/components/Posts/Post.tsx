import { getUser } from '../../context/user.context';

interface Post {
  id: number;
  user: {
    name: string;
    id: number;
  };
  content: string;
  likeCount: number;
}

export default function PostComponent({ post }: { post: Post }) {
  const { user } = getUser();

  const deletePost = () => {
    console.log(post.id);
  };

  return (
    <div>
      <p>{post.user.name}</p>
      <p>{post.content}</p>
      <p>{post.likeCount}</p>
      {user?.id == post.user.id && (
        <button onClick={deletePost}>Delete Post</button>
      )}
    </div>
  );
}
