import React, { Fragment, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Spinner } from "../components";
import { BROWSE } from "../constants/routes";
import FooterContainer from "../containers/FooterContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { setAuthState, toggleLoading } from "../context/appSlice";
import { FirebaseContext } from "../context/firebaseContext";

const Signin = () => {
  const history = useHistory();
  const globalAppState = useSelector((state) => state.app);
  const stateDispatch = useDispatch();

  const { firebaseConnection } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let isInvalid = password.trim() === "" || emailAddress.trim() === "";

  const checkValidEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const handleSignIn = async (event) => {
    event.preventDefault(); //Prevents form submission
    stateDispatch(toggleLoading());
    console.log("FORM INVALID? ", isInvalid);
    !checkValidEmail() && (isInvalid = true);
    isInvalid && setError("Invalid Email Address");

    // if !isInvalid then perform form submission

    // TODO: Firebase Stuff Here
    try {
      const authTask = await firebaseConnection
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);

      // Success, redirect user to browse page
      console.log(authTask);
      stateDispatch(setAuthState(authTask));

      history.push(BROWSE);
    } catch (error) {
      stateDispatch(toggleLoading());

      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  const FormContent = globalAppState.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Form.Title>Sign In</Form.Title>
      {error && <Form.Error>{error}</Form.Error>}
      <Form.Base onSubmit={(e) => handleSignIn(e)} method="POST">
        <Form.Input
          placeholder="Email address"
          value={emailAddress}
          onChange={({ target }) => {
            setEmailAddress(target.value);
          }}
        />
        <Form.Input
          placeholder="Password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Form.Submit disabled={isInvalid} type="submit">
          Sign In
        </Form.Submit>
      </Form.Base>
    </Fragment>
  );
  return (
    <Fragment>
      <HeaderContainer>
        <Form>{FormContent}</Form>
      </HeaderContainer>
      <FooterContainer />
    </Fragment>
  );
};

export default Signin;
