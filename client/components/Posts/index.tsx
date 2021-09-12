import React from 'react';
import { GetAllPostsQuery } from '../../__generated__/lib/queries.graphql';
import PostComponent from './Post';

export default function Posts({
  posts,
}: {
  posts: GetAllPostsQuery['getAllPosts'];
}) {
  const renderPosts = () =>
    posts.map((post) => <PostComponent key={post.id} post={post} />);

  return <div>{renderPosts()}</div>;
}
