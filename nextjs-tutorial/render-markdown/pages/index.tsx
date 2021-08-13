import styles from '../styles/Home.module.css';
import { ArticleMeta } from '../structures/interface';
import { FC } from 'react';
import Card from '../components/Card';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import supabase from '../supabase/supaClient';
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

const getStaticProps: GetStaticProps = async (context) => {
  /* const { data: blogs_info, error } = await supabase.from('blogs_info').select('*'); */
  /*
[
  {
    seq_no: 1,
    filename: 'two.md',
    file_url: 'https://qvcrluuvaonuknkyamaz.supabase.in/storage/v1/object/public/blogs/two.md'
  },
  {
    seq_no: 2,
    filename: 'one.md',
    file_url: 'https://qvcrluuvaonuknkyamaz.supabase.in/storage/v1/object/public/blogs/one.md'
  }
]
 */
  const files = fs.readdirSync('_posts');

  let articles = files.map((file) => {
    const data = fs.readFileSync(`_posts/${file}`).toString();

    return { ...matter(data).data, slug: file.split('.')[0] };
  });

  return { props: { articles }, revalidate: 60 };
};
export { getStaticProps };
export default Home;
