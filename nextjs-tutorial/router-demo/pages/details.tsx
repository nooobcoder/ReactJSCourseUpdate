import React from 'react';
import Link from 'next/link';

interface PeopleType {
  v: string;
  name: string;
}

const people: Array<PeopleType> = [
  { v: 'car', name: 'Ankur' },
  { v: 'bike', name: 'Julia' },
  { v: 'bicycle', name: 'Thomas' },
];

const Details = () => (
  <>
    {people.map(({ v, name }) => (
      <>
        <Link href={`/${v}/${name}`} key={`${v}-${name}-${Math.random()}`}>
          <a>
            {name}&apos;s {v}
          </a>
        </Link>
        <br />
      </>
    ))}
  </>
);

export default Details;
