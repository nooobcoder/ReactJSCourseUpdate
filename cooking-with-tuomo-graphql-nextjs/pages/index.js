import Head from "next/head";
import Link from "next/link";
import { Image } from "react-datocms";
import { request } from "../lib/datocms";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const posts = data.allArticles;

  return (
    <div className={styles.container}>
      <Head>
        <title>Cooking with nooobcoder</title>
      </Head>
      <div>
        <h1>Cooking w/ nooobcoder</h1>
      </div>
      <div>
        {posts.map((p) => (
          <BlogPostPreview key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}

const BlogPostPreview = (props) => {
  const { data } = props;
  return (
    <div style={{ maxWidth: "400px", marginBottom: "50px" }}>
      <Image
        data={data.coverImage.responsiveImage}
        alt={data.coverImage.responsiveImage.alt}
      />
      <h2>
        <Link href={`/blog/${data.slug}`}>
          <a>{data.title}</a>
        </Link>
      </h2>
      <div>{data.publishDate}</div>
      <p>{data.excerpt}</p>
      <div style={{ fontWeight: "bold" }}>{data.author.name}</div>
    </div>
  );
};

const HOMEPAGE_QUERY = `
query Articles {
  allArticles {
    title
    author {
      name
    }
    content {
      value
    }
    coverImage {
      responsiveImage {
        alt
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
      }
    }
    excerpt
    id
    publishDate
    slug
  }
}
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data },
  };
}
