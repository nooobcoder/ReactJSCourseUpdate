import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import * as ROUTES from "./constants/routes";
import {
  IsUserRedirect,
  ProtectedRoute,
} from "./helpers/routeRedirectorMiddleware";
import { Browse, Home, Signin, Signup } from "./pages";
import { FirebaseAuthStateListener } from "./hooks";

const App = () => {
  const { firebaseAuthState } = useSelector(({ app }) => app);
  // console.log("Is Authenticated? ", isAuthenticated);
  FirebaseAuthStateListener();

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
