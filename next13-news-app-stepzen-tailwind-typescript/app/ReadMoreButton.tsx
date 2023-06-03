"use client";

import { useRouter } from "next/navigation";

type Props = {
  article: Article;
};

export default function ReadMoreButton({ article }: Props) {
  const router = useRouter();

  const handleClick = () => {
    // Example: [["title", "Article Title"], ["description", "Article Description"]]
    const queryStringArr = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    // Example: "?title=Article%20Title&description=Article%20Description"
    const queryString = `/article?${queryStringArr}`;

    router.push(queryString);
  };

  return (
    <button
      onClick={handleClick}
      className="h-10 rounded-b-lg bg-orange-400 hover:bg-orange-500 dark:text-gray-900"
    >
      Read More
    </button>
  );
}
