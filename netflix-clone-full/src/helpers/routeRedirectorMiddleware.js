import { Route, Redirect } from "react-router-dom";

const IsUserRedirect = ({ user, redirectPath, children, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={() =>
        user ? <Redirect to={{ pathname: redirectPath }} /> : children
      }
    />
  );
};

const ProtectedRoute = ({ user, children, ...restProps }) => (
  <Route
    {...restProps}
    render={({ redirectPath }) =>
      user ? (
        children
      ) : (
        <Redirect to={{ pathname: "signin", state: { from: redirectPath } }} />
      )
    }
  />
);

export { IsUserRedirect, ProtectedRoute };
