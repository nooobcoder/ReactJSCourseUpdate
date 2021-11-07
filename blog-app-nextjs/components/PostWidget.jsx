import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { shimmer, toBase64 } from '../helpers';
import { getRecentPosts, getSimilarPosts } from '../services';

function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const setPosts = async () =>
      setRelatedPosts(slug ? await getSimilarPosts(categories, slug) : await getRecentPosts());
    setPosts();
  }, [slug, categories]);
  return (
    <div className={'bg-white shadow-lg rounded-lg p-8 mb-8'}>
      <h3 className={'text-xl mb-8 font-semibold border-b pb-4'}>{`${slug ? 'Related' : 'Recent'} Posts`}</h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className={'flex items-center w-full mb-4'}>
          <div className={'w-16 flex-none'}>
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              height={'50px'}
              width={'50px'}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              placeholder="blur"
              className={'align-middle rounded-full'}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className={'text-gray-500'}>{moment(post.createdAt).format('DD, MMM YYYY')}</p>
            <Link href={`/post/${post.slug}`} key={post.title} passHref={true}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostWidget;
