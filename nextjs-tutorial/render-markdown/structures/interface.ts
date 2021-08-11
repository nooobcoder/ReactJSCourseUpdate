interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface ArticleInfo {
  meta: ArticleMeta;
  content: string;
}

export type { ArticleInfo, ArticleMeta };
