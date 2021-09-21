import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import { GetAllPostsQuery } from '../../__generated__/src/lib/queries.graphql';
import PostComponent from './Post';

export default function Posts({
  posts,
  fetchMore,
}: {
  posts: GetAllPostsQuery['getAllPosts'];
  fetchMore: Function;
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
      setLoading(true);
    }
  }, [isAtBottom, fetchMore, posts, loading, atLastPost]);

  const renderPosts = () =>
    posts.map((post) => <PostComponent key={post.id} post={post} />);

  return (
    <>
      <div>{renderPosts()}</div>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} my={2}>
          <CircularProgress />
        </Box>
      )}
      <div ref={intersectionRef}></div>
    </>
  );
}
