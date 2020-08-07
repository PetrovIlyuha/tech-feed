import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";

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
  } = useFormValidation(INITIAL_STATE, validateLogin);
  const [login, setLogin] = useState(false);

  return (
    <div>
      <h2 className="mv-3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <>
            <input
              className="login-input"
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
        <div className="flex mt3">
          <button type="submit" className="login-button button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="pointer button login-button"
            style={{ background: isSubmitting ? "orange" : "" }}
            onClick={() => setLogin((login) => !login)}
          >
            {login ? "Need to create an account" : "Already have an Account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
