import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { Header } from "../components";
import { Profiles } from "../components";

const SelectProfileContainer = ({ user, setProfile }) => {
  const { firebaseAuthState } = useSelector(({ app }) => app);
  const { displayName, photoURL, email } = firebaseAuthState;
  return (
    <Fragment>
      <Header bg={false}>
        <Header.Frame>
          <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
        </Header.Frame>
      </Header>

      <Profiles>
        <Profiles.Title>Who's Watching</Profiles.Title>
        <Profiles.List>
          <Profiles.User onClick={() => setProfile({ displayName, photoURL })}>
            <Profiles.Picture src={photoURL} />
            <Profiles.Name>
              {displayName} {email}
            </Profiles.Name>
          </Profiles.User>
        </Profiles.List>
      </Profiles>
    </Fragment>
  );
};

export default SelectProfileContainer;
