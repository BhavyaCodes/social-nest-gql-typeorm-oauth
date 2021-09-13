import { gql } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import {
  CreatePostDocument,
  useCreatePostMutation,
} from '../../__generated__/lib/mutations.graphql';

export default function PostForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createPostMutation] = useCreatePostMutation();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content: string = inputRef.current.value;
    createPostMutation({
      variables: {
        createPostCreatePostInput: { content },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getAllPosts(existingPosts = []) {
              console.log('existing', existingPosts);
              console.log('data', data);
              //create cache fragment?
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
      // update(cache, result);,
      // refetchQueries: [GetAllPostsDocument],
    })
      .then((data) => {})
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" id="new-post-form-content" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
