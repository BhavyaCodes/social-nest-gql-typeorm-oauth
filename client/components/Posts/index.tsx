import React from 'react';
import { GetAllPostsQuery } from '../../__generated__/lib/queries.graphql';
import { Post } from '../../__generated__/__types__';
import PostComponent from './Post';

export default function Posts({
  posts,
}: {
  posts: GetAllPostsQuery['allPosts'];
}) {
  const renderPosts = () =>
    posts.map((post) => <PostComponent key={post.id} post={post} />);

  return <div>{renderPosts()}</div>;
}
