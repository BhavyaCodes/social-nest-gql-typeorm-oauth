import Link from 'next/link';
export default function Nav() {
  return (
    <div style={{ border: '1px solid black' }}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      {/* <Link href="/">
        <a>Home</a>
      </Link> */}
    </div>
  );
}
