import { gql } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useRef } from 'react';
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
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [createCommentMutation] = useCreateCommentMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
