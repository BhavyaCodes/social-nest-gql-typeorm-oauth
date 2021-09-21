import { Box, CircularProgress } from '@mui/material';
import PostForm from '../components/PostForm';
import Posts from '../components/Posts';
import { useGetAllPostsQuery } from '../__generated__/src/lib/queries.graphql';

export default function Index() {
  const { loading, error, data, fetchMore } = useGetAllPostsQuery({
    variables: { getAllPostsTimeStamp: null },
  });

  if (error) {
    return <h2>An error occured</h2>;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} my={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <PostForm />
      <Posts posts={data?.getAllPosts!} fetchMore={fetchMore} />
    </div>
  );
}
