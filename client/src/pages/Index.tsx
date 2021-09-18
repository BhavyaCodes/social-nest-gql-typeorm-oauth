// import { useUser } from '../context/user.context';
import Posts from '../components/Posts';
import { useGetAllPostsQuery } from '../__generated__/src/lib/queries.graphql';

export default function Index() {
  // const { user } = useUser();
  // console.log(user);

  const { loading, error, data, fetchMore } = useGetAllPostsQuery({
    variables: { getAllPostsTimeStamp: null },
  });

  if (loading) {
    return <p>loading....</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      {/* <Header /> */}
      {/* <PostForm /> */}
      <Posts posts={data?.getAllPosts!} fetchMore={fetchMore} />
    </div>
  );
}
