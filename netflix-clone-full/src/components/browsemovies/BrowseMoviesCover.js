import React, { useEffect, useState } from "react";
import { Header } from "../";

const getMovieDetails = async () => {
  let resp = await fetch(
    "https://www.omdbapi.com/?t=Joker&plot=full&apikey=74160a36",
    {
      method: "GET",
    }
  );
  const { Title, Plot } = await resp.json();
  return { Title, Plot };
};

const BrowseMoviesCover = () => {
  const [{ Title, Plot }, setMovie] = useState({ Title: null, Plot: null });

  useEffect(() => {
    async function fetchData() {
      setMovie(await getMovieDetails());
    }
    fetchData();
  }, [Plot, Title]);

  console.log(Title, Plot);
  return (
    <Header.Feature>
      <Header.FeatureCallOut>Watch {Title} Now</Header.FeatureCallOut>
      <Header.Text>{Plot}</Header.Text>
      <Header.PlayButton>Play</Header.PlayButton>
    </Header.Feature>
  );
};

export default BrowseMoviesCover;
