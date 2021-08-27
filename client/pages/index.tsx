import Header from '../components/Header';

function index() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(apiBaseUrl);
  return (
    <div>
      <Header />
      Hello Next
    </div>
  );
}

export default index;
