import React from 'react';
import { useRouter } from 'next/router';

const Person = () => {
  const { query } = useRouter();
  console.log(query);

  return (
    <h2>
      {query.person}&apos;s {query.vehicle}
    </h2>
  );
};

export default Person;
