import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import Markdown from '../../../components/Markdown';
import { ArticleInfo } from '../../../structures/interface';
import styles from '../../../styles/article.module.css';
interface IProps {
  article: ArticleInfo;
}

const Article: FunctionComponent<IProps> = ({ article }) => {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.article}>
      <div className={styles.thumbnail}>
        <Image
          src={article.meta.thumbnail}
          alt="image"
          width={24}
          height={24}
          objectFit="fill"
          layout="responsive"
        />

        <div className={styles.title}>
          <h1>{article.meta.title}</h1>
        </div>
      </div>

      <div className={styles.content}>
        <Markdown content={article.content} title={article.meta.title} />
      </div>
    </div>
  );
};

const getStaticProps: GetStaticProps = async ({ ...context }) => {
  const { slug } = context.params!;
  const content = fs.readFileSync(`_posts/${slug}.md`).toString();
  const info = matter(content);

  const article = {
    meta: {
      ...info.data,
      slug,
    },
    content: info.content,
  };

  return {
    props: {
      article: article,
    },
    revalidate: 30,
  };
};

const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const files = fs.readdirSync('_posts');
  const paths = files.map((file) => ({ params: { slug: file.split('.')[0] } }));
  return {
    paths,
    fallback: true,
  };
};

export { getStaticPaths, getStaticProps };
export default Article;
