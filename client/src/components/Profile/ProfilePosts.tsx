import { useState, useRef, useEffect } from 'react';
import { GetProfileWithPostsQuery } from '../../lib/queries.graphql';
import PostComponent from '../Posts/Post';
import { GetAllPostsFromUserDocument } from '../../__generated__/src/lib/queries.graphql';
import { useIntersection } from 'react-use';
export default function Posts({
  posts,
  fetchMore,
  user,
}: {
  posts: GetProfileWithPostsQuery['getAllPosts'];
  user: GetProfileWithPostsQuery['getUserProfile'];
  fetchMore: any;
}) {
  const [atLastPost, setAtLastPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const intersectionRef = useRef<null | HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  const isAtBottom = intersection && intersection.intersectionRatio === 1;
  const getAllPostsTimeStamp = posts[posts.length - 1]?.createdAt || null;

  useEffect(() => {
    if (isAtBottom && !loading && !atLastPost) {
      setLoading(true);
      fetchMore({
        variables: {
          getAllPostsTimeStamp: getAllPostsTimeStamp,
          getAllPostsUserId: user.id,
        },
        query: GetAllPostsFromUserDocument,
      }).then((data: any) => {
        setLoading(false);
        if (data.data?.getAllPosts?.length === 0) {
          setAtLastPost(true);
        }
      });
    }
  }, [
    isAtBottom,
    fetchMore,
    posts,
    loading,
    atLastPost,
    getAllPostsTimeStamp,
    user.id,
  ]);

  const renderPosts = () =>
    posts.map((post) => (
      <PostComponent key={post.id} post={{ ...post, user }} />
    ));

  return (
    <>
      <div>{renderPosts()}</div>
      {/* <button
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
      </button> */}
      <div ref={intersectionRef}></div>
    </>
  );
}
