import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfilePosts from '../components/Profile/ProfilePosts';
import { useGetProfileWithPostsQuery } from '../__generated__/src/lib/queries.graphql';
import Header from '../components/Header';

export default function ProfilePage() {
  // const history = useHistory();
  const { profileId } = useParams<any>();
  // const { profileId } = history.query;
  // const { profileId } = params;

  const { loading, error, data, fetchMore } = useGetProfileWithPostsQuery({
    variables: {
      getUserProfileGetUserProfileById: profileId as string,
      getAllPostsTimeStamp: null,
      getAllPostsUserId: profileId as string,
    },
  });

  if (!data) {
    return <p>Loading......</p>;
  }

  if (loading) {
    return <p>Loading......</p>;
  }
  const posts = data.getAllPosts;

  return (
    <div>
      <Header />
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
