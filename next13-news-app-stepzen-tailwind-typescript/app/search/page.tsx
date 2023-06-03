import sortNewsByImage from "@/curl/sortNewsByImage";
import fetchNewsData from "@/lib/fetchNews";
import response from "@/newssearch.response.json";
import { tinos } from "../fonts";
import NewsList from "../NewsList";

type Props = {
  searchParams: { query: string };
};

async function SearchPage({ searchParams }: Props) {
  const news: NewsResponse =
    process.env.USE_MOCK_DATA === "true"
      ? sortNewsByImage(response)
      : await fetchNewsData("general", searchParams.query, true);

  return (
    <div className={`${tinos.variable}`}>
      <h1 className="headerTitle items-center justify-center text-center font-sans dark:text-black">
        Search Results for: {searchParams.query}
      </h1>
      <NewsList news={news} />
    </div>
  );
}

export default SearchPage;
