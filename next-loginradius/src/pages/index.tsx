import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </div>
  );
}
