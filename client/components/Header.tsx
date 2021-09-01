import { getUser } from '../context/user.context';
import Nav from './Nav';

export default function Header() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { user } = getUser();
  return (
    <div>
      <Nav />
      <p>Header</p>
      {user && <div>Logged In as {user.name}</div>}
      {user ? (
        <a href={`${apiBaseUrl}/auth/logout`}>Logout</a>
      ) : (
        <a href={`${apiBaseUrl}/auth/google`}>Login</a>
      )}
    </div>
  );
}
