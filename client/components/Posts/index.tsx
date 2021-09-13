import React, { useState } from 'react';
import { GetAllPostsQuery } from '../../__generated__/lib/queries.graphql';
import PostComponent from './Post';

export default function Posts({
  posts,
  fetchMore,
}: {
  posts: GetAllPostsQuery['getAllPosts'];
  fetchMore: Function;
}) {
  const [getAllPostsTimeStamp, setGetAllPostsTimeStamp] = useState<
    null | string
  >(null);

  const renderPosts = () =>
    posts.map((post) => <PostComponent key={post.id} post={post} />);

  return (
    <>
      <div>{renderPosts()}</div>
      <button
        onClick={() =>
          fetchMore({
            variables: {
              getAllPostsTimeStamp: posts[posts.length - 1].createdAt as string,
            },
          })
        }
      >
        Load More
      </button>
    </>
  );
}
