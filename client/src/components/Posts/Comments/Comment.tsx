import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { useRemoveCommentMutation } from '../../../__generated__/src/lib/mutations.graphql';
import { FindCommentsByPostQuery } from '../../../__generated__/src/lib/queries.graphql';

export function Comment({
  comment,
}: {
  comment: FindCommentsByPostQuery['findCommentsByPost'][0];
}) {
  const history = useHistory();
  const [removeCommentMutation] = useRemoveCommentMutation();
  const handleDeleteComment = () => {
    removeCommentMutation({
      variables: {
        removeCommentId: comment.id,
      },
    })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <Box>
      <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
      <Box sx={{ display: 'flex' }}>
        <Avatar
          onClick={() => history.push(`/profile/${comment.user.id}`)}
          sx={{ cursor: 'pointer', width: 24, height: 24, my: 1 }}
          alt={comment.user.name}
          src={comment.user?.imageUrl as string}
          imgProps={{
            referrerPolicy: 'no-referrer',
          }}
        />
        <Box
          mx={2}
          p={1}
          sx={{ backgroundColor: 'pink', flexGrow: 1, borderRadius: 1 }}
        >
          <Typography variant="subtitle2">{comment.user.name}</Typography>
          <Typography variant="body2">{comment.content}</Typography>
          <Button type="button" onClick={handleDeleteComment}>
            Delete Comment
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
