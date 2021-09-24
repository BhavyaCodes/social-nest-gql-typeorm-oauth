import { Box } from '@mui/material';
import { useFindCommentsByPostQuery } from '../../../__generated__/src/lib/queries.graphql';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export default function Comments({
  postId,
  commentCount,
}: {
  postId: string;
  commentCount: number;
}) {
  const { data, loading, error } = useFindCommentsByPostQuery({
    variables: {
      findCommentsByPostPostId: postId,
    },
  });

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  const renderComments = () => {
    if (data) {
      if (data.findCommentsByPost.length === 0) return null;
      return data.findCommentsByPost.map((comment) => (
        <Comment
          key={comment.id}
          postId={postId}
          comment={comment}
          commentCount={commentCount}
        />
      ));
    }
    return null;
  };

  return (
    <Box px={2} mb={1}>
      {renderComments()}
      <CommentForm
        postId={postId}
        comments={data?.findCommentsByPost}
        commentCount={commentCount}
      />
    </Box>
  );
}
