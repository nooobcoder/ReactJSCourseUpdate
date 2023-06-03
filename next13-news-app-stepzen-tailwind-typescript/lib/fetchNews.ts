import sortNewsByImage from "@/curl/sortNewsByImage";
import { gql } from "graphql-request";

const fetchNewsData = async (
  category: Category | string,
  keywords: string,
  isDynamic: boolean
) => {
  // GraphQL query
  const query = gql`
  query MyQuery(
    $access_key:String!
    $categories: String!
    $keywords: String
  )   {
    myQuery(
      access_key: $access_key
      categories: $categories
      keywords: $keywords
      country: "in"
      sort: "published_desc"
    ) 
    {
      data {
        author
        url
        title
        source
        published_at
        language
        image
        description
        country
        category
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }
`;

  // Fetch function with Nextjs 13 caching
  const res = await fetch("https://maroua.stepzen.net/api/nooobcoder-news/__graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Apikey ${process.env.STEPZEN_API_KEY}`
      },
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 60 * 60 * 60 },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        }
      })
    }
  );


  // console.log(
  //   "LOADING NEW DATA FROM API FOR category >>> ",
  //   category,
  //   keywords
  // );
  const newsResponse = await res.json();

  // Sort function by images vs images not present
  const news = sortNewsByImage(newsResponse.data.myQuery);

  // return response
  return news;
};

export default fetchNewsData;
