import React, { useState } from 'react';
import { GetProfileWithPostsQuery } from '../../lib/queries.graphql';
import PostComponent from '../Posts/Post';

export default function Posts({
  posts,
  fetchMore,
  user,
}: {
  posts: GetProfileWithPostsQuery['getAllPosts'];
  user: GetProfileWithPostsQuery['getUserProfile'];
  fetchMore: Function;
}) {
  const [profilePostsTimeStamp, setProfilePostsTimeStamp] = useState<
    null | string
  >(null);

  const renderPosts = () =>
    posts.map((post) => (
      <PostComponent key={post.id} post={{ ...post, user }} />
    ));

  return (
    <>
      <div>{renderPosts()}</div>
      <button
        onClick={() =>
          // fetchMore({
          //   variables: {
          //     profilePostsTimeStamp: posts[posts.length - 1]?.createdAt || null,
          //   },
          // })
          console.log('fetch more')
        }
      >
        Load More
      </button>
    </>
  );
}
