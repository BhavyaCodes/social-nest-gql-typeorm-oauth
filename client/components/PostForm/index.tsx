import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { FormEvent, useRef } from 'react';
import { useCreatePostMutation } from '../../__generated__/lib/mutations.graphql';
import { getUser } from '../../context/user.context';

export default function PostForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createPostMutation] = useCreatePostMutation();
  const { user } = getUser();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content: string = inputRef.current.value;
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
          createdAt: new Date(),
          likeCount: 0,
          hasLiked: false,
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getAllPosts(existingPosts = []) {
              console.log('existing', existingPosts);
              console.log('data', data);
              const newPostRef = cache.writeFragment({
                data: data.createPost,
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

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" id="new-post-form-content" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
