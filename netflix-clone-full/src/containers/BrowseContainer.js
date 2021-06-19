import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Loading } from "../components";
import { setCurrentProfile, setLoading } from "../context/appSlice";
import mouseClickAudio from "../assets/audio/mouse-click-sound.mp3";
import SelectProfileContainer from "./SelectProfileContainer";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { firebaseConnection as firebase } from "../lib/firebase.prod";
import BrowseMoviesCover from "../components/browsemovies/BrowseMoviesCover";

const BrowseContainer = ({ genres }) => {
  const { firebaseAuthState, currentUserProfile, loading } = useSelector(
    ({ app }) => app
  );

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

  return currentUserProfile?.displayName ? (
    <Fragment>
      {loading ? (
        <Loading src={currentUserProfile.photoURL} />
      ) : (
        <Loading.ReleaseBody />
      )}

      <Header
        src="joker1"
        // dontShowOnSmallViewPort
      >
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
            <Header.TextLink
            // active={category === "series" ? "true" : "false"}
            // onClick={() => setCategory("series")}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
            // active={category === "films" ? "true" : "false"}
            // onClick={() => setCategory("films")}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
            // searchTerm={searchTerm}
            // setSearchTerm={stSearchTerm}
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
    </Fragment>
  ) : (
    <SelectProfileContainer setProfile={(user) => setcurrentProfile(user)} />
  );
};

export default BrowseContainer;
