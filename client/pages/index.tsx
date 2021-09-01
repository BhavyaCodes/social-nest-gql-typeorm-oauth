import { useQuery } from '@apollo/client';
import Header from '../components/Header';
import Posts from '../components/Posts';
import {
  GetAllPostsDocument,
  GetAllPostsQuery,
  GetAllPostsQueryResult,
} from '../lib/queries.graphql';
import { useGetAllPostsQuery } from '../__generated__/lib/queries.graphql';

function index() {
  const { loading, error, data } = useGetAllPostsQuery();
  // const { loading, error, data } =
  //   useQuery<GetAllPostsQuery>(GetAllPostsDocument);
  // console.log(loading);
  // console.log(error);
  console.log(data);
  if (!data) {
    return <p>Loadiasdng...</p>;
  }
  return (
    <div>
      <Header />
      <Posts posts={data.allPosts} />
      Hello Next
    </div>
  );
}

export default index;
