export default function sortNewsByImage(news: NewsResponse) {
  const newsWithImage = news.data.filter(n => n.image !== null);
  const newsWithoutImage = news.data.filter(n => n.image === null);

  const sortedNewsResponse = {
    ...news,
    data: [...newsWithImage, ...newsWithoutImage],
  }

  return sortedNewsResponse;
}
