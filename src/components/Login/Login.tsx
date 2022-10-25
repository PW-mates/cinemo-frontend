import { FormEvent, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Login.module.css";
import { authAction } from "../../store/auth";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail: string = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    console.log(enteredEmail, enteredPassword);

    dispatch(authAction.login());
    history.replace("/");
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      {/* <h1></h1> */}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="username" id="username" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {/* {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )} */}
          <button>{isLogin ? "Login" : "Create Account"}</button>
          {/* {isLoading && <p>Sending request...</p>} */}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
