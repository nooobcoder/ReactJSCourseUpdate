import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { getCategories } from '../../services';

function Categories() {
  const [categories, setCateqories] = useState([]);
  useEffect(() => {
    const categories = async () => {
      const newCategories = await getCategories();
      setCateqories(newCategories);
    };
    categories();
  }, []);

  return (
    <div className={'bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'}>
      <h3 className={'text-xl mb-8 font-semibold border-b pb-4'}>Categories</h3>
      {categories.map(({ slug, name }) => (
        <Link key={slug} href={`/category/${slug}`} passHref>
          <span className="cursor-pointer block pb-3 mb-3">{name}</span>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
