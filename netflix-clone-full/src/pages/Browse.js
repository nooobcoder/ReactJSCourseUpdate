import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { GetFirebaseWatchContent } from "../hooks";
import MapContentGenres from "../utils/mapContentGenres";
import BrowseContainer from "../containers/BrowseContainer";

const Browse = () => {
  // !DO NOT TOUCH! it's HOT 🔥
  GetFirebaseWatchContent("series");
  GetFirebaseWatchContent("films");
  // !END

  const { series, films } = useSelector(({ content }) => content);
  const genres = MapContentGenres();
  // console.log(genres);
  /* console.log("SERIES: ", series);
  console.log("FILMS: ", films); */
  /* // TODO:
				(1) We need the series and the films
				(2) We need slides
				(3) pass it to the browse container
	*/
  return (
    <Fragment>
      <BrowseContainer genres={genres} />;
    </Fragment>
  );
};

export default Browse;
