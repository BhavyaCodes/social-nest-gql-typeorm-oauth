import { useQuery } from '@apollo/client';
import Header from '../components/Header';
import Posts from '../components/Posts';
import {
  GetAllPostsDocument,
  GetAllPostsQuery,
  GetAllPostsQueryResult,
} from '../lib/queries.graphql';
import { useGetAllPostsQuery } from '../__generated__/lib/queries.graphql';
import PostForm from '../components/PostForm';

function index() {
  const { loading, error, data } = useGetAllPostsQuery();

  if (!data) {
    return <p>Loadiasdng...</p>;
  }
  return (
    <div>
      <Header />
      <PostForm />
      <Posts posts={data.allPosts} />
      Hello Next
    </div>
  );
}

export default index;
