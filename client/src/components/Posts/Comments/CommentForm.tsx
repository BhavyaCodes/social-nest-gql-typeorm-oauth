import { v4 as uuidv4 } from 'uuid';
import { gql } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  useMediaQuery,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { Box } from '@mui/system';
import { FormEvent, useRef } from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../../../context/user.context';
import { useCreateCommentMutation } from '../../../__generated__/src/lib/mutations.graphql';
import { FindCommentsByPostQuery } from '../../../__generated__/src/lib/queries.graphql';

export function CommentForm({
  postId,
  comments,
  commentCount,
}: {
  postId: string;
  comments?: FindCommentsByPostQuery['findCommentsByPost'];
  commentCount: number;
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const history = useHistory();
  const { user } = useUser();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [createCommentMutation] = useCreateCommentMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      return alert('Please login to comment');
    }
    if (inputRef.current) {
      const content: string = inputRef.current!.value;
      inputRef.current.value = '';
      createCommentMutation({
        variables: {
          createCommentInput: {
            postId,
            content,
          },
        },
        optimisticResponse: {
          createComment: {
            __typename: 'Comment',
            id: uuidv4(),
            content,
            user: {
              id: user.id,
              name: user.name,
              imageUrl: user.imageUrl,
            },
            createdAt: new Date().toISOString(),
          },
        },

        update(cache, { data }) {
          cache.modify({
            fields: {
              findCommentsByPost(
                existing = [],
                { storeFieldName, toReference },
              ) {
                const args = JSON.parse(
                  storeFieldName.replace('findCommentsByPost:', ''),
                );
                console.log(args);
                if (args.postId !== postId) return;
                return [...existing, toReference(data?.createComment!)];
              },
            },
          });
          cache.writeFragment({
            id: cache.identify({ __typename: 'Post', id: postId }),
            fragment: gql`
              fragment UpdateCommentCount on Post {
                commentCount
              }
            `,
            data: {
              commentCount: commentCount + 1,
            },
          });
        },
      }).catch((e) => console.log(e));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
      {user && (
        <Avatar
          onClick={() => history.push(`/profile/${user.id}`)}
          sx={{ cursor: 'pointer', width: 24, height: 24, my: 1 }}
          alt={user.name}
          src={user?.imageUrl as string}
          imgProps={{
            referrerPolicy: 'no-referrer',
          }}
        />
      )}

      <TextField
        placeholder="comment"
        required={true}
        inputRef={inputRef}
        multiline
        sx={{ flexGrow: 1, p: 1, mx: 1 }}
      />
      {matches ? (
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      ) : (
        <Button type="submit">Comment</Button>
      )}
    </Box>
  );
}
