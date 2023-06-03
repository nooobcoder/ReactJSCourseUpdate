import Link from "next/link";
import { Image, StructuredText } from "react-datocms";
import { request } from "../../lib/datocms";
import styles from "../../styles/BlogPost.module.css";

export default function BlogPost(props) {
  const { postData } = props;
  return (
    <div className={styles.container}>
      <div style={{ maxWidth: "600px", marginTop: "20px" }}>
        <Image data={postData.coverImage.responsiveImage} />
        <h1>{postData.title}</h1>
        <p>
          {postData.author.name} / {postData.publishDate}
        </p>
        <StructuredText
          data={postData.content}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case "ImageRecord":
                return <Image data={record.image.responsiveImage} />;
              default:
                return null;
            }
          }}
        />
        <div style={{ marginTop: "50px" }}>
          <Link href="/">
            <a>⬅️&nbsp;&nbsp;Back to the frontpage</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

const PATHS_QUERY = `
  query AllPaths {
    allArticles {
      slug
    }
  }
`;

export const getStaticPaths = async () => {
  const sluqQuery = await request({
    query: PATHS_QUERY,
  });

  let paths = [];
  sluqQuery.allArticles.map((p) => paths.push(`/blog/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
};

const ARTICLE_QUERY = `
  query ArticleQuery($slug: String) {
    article(filter: {slug: {eq: $slug}}) {
      author {
        name
      }
      content {
        value
      }
      coverImage {
        responsiveImage {
          alt
          aspectRatio
          base64
          bgColor
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
        }
      }
      id
      publishDate
      slug
      title
    }
  }
`;

export const getStaticProps = async ({ params }) => {
  const graphqlRequest = {
    query: ARTICLE_QUERY,
    variables: { slug: params.slug },
  };

  const post = await request(graphqlRequest);

  return {
    props: {
      postData: post.article,
    },
    revalidate: 120,
  };
};
