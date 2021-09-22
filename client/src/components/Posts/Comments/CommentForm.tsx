import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import gql from 'graphql-tag';
import { FormEvent, useRef } from 'react';
import { useCreateCommentMutation } from '../../../__generated__/src/lib/mutations.graphql';
import { FindCommentsByPostQuery } from '../../../__generated__/src/lib/queries.graphql';

export function CommentForm({
  postId,
  comments,
}: {
  postId: string;
  comments?: FindCommentsByPostQuery['findCommentsByPost'];
}) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [createCommentMutation] = useCreateCommentMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      // console.log(inputRef.current.value);
      const content: string = inputRef.current!.value;
      inputRef.current.value = '';
      createCommentMutation({
        variables: {
          createCommentInput: {
            postId,
            content,
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
                return [toReference(data?.createComment!), ...existing];
              },
            },
          });
        },
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        placeholder="comment on this post"
        required={true}
        inputRef={inputRef}
      />
      <Button type="submit">Comment</Button>
    </Box>
  );
}
