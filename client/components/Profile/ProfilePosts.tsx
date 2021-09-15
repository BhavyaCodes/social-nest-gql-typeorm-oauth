import React, { useState } from 'react';
import { GetUserProfileQuery } from '../../__generated__/lib/queries.graphql';
import PostComponent from '../Posts/Post';

export default function Posts({
  posts,
  fetchMore,
}: {
  posts: GetUserProfileQuery['getUserProfile']['posts'];
  fetchMore: Function;
}) {
  const [profilePostsTimeStamp, setProfilePostsTimeStamp] = useState<
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
              profilePostsTimeStamp: posts[posts.length - 1]?.createdAt || null,
            },
          })
        }
      >
        Load More
      </button>
    </>
  );
}
