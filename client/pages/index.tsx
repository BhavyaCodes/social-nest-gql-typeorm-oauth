import { useQuery } from '@apollo/client';
import Header from '../components/Header';
import { initializeApollo } from '../lib/apollo';
import { GetAllPostsDocument } from '../lib/queries.graphql';

function index() {
  const { loading, error, data } = useQuery(GetAllPostsDocument);
  console.log(loading);
  console.log(error);
  console.log(data);
  return (
    <div>
      <Header />
      Hello Next
    </div>
  );
}

export default index;
