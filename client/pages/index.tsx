import Header from '../components/Header';
import { initializeApollo } from '../lib/apollo';
import { GetAllPostsDocument } from '../lib/queries.graphql';

function index() {
  return (
    <div>
      <Header />
      Hello Next
    </div>
  );
}

export default index;
