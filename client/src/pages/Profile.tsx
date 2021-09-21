import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfilePosts from '../components/Profile/ProfilePosts';
import { useGetProfileWithPostsQuery } from '../__generated__/src/lib/queries.graphql';

export default function ProfilePage() {
  const { profileId } = useParams<any>();

  const { loading, data, error, fetchMore } = useGetProfileWithPostsQuery({
    variables: {
      getUserProfileGetUserProfileById: profileId as string,
      getAllPostsTimeStamp: null,
      getAllPostsUserId: profileId as string,
    },
  });

  if (error) {
    return <h2>An error occured</h2>;
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} my={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} my={2}>
        <CircularProgress />
      </Box>
    );
  }

  const posts = data.getAllPosts;

  return (
    <div>
      <ProfileHeader
        imageUrl={data.getUserProfile?.imageUrl || undefined}
        name={data.getUserProfile.name}
      />
      <ProfilePosts
        posts={posts}
        user={data.getUserProfile}
        fetchMore={fetchMore}
      />
    </div>
  );
}
