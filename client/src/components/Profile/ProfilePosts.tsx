import { GetProfileWithPostsQuery } from '../../lib/queries.graphql';
import PostComponent from '../Posts/Post';
import { FetchMoreQueryOptions } from '@apollo/client';
import {
  GetAllPostsFromUserDocument,
  GetAllPostsFromUserQueryVariables,
} from '../../__generated__/src/lib/queries.graphql';
export default function Posts({
  posts,
  fetchMore,
  user,
}: {
  posts: GetProfileWithPostsQuery['getAllPosts'];
  user: GetProfileWithPostsQuery['getUserProfile'];
  fetchMore: (
    fetchMoreQueryOptions: FetchMoreQueryOptions<GetAllPostsFromUserQueryVariables>,
  ) => void;
}) {
  const renderPosts = () =>
    posts.map((post) => (
      <PostComponent key={post.id} post={{ ...post, user }} />
    ));

  const getAllPostsTimeStamp = posts[posts.length - 1]?.createdAt || null;

  return (
    <>
      <div>{renderPosts()}</div>
      <button
        onClick={() =>
          fetchMore({
            variables: {
              getAllPostsTimeStamp: getAllPostsTimeStamp,
              getAllPostsUserId: user.id,
            },
            query: GetAllPostsFromUserDocument,
          })
        }
      >
        Load More
      </button>
    </>
  );
}
