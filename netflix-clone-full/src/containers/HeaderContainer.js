import { useEffect, useState } from "react";
import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { useSelector } from "react-redux";

const HeaderContainer = ({ children }) => {
  const { isAuthenticated } = useSelector(({ app }) => app);
  const [signInOrBrowse, setSignInButton] = useState(
    <Header.ButtonLink to={ROUTES.HOME}>Loading</Header.ButtonLink>
  );

  useEffect(() => {
    isAuthenticated
      ? setSignInButton(
          <Header.ButtonLink to={ROUTES.BROWSE}>Browse</Header.ButtonLink>
        )
      : setSignInButton(
          <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>
        );
  }, [isAuthenticated]);

  return (
    <Header>
      <Header.Frame>
        <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
        {/* <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink> */}
        {signInOrBrowse}
      </Header.Frame>
      {children}
    </Header>
  );
};

export default HeaderContainer;
