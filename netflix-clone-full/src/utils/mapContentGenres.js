import { useSelector } from "react-redux";

const provideNonDuplicateGenres = (param) => {
  return [...new Set(param?.map(({ genre }) => genre))].sort(function (a, b) {
    return a.localeCompare(b);
  }); // Get, arrays of genres and sort alphabetically
};

const MapContentGenres = () => {
  const { series, films } = useSelector(({ content }) => content);
  const genres = {
    series: provideNonDuplicateGenres(series),
    films: provideNonDuplicateGenres(films),
  };
  return genres;
};
export default MapContentGenres;
