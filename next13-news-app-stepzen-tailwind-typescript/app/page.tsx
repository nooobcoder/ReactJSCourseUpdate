import { categories } from "@/constants";
import sortNewsByImage from "@/curl/sortNewsByImage";
import fetchNewsData from "@/lib/fetchNews";
import NewsList from "./NewsList";
import response from "@/response.json";

interface Props {
  params: {
    slug: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const HomePage = async ({ params, searchParams }: Props) => {
  const categoriesJoined = categories.join(",");
  const news: NewsResponse =
    process.env.USE_MOCK_DATA === "true"
      ? sortNewsByImage(response)
      : await fetchNewsData(categoriesJoined, "", false);

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
};

export default HomePage;
