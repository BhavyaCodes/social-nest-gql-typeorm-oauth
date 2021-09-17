import { getUser } from '../context/user.context';
import Nav from './Nav';

export default function Header() {
  const { user } = getUser();
  return (
    <div>
      <Nav />
      <p>Header</p>
      {user && <div>Logged In as {user.name}</div>}
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/google">Login</a>
      )}
    </div>
  );
}
