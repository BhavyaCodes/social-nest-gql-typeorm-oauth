import { useRouter } from 'next/dist/client/router';
import { useGetUserProfileQuery } from '../../lib/queries.graphql';
import ProfileHeader from '../../components/ProfileHeader';

export default function ProfilePage() {
  const router = useRouter();
  const { profileId } = router.query;
  const { loading, error, data, fetchMore } = useGetUserProfileQuery({
    variables: {
      postsTimeStamp: null,
      userGetUserProfileById: { userId: profileId as string },
    },
  });

  console.log(data);
  if (loading) {
    return <p>Loading......</p>;
  }
  if (data) {
    return (
      <div>
        <ProfileHeader imageUrl={data.user.imageUrl} name={data.user.name} />
      </div>
    );
  }
  return <p>something went wrong</p>;
}
