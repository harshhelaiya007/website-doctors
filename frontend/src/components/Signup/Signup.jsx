import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./Signup.css";
import { useHistory } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");

  const [disableStatus, setDisableStatus] = useState(true);
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [hq, setHq] = useState("");
  const [fsoName, setFsoName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (
      username !== "" &&
      password !== "" &&
      email !== "" &&
      hq !== "" &&
      fsoName !== ""
    ) {
      setDisableStatus(false);
    } else {
      setDisableStatus(true);
    }

    return () => {};
  }, [email, password, username, region, hq, fsoName]);

  const showSuccess = (inputEle) => {
    console.log("comes under success");
    inputEle.parentNode.parentNode.classList.add("valid");
    inputEle.parentNode.parentNode.classList.remove("error");
    inputEle.classList.add("valid");
    inputEle.classList.remove("error");
    inputEle.parentNode.nextElementSibling.classList.remove("show");
    inputEle.parentNode.nextElementSibling.querySelector("p").textContent = "";
    inputEle.parentNode.parentNode.classList.remove("error-show");
  };

  const showError = (inputEle, msg) => {
    console.log("comes under error");
    inputEle.parentNode.parentNode.classList.add("error");
    inputEle.parentNode.parentNode.classList.remove("valid");
    inputEle.classList.add("error");
    inputEle.classList.remove("valid");
    inputEle.parentNode.nextElementSibling.classList.add("show");
    inputEle.parentNode.nextElementSibling.querySelector("p").textContent = msg;
    inputEle.parentNode.parentNode.classList.add("error-show");
  };

  const showRequired = (inputEle, requiredMsg, validationMsg) => {
    if (inputEle.value == "") {
      showError(inputEle, requiredMsg);
    } else {
      showError(inputEle, validationMsg);
    }
  };

  const buttonDisable = (inputEle) => {
    if (inputEle.classList.contains("error") || inputEle.value == "") {
      document.querySelector(".btn.btn-color.signUp-btn").disabled = true;
    } else {
      const inputFields = document.querySelectorAll("input.input-field");
      inputFields.forEach((ele) => {
        if (ele.classList.contains("valid")) {
          document.querySelector(".btn.btn-color.signUp-btn").disabled = false;
        } else {
          document.querySelector(".btn.btn-color.signUp-btn").disabled = true;
        }
      });
    }
  };

  // name field validation
  const handleName = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "") {
      // showSuccess(e.target);
      setUsername(inputValue);
    } else {
      showRequired(e.target, "Name is Required.", "Please Enter Valid Name.");
    }
  };

  const handleFsoName = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "") {
      showSuccess(e.target);
      setFsoName(inputValue);
    } else {
      showRequired(e.target, "Name is Required.", "Please Enter Valid Name.");
    }
  };

  // email validation
  const handleEmail = (e) => {
    let emailRegx = /\S+@\S+\.\S+/;
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "" && emailRegx.test(inputValue)) {
      showSuccess(e.target);
      setEmail(inputValue);
    } else {
      showRequired(
        e.target,
        "Email is Required.",
        "Please Enter Valid Email Address."
      );
    }
  };

  const handleRegion = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "") {
      showSuccess(e.target);
      setRegion(inputValue);
    } else {
      showError(e.target, "Region is Required", "Please Enter Valid Region.");
    }
  };

  const handleHq = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "") {
      showSuccess(e.target);
      setHq(inputValue);
    } else {
      showError(e.target, "HQ is Required", "Please Enter Valid HQ.");
    }
  };

  const handlePassword = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "") {
      showSuccess(e.target);
      setPassword(inputValue);
    } else {
      showError(
        e.target,
        "Password is Required",
        "Please Enter Valid Password."
      );
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    var loaderEle = document.querySelector(".lds-dual-ring");
    loaderEle.classList.add("active");
    document.querySelector(".form-section.login-box").classList.add("dsp-none");
    document.querySelector(".header").classList.add("dsp-none");

    axios
      .post("/register", {
        username: username,
        email: email,
        region: region,
        hq: hq,
        fsoname: fsoName,
        password: password,
      })
      .then((response) => {
        // do something with the response data
        console.log(response.data);
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document
          .querySelector(".form-section.login-box")
          .classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        history.push("/Login");
      })
      .catch((error) => {
        console.log(error.response);
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document
          .querySelector(".form-section.login-box")
          .classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        if (error.response.status === 400) {
          alert("BAD REQUEST");
        } else {
          alert("Server Error");
        }
        history.push("/Signup");
      });
  };

  useEffect(() => {
    let cardLoginSignup = document.querySelector(
      ".card-section.login-box.signup"
    );
    if (window.matchMedia("(max-width: 767px)").matches) {
      cardLoginSignup.setAttribute(
        "style",
        `width:${window.innerWidth - 50}px`
      );
    }
  }, []);

  return (
    <section className="form-section login-box signup">
      <div className="form-section-inner signup">
        <div className="container card-section-login-wrapper">
          <div className="card-section login-box signup">
            <h2 className="heading-title">Sign Up Form</h2>
            <form onSubmit={handleSignup}>
              <Input
                inputId={"inputUserName"}
                type="number"
                name="employeeid"
                labelClassName={""}
                labelText={"Employee ID"}
                parentWrapperClass={"login-form"}
                changeEvent={handleName}
              />
              <Input
                inputId={"inputEmail"}
                type="text"
                name="email"
                labelClassName={""}
                labelText={"Email"}
                parentWrapperClass={"login-form"}
                changeEvent={handleEmail}
              />
              <Input
                inputId={"inputRegion"}
                type="text"
                name="region"
                labelClassName={""}
                labelText={"Region"}
                parentWrapperClass={"login-form"}
                changeEvent={handleRegion}
              />
              <Input
                inputId={"inputHQ"}
                type="text"
                name="hq"
                labelClassName={""}
                labelText={"HQ"}
                parentWrapperClass={"login-form"}
                changeEvent={handleHq}
              />
              <Input
                inputId={"inputFSOName"}
                type="text"
                name="fsoName"
                labelClassName={""}
                labelText={"FSO Name"}
                parentWrapperClass={"login-form"}
                changeEvent={handleFsoName}
              />
              <Input
                inputId={"inputPassword"}
                type="number"
                name="password"
                labelClassName={""}
                labelText={"Password"}
                parentWrapperClass={"login-form"}
                changeEvent={handlePassword}
              />
              {/* <Input
                inputId={"inputConfirmPassword"}
                type="password"
                name="confirmPassword"
                labelClassName={""}
                labelText={"Confirm Password"}
                parentWrapperClass={"login-form"}
              /> */}
              <div className="d-flex form-flex-wrapper btn-div jus-center">
                <Button
                  className="btn btn-primary btn-lg btn-color signUp-btn"
                  type="submit"
                  btnText={"Sign Up"}
                  disabled={disableStatus}
                />
                <Button
                  className="btn btn-secondary btn-lg btn-color cancel-btn"
                  type="button"
                  btnText={"Cancel"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
