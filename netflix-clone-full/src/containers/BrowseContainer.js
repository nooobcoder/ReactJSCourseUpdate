import SelectProfileContainer from "./SelectProfileContainer";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentProfile, setLoading } from "../context/appSlice";
import { Loading } from "../components";

const BrowseContainer = ({ genres }) => {
  const { currentUserProfile, loading } = useSelector(({ app }) => app);

  const actionDispatcher = useDispatch();
  const setcurrentProfile = (user) => {
    actionDispatcher(setCurrentProfile(user));
    actionDispatcher(setLoading(true));
  };

  useEffect(() => {
    setTimeout(() => {
      actionDispatcher(setLoading(false));
    }, 3000);
  }, [currentUserProfile]);

  return (
    <Fragment>
      {loading ? (
        <Loading src={currentUserProfile.photoURL} />
      ) : (
        <Loading.ReleaseBody />
      )}

      <SelectProfileContainer setProfile={(user) => setcurrentProfile(user)} />
    </Fragment>
  );
};

export default BrowseContainer;
