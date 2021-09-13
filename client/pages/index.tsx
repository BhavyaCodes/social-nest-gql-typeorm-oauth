import Header from '../components/Header';
import Posts from '../components/Posts';
import { useGetAllPostsQuery } from '../__generated__/lib/queries.graphql';
import PostForm from '../components/PostForm';

function index() {
  const { loading, error, data, fetchMore } = useGetAllPostsQuery({
    variables: { getAllPostsTimeStamp: null },
  });

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
