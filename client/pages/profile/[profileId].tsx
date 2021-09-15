import { useRouter } from 'next/dist/client/router';

import ProfileHeader from '../../components/Profile/ProfileHeader';
import Posts from '../../components/Profile/ProfilePosts';
import {
  useGetAllPostsQuery,
  useGetUserProfileQuery,
} from '../../__generated__/lib/queries.graphql';
import Header from '../../components/Header';

export default function ProfilePage() {
  const router = useRouter();
  const { profileId } = router.query;
  const { loading, error, data, fetchMore } = useGetUserProfileQuery({
    variables: {
      getUserProfileGetUserProfileById: profileId as string,
      postsTimeStamp: null,
    },
  });

  if (!data) {
    return <p>Loading......</p>;
  }

  if (loading) {
    return <p>Loading......</p>;
  }
  const { posts } = data.getUserProfile;

  return (
    <div>
      <Header />
      <ProfileHeader
        imageUrl={data.getUserProfile.imageUrl}
        name={data.getUserProfile.name}
      />
      <Posts posts={posts} fetchMore={fetchMore} />
    </div>
  );
}
