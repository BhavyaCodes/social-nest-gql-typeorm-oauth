import { useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import {
  CreatePostDocument,
  useCreatePostMutation,
} from '../../__generated__/lib/mutations.graphql';

export default function PostForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createPostMutation] = useCreatePostMutation();
  // const [createPostMutation] = useMutation<>(CreatePostDocument, {
  //   variables: { content: inputRef.current.value },
  // });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value: string = inputRef.current.value;
    createPostMutation({
      variables: {
        createPostCreatePostInput: { content: inputRef.current.value },
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" id="new-post-form-content" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
