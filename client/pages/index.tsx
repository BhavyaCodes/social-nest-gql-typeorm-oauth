function index() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(apiBaseUrl);
  return (
    <div>
      Hello Next
      <a href={`${apiBaseUrl}/auth/google`}>Login</a>
      <a href={`${apiBaseUrl}/auth/logout`}>Logout</a>
    </div>
  );
}

export default index;
