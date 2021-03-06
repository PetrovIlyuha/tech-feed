import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    values,
    errors,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/");
    } catch (err) {
      console.error("Authentication error");
      setFirebaseError(err.message);
    }
  }
  return (
    <div>
      <h2 className="mv-3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <>
            <input
              className="custom-input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              name="name"
              type="text"
              placeholder="Your Name"
              autoComplete="off"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </>
        )}
        <input
          style={{
            padding: 10,
            marginBottom: 10,
            border: "none",
            borderRadius: "3px",
            boxShadow: " 2px 0px 8px rgba(0, 0, 0, 0.4)",
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && "error-input"}
          type="email"
          value={values.email}
          name="email"
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          style={{
            padding: 10,
            marginBottom: 10,
            border: "none",
            borderRadius: "3px",
            boxShadow: " 2px 0px 8px rgba(0, 0, 0, 0.4)",
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          password={values.password}
          type="password"
          name="password"
          placeholder="Your password"
          autoComplete="off"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button type="submit" className="custom-button button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="pointer button custom-button"
            style={{ background: isSubmitting ? "orange" : "" }}
            onClick={() => {
              setLogin((login) => !login);
            }}
          >
            {login ? "Need to create an account" : "Already have an Account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Login;
