import { useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import { useCreatePostMutation } from '../../__generated__/lib/mutations.graphql';
import {
  GetAllPostsDocument,
  useGetAllPostsQuery,
} from '../../__generated__/lib/queries.graphql';

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
      refetchQueries: [GetAllPostsDocument],
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
