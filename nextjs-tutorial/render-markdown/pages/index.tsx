import styles from '../styles/Home.module.css';
import { ArticleMeta } from '../structures/interface';
import { FC } from 'react';
import Card from '../components/Card';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import fs from 'fs';

interface IProps {
  articles: ArticleMeta[];
}

const Home: FC<IProps> = ({ articles }) => (
  <div className={styles.container}>
    {articles.map(({ description, slug, thumbnail, title }, i) => (
      <Card key={i} description={description} slug={slug} thumbnail={thumbnail} title={title} />
    ))}
  </div>
);

const getStaticProps: GetStaticProps = (context) => {
  const files = fs.readdirSync('_posts');

  let articles = files.map((file) => {
    const data = fs.readFileSync(`_posts/${file}`).toString();

    return { ...matter(data).data, slug: file.split('.')[0] };
  });

  return { props: { articles }, revalidate: 60 };
};
export { getStaticProps };
export default Home;
