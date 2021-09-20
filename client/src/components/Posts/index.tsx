import { useState, useRef, useCallback, useEffect } from 'react';
import { useIntersection } from 'react-use';
import { GetAllPostsQuery } from '../../__generated__/src/lib/queries.graphql';
import PostComponent from './Post';

export default function Posts({
  posts,
  fetchMore,
}: // loading,
{
  posts: GetAllPostsQuery['getAllPosts'];
  fetchMore: Function;
  // loading: boolean;
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

  useEffect(() => {
    if (isAtBottom && !loading && !atLastPost) {
      setLoading(true);
      fetchMore({
        variables: {
          getAllPostsTimeStamp: posts[posts.length - 1]?.createdAt || null,
        },
      }).then((data: any) => {
        setLoading(false);
        if (data.data?.getAllPosts?.length === 0) {
          setAtLastPost(true);
        }
      });
    }
  }, [isAtBottom, fetchMore, posts, loading, atLastPost]);

  const renderPosts = () =>
    posts.map((post) => <PostComponent key={post.id} post={post} />);

  return (
    <>
      <div>{renderPosts()}</div>
      {/* <button
        onClick={() =>
          fetchMore({
            variables: {
              getAllPostsTimeStamp: posts[posts.length - 1]?.createdAt || null,
            },
          })
        }
      >
        Load More
      </button> */}
      <div ref={intersectionRef}></div>
    </>
  );
}
