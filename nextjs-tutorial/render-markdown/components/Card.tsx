import React, { FC } from 'react';
import { ArticleMeta } from '../structures/interface';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/card.module.css';

const Card: FC<ArticleMeta> = ({ description, slug, thumbnail, title }) => (
  <Link href={`blog/article/${slug}`}>
    <div className={styles.card}>
      {thumbnail && (
        <Image src={thumbnail} width={24} height={24} objectFit="fill" layout="responsive" />
      )}
      <div className={styles.info}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  </Link>
);

export default Card;
