import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components";
import { setCurrentProfile, setLoading } from "../context/appSlice";
import SelectProfileContainer from "./SelectProfileContainer";

const BrowseContainer = ({ genres }) => {
  const { firebaseAuthState, currentUserProfile, loading } = useSelector(
    ({ app }) => app
  );
  const { displayName, photoURL, email } = firebaseAuthState;
  const actionDispatcher = useDispatch();
  const setcurrentProfile = (user) => {
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
    </Fragment>
  ) : (
    <SelectProfileContainer setProfile={(user) => setcurrentProfile(user)} />
  );
};

export default BrowseContainer;
