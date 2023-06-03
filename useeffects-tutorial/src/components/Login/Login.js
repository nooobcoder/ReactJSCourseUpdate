import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import AuthContext from "../../Store/AuthContext";

import classes from "./Login.module.css";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.includes("@") };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: undefined };
  }
};

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 6 };
    case "INPUT_BLUR":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: undefined };
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("CHECKING FORM VALIDITY!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // Below is a cleanup code, it saves network calls when doing HTTP requests. Read cleanup docs for more information.
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value)
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid)
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6)
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid)
      authContext.onLogin(emailState?.value, passwordState.value);
    else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label={"E-Mail"}
          type={"email"}
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label={"Password"}
          type={"password"}
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
