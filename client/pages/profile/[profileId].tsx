import { useRouter } from 'next/dist/client/router';

import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfilePosts from '../../components/Profile/ProfilePosts';
import {
  useGetAllPostsFromUserLazyQuery,
  useGetAllPostsLazyQuery,
  useGetProfileWithPostsQuery,
} from '../../__generated__/lib/queries.graphql';
import Header from '../../components/Header';

export default function ProfilePage() {
  const router = useRouter();
  const { profileId } = router.query;

  const { loading, error, data, fetchMore } = useGetProfileWithPostsQuery({
    variables: {
      getUserProfileGetUserProfileById: profileId as string,
      getAllPostsTimeStamp: null,
      getAllPostsUserId: profileId as string,
    },
  });

  // const [getAllPostsFromUser, { data: postsData, fetchMore: postsFetchMore }] =
  //   useGetAllPostsFromUserLazyQuery({
  //     variables: {
  //       getAllPostsTimeStamp:
  //         data.getAllPosts[data.getAllPosts.length - 1].createdAt || null,
  //       getAllPostsUserId: profileId as string,
  //     },
  //   });

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
        imageUrl={data.getUserProfile.imageUrl}
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
