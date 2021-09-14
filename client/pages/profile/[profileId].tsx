import { useRouter } from 'next/dist/client/router';
import { useGetUserProfileQuery } from '../../lib/queries.graphql';
import ProfileHeader from '../../components/ProfileHeader';
import PostComponent from '../../components/Posts/Post';

export default function ProfilePage() {
  const router = useRouter();
  const { profileId } = router.query;
  const { loading, error, data, fetchMore } = useGetUserProfileQuery({
    variables: {
      postsTimeStamp: null,
      userGetUserProfileById: { userId: profileId as string },
    },
  });

  const renderPosts = () =>
    posts.map((post) => <PostComponent key={post.id} post={post} />);

  if (loading) {
    return <p>Loading......</p>;
  }
  const posts = data.user.posts;

  if (data) {
    return (
      <div>
        <ProfileHeader imageUrl={data.user.imageUrl} name={data.user.name} />
        <div>{renderPosts()}</div>
      </div>
    );
  }
  return <p>something went wrong</p>;
}
