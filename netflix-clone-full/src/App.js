import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import * as ROUTES from "./constants/routes";
import { Browse, Home, Signin, Signup } from "./pages";
import {
  IsUserRedirect,
  ProtectedRoute,
} from "./helpers/routeRedirectorMiddleware";
import { setAuthState } from "./context/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { firebaseConnection } from "./lib/firebase.prod";

const App = () => {
  const { firebaseAuthState, isAuthenticated } = useSelector(({ app }) => app);
  const appStateDispatch = useDispatch();
  // console.log("Is Authenticated? ", isAuthenticated);

  useEffect(() => {
    const getLoggedInUser = async () => {
      firebaseConnection.auth().onAuthStateChanged((user) => {
        if (user) {
          appStateDispatch(setAuthState(user));
        } else {
          setAuthState({
            firebaseAuthState: undefined,
            isAuthenticated: undefined,
          });
        }
      });
    };
    getLoggedInUser();
  }, [appStateDispatch]);

  return (
    <Router>
      <Switch>
        <Route path={ROUTES.HOME} exact>
          <Home />
        </Route>
        <IsUserRedirect
          user={firebaseAuthState}
          redirectPath={ROUTES.BROWSE}
          exact
          path={ROUTES.SIGN_IN}
        >
          <Signin />
        </IsUserRedirect>
        <IsUserRedirect
          user={firebaseAuthState}
          redirectPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
          exact
        >
          <Signup />
        </IsUserRedirect>

        <ProtectedRoute user={firebaseAuthState} redirectPath={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute>

        <IsUserRedirect
          user={firebaseAuthState}
          redirectPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
        >
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
};

export default App;
