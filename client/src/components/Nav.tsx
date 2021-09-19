import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <div style={{ border: '1px solid black' }}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      {/* <Link href="/">
        <a>Home</a>
      </Link> */}
    </div>
  );
}
