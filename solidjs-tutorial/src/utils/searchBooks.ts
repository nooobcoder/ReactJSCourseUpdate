export async function searchBooks(query: string): Promise<any> {
  if (query.trim() === "") return [];

  const resp = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const results = await resp.json();
  return results.docs.slice(0, 10).map(({ title, author_name }: any) => ({
    title,
    author: author_name?.join(", "),
  }));
}
