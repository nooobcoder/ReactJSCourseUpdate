import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import mouseClickAudio from "../assets/audio/mouse-click-sound.mp3";
import { Card, Header, Loading, Player } from "../components";
import BrowseMoviesCover from "../components/browsemovies/BrowseMoviesCover";
import * as ROUTES from "../constants/routes";
import { setCurrentProfile, setLoading } from "../context/appSlice";
import { firebaseConnection as firebase } from "../lib/firebase.prod";
import logo from "../logo.svg";
import SelectProfileContainer from "./SelectProfileContainer";

const BrowseContainer = ({ genres }) => {
  const { firebaseAuthState, currentUserProfile, loading } = useSelector(
    ({ app }) => app
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("series");
  const [slideRows, setSlideRows] = useState([]);

  const actionDispatcher = useDispatch();
  const setcurrentProfile = (user) => {
    new Audio(mouseClickAudio).play();

    actionDispatcher(setCurrentProfile(user));
    actionDispatcher(setLoading(true));
  };

  useEffect(() => {
    const time = setTimeout(() => {
      actionDispatcher(setLoading(false));
    }, 3000);

    return () => clearTimeout(time); // cleaner function
  }, [currentUserProfile, actionDispatcher]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: ["data.description", "data.title", "data.genre"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);
    console.log(results);
    if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(genres[category]);
    }
  }, [searchTerm]);

  useEffect(() => {
    setSlideRows(genres[category]);
  }, [category, genres]);

  return currentUserProfile?.displayName ? (
    <Fragment>
      {loading ? (
        <Loading src={currentUserProfile.photoURL} />
      ) : (
        <Loading.ReleaseBody />
      )}

      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
            <Header.TextLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === "films" ? "true" : "false"}
              onClick={() => setCategory("films")}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={currentUserProfile.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={currentUserProfile.photoURL} />
                  <Header.TextLink>
                    {currentUserProfile.displayName}
                  </Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <BrowseMoviesCover />
      </Header>

      <Card.Group>
        {slideRows.map((slideItem) => {
          return (
            <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
              <Card.Title>{slideItem.title}</Card.Title>
              <Card.Entities>
                {slideItem.data.map((item) => {
                  return (
                    <Card.Item key={item.docId} item={item}>
                      <Card.Image
                        src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                      />
                      <Card.Meta>
                        <Card.SubTitle>{item.title}</Card.SubTitle>
                        <Card.Text>{item.description}</Card.Text>
                      </Card.Meta>
                    </Card.Item>
                  );
                })}
              </Card.Entities>
              <Card.Feature category={category}>
                <Player>
                  <Player.Button />
                  <Player.Video src="/videos/bunny.mp4" />
                </Player>
              </Card.Feature>
            </Card>
          );
        })}
      </Card.Group>
    </Fragment>
  ) : (
    <SelectProfileContainer setProfile={(user) => setcurrentProfile(user)} />
  );
};

export default BrowseContainer;
