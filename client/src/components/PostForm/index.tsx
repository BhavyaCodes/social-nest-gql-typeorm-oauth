import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { FormEvent, useRef } from 'react';
import { useCreatePostMutation } from '../../__generated__/src/lib/mutations.graphql';
import { useUser } from '../../context/user.context';
import { TextField, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
export default function PostForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createPostMutation] = useCreatePostMutation();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content: string = inputRef.current!.value;
    createPostMutation({
      variables: {
        createPostCreatePostInput: { content },
      },
      optimisticResponse: {
        createPost: {
          __typename: 'Post',
          id: uuidv4(),
          content,
          user: {
            __typename: 'User',
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
          },
          createdAt: new Date().toISOString(),
          likeCount: 0,
          hasLiked: false,
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getAllPosts(existingPosts = []) {
              const newPostRef = cache.writeFragment({
                data: data?.createPost,
                fragment: gql`
                  fragment newPost on GetAllPosts {
                    id
                    content
                    user {
                      id
                      name
                      imageUrl
                    }
                    createdAt
                    likeCount
                    hasLiked
                  }
                `,
              });
              return [newPostRef, ...existingPosts];
            },
          },
        });
      },
    }).catch((e) => console.log(e));
  };

  const Form = styled(Box)`
    display: flex;
    flex-direction: column;
  `;

  return (
    <Form component="form" onSubmit={handleFormSubmit} my={2}>
      {/* <input type="text" id="new-post-form-content" ref={inputRef} />
       */}
      <TextField
        placeholder="Write a post"
        type="text"
        fullWidth
        id="new-post-form-content"
        inputRef={inputRef}
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        style={{ alignSelf: 'flex-end' }}
      >
        Submit
      </Button>
    </Form>
  );
}
