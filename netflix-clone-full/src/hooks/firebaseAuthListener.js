import { useEffect } from "react";
import { setAuthState } from "../context/appSlice";
import { useDispatch } from "react-redux";
import { firebaseConnection } from "../lib/firebase.prod";

const FirebaseAuthStateListener = () => {
  const appStateDispatch = useDispatch();

  useEffect(() => {
    const hooker = firebaseConnection.auth().onAuthStateChanged((user) => {
      if (user) {
        appStateDispatch(setAuthState(user));
      } else {
        setAuthState({
          firebaseAuthState: undefined,
          isAuthenticated: undefined,
        });
      }

      return () => hooker(); // Cleanup job
    });
  }, [appStateDispatch]);
};

export default FirebaseAuthStateListener;
