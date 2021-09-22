import { Box } from '@mui/material';
import { useFindCommentsByPostQuery } from '../../../__generated__/src/lib/queries.graphql';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export default function Comments({ postId }: { postId: string }) {
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
      return data.findCommentsByPost.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ));
    }
    return null;
  };

  if (data?.findCommentsByPost.length === 0) {
    return <p>no comments</p>;
  }

  return (
    <Box px={2} mb={1}>
      {renderComments()}
      <CommentForm postId={postId} comments={data?.findCommentsByPost} />
    </Box>
  );
}
