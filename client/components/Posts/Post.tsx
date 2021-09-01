interface Post {
  user: {
    name: string;
  };
  content: string;
  likeCount: number;
}

export default function PostComponent({ post }: { post: Post }) {
  return (
    <div>
      <p>{post.user.name}</p>
      <p>{post.content}</p>
      <p>{post.likeCount}</p>
    </div>
  );
}
