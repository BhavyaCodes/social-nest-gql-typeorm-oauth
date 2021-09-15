import Header from '../components/Header';
import Posts from '../components/Posts';
import {
  useGetAllPostsQuery,
  // useGetUserProfileQuery,
} from '../__generated__/lib/queries.graphql';
import PostForm from '../components/PostForm';

function index() {
  const { loading, error, data, fetchMore } = useGetAllPostsQuery({
    variables: { getAllPostsTimeStamp: null },
  });

  // const getUserProfileQueryResult = useGetUserProfileQuery({
  //   variables: {
  //     getUserProfileGetUserProfileById: '9b2676d0-e55f-4f65-8606-e10e92b8190b',
  //     postsTimeStamp: null,
  //   },
  // });

  if (!data) {
    return <p>Loadiasdng...</p>;
  }
  return (
    <div>
      <Header />
      <PostForm />
      <Posts posts={data.getAllPosts} fetchMore={fetchMore} />
    </div>
  );
}

export default index;
