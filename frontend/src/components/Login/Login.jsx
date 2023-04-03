import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // do something with the response data
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    let cardLoginSignup = document.querySelector(
      ".card-section.login-box"
    );
    if (window.matchMedia("(max-width: 767px)").matches) {
      cardLoginSignup.setAttribute(
        "style",
        `width:${window.innerWidth - 50}px`
      );
    } else {
      console.log("card size is in window");
    }
  }, []);

  return (
    <section className="form-section login-box">
      <div className="form-section-inner">
        <div className="container card-section-login-wrapper">
          <div className="card-section login-box">
            <h2 className="heading-title">Login Form</h2>
            <form onSubmit={handleLogin}>
              <Input
                inputId={"inputEmail"}
                type="text"
                name="email"
                labelClassName={"email-label"}
                labelText={"Email"}
                parentWrapperClass={"login-form"}
                changeEvent={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Input
                inputId={"inputPassword"}
                type="password"
                name="password"
                labelClassName={"password-label"}
                labelText={"Password"}
                parentWrapperClass={"login-form"}
                changeEvent={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <a
                href="/forget-password.html"
                className="forget-password dsp-none"
              >
                Forget Password?
              </a>
              <div className="d-flex form-flex-wrapper btn-div jus-center">
                <Button
                  className="btn btn-primary btn-lg btn-color login-btn"
                  type="submit"
                  btnText={"Login"}
                />
                <Button
                  className="btn btn-secondary btn-lg btn-color cancel-btn"
                  type="button"
                  btnText={"Cancel"}
                />
              </div>
              <p className="text-center">
                Don't have an account?{" "}
                <Link to="/Signup" className="forget-password">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
