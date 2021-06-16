import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import * as ROUTES from "./constants/routes";
import { Browse, Home, Signin, Signup } from "./pages";

const App = () => {
  return (
    <Router>
      <AnimatedCursor
        innerSize={8}
        outerSize={9}
        color="229, 9, 20"
        outerAlpha={0.1}
        innerScale={0.7}
        outerScale={4}
      />
      <Switch>
        <Route exact path={ROUTES.BROWSE}>
          <Browse />
        </Route>
        <Route exact path={ROUTES.SIGN_IN}>
          <Signin />
        </Route>
        <Route exact path={ROUTES.SIGN_UP}>
          <Signup />
        </Route>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
