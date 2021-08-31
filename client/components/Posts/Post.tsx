interface Post {
  user: {
    name: string;
  };
  content: string;
}

export default function PostComponent({ post }: { post: Post }) {
  return (
    <div>
      <p>{post.user.name}</p>
      <p>{post.content}</p>
      {/* <p>{post.likes}</p> */}
    </div>
  );
}
