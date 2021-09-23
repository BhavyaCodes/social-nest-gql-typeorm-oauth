import { gql } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useRef } from 'react';
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
  const { user } = useUser();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [createCommentMutation] = useCreateCommentMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      return alert('Please long to comment');
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
