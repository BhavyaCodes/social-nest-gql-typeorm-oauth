import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';

export function CommentForm() {
  return (
    <Box>
      <TextField placeholder="comment on this post" />
      <Button>Comment</Button>
    </Box>
  );
}
