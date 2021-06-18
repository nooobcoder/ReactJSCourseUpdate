import React, { Fragment, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Spinner } from "../components";
import { BROWSE } from "../constants/routes";
import FooterContainer from "../containers/FooterContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { setAuthState, toggleLoading } from "../context/appSlice";
import { FirebaseContext } from "../context/firebaseContext";

const Signup = () => {
  const history = useHistory();
  const { firebaseConnection } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let isInvalid =
    firstName.trim() === "" ||
    password.trim() === "" ||
    emailAddress.trim() === "";

  const globalAppState = useSelector((state) => state.app);
  const stateDispatch = useDispatch();

  const checkDisposableEmail = async () => {
    const apiResp = await fetch(
      `https://open.kickbox.com/v1/disposable/${encodeURIComponent(
        emailAddress.trim()
      )}`,
      {
        method: "GET",
      }
    );
    const { disposable: isDisposable } = await apiResp.json();
    isInvalid = isDisposable === true ? true : false;
    isDisposable &&
      setError("👀 Seems like you are using a disposable email id provider!");
    return isDisposable;
  };

  const checkValidEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const handleSignup = async (event) => {
    setError(null);
    event.preventDefault();
    // stateDispatch(toggleLoading());
    console.log("FORM INVALID? ", isInvalid);
    checkDisposableEmail();
    !checkValidEmail() && (isInvalid = true);
    isInvalid && setError("Invalid Email Address");

    // Firebase Stuff
    try {
      stateDispatch(toggleLoading());
      const authTask = await firebaseConnection
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

      await authTask.user.updateProfile({
        displayName: firstName,
        photoURL: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      });
      stateDispatch(toggleLoading());
      stateDispatch(setAuthState(authTask));
      history.push(BROWSE);
    } catch (error) {
      stateDispatch(toggleLoading());

      setFirstName("");
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  const FormContent = globalAppState.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Form.Title>Sign Up</Form.Title>
      {error && <Form.Error>{error}</Form.Error>}
      <Form.Base onSubmit={(e) => handleSignup(e)} method="POST">
        <Form.Input
          placeholder="First Name"
          value={firstName}
          onChange={({ target }) => {
            setFirstName(target.value);
          }}
        />
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
        <Form.Submit disabled={""} type="submit">
          Sign Up
        </Form.Submit>
      </Form.Base>
    </Fragment>
  );

  return (
    <Fragment>
      <HeaderContainer>
        <Form>
          {FormContent}
          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </Fragment>
  );
};

export default Signup;
