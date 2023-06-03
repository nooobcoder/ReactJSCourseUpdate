import { tinos } from "@/app/fonts";
import NewsList from "@/app/NewsList";
import { categories } from "@/constants";
import fetchNewsData from "@/lib/fetchNews";
import sortNewsByImage from "@/curl/sortNewsByImage";
import response from "@/categorynews.response.json";

export async function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

type Props = {
  params: { category: Category };
};

async function NewsCategory({ params: { category } }: Props) {
  const news =
    process.env.USE_MOCK_DATA === "true"
      ? sortNewsByImage(response)
      : await fetchNewsData(category, "", false);

  return (
    <div className={`${tinos.variable}`}>
      <h1 className="headerTitle items-center justify-center text-center font-sans dark:text-black">
        {category}
      </h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;
