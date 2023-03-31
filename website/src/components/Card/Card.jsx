import { React, useState, useEffect } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

function Card({ keyId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [region, setRegion] = useState("");
  const [hq, setHq] = useState("");
  const [image, setImage] = useState(null);

  const showSuccess = (inputEle) => {
    inputEle.parentNode.parentNode.classList.add("valid");
    inputEle.parentNode.parentNode.classList.remove("error");
    inputEle.classList.add("valid");
    inputEle.classList.remove("error");
    inputEle.parentNode.nextElementSibling.classList.remove("show");
    inputEle.parentNode.nextElementSibling.querySelector("p").textContent = "";
    inputEle.parentNode.parentNode.classList.remove("error-show");
  };

  const showError = (inputEle, msg) => {
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
      document.querySelector(".btn.btn-color.submit-btn").disabled = true;
    } else {
      const inputFields = document.querySelectorAll("input.input-field");
      inputFields.forEach((ele) => {
        if (ele.classList.contains("valid")) {
          document.querySelector(".btn.btn-color.submit-btn").disabled = false;
        } else {
          document.querySelector(".btn.btn-color.submit-btn").disabled = true;
        }
      });
    }
  };

  // name field validation
  const handleName = (e) => {
    let docRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    buttonDisable(e.target);
    if (!inputValue == "" && docRegx.test(inputValue)) {
      showSuccess(e.target);
      setName(inputValue);
    } else {
      showRequired(e.target, "Name is Required.", "Please Enter Valid Name.");
    }
  };

  // email validation
  const handleEmail = (e) => {
    let emailRegx = /\S+@\S+\.\S+/;
    let inputValue = e.target.value;
    buttonDisable(e.target);
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
    e.target.value = e.target.value.replace(/[^a-z\s]/gi, "");
    let regionRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    buttonDisable(e.target);
    if (!inputValue == "" && regionRegx.test(inputValue)) {
      showSuccess(e.target);
      setRegion(inputValue);
    } else {
      showError(e.target, "Region is Required", "Please Enter Valid Region.");
    }
  };

  const handleHq = (e) => {
    let inputValue = e.target.value;
    buttonDisable(e.target);
    if (!inputValue == "") {
      showSuccess(e.target);
      setHq(inputValue);
    } else {
      showError(e.target, "HQ is Required", "Please Enter Valid HQ.");
    }
  };

  const handleSubmit = (e) => {
    if (document.querySelector("form").classList.contains("error")) {
      e.preventDefault();
    }
  };

  const handleNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    let docNumberRegx = /^[0-9]*$/;
    let inputValue = e.target.value;
    buttonDisable(e.target);
    if (!inputValue == "" && docNumberRegx.test(inputValue)) {
      showSuccess(e.target);
    } else {
      showError(
        e.target,
        "Docots Number is Required",
        "Please Enter Valid Docots Number."
      );
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files;
    const bool = validateImageSize(file);
    if (bool) {
      convertToBase64(file, true)
        .then((data) => {
          setImage(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please upload an image of size less than or equal to 100KB");
    }
  };

  const validateImageSize = (files) => {
    const fileSize = files[0].size / 1024 / 1024; // in MB
    return fileSize <= 1;
  };

  const convertToBase64 = (files) => {
    return new Promise((resolve, reject) => {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex main-wrapper">
        <div className="left-side-wrapper">
          <div className="d-flex form-flex-wrapper">
            <Input
              inputId={`inputDoctorName-${keyId}`}
              type="text"
              name={`fullName-${keyId}`}
              labelText={"Doctor Name"}
              changeEvent={handleName}
            />
            <Input
              inputId={`inputEmail-${keyId}`}
              type="text"
              name={`email${keyId}`}
              labelClassName={"email-label"}
              labelText={"Email"}
              changeEvent={handleEmail}
            />
          </div>
          <div className="d-flex form-flex-wrapper">
            <Input
              inputId={`inputRegion-${keyId}`}
              type="text"
              name={`region-${keyId}`}
              labelText={"Region"}
              changeEvent={handleRegion}
            />
            <Input
              inputId={`inputHQ-${keyId}`}
              type="text"
              name={`hq-${keyId}`}
              labelClassName={"email-label"}
              labelText={"HQ"}
              changeEvent={handleHq}
            />
          </div>
          <div className="d-flex form-flex-wrapper">
            <Input
              inputId={`inputFSOName-${keyId}`}
              type="text"
              name={`fsoName-${keyId}`}
              labelText={"FSO Name"}
              changeEvent={handleName}
            />
            <Input
              inputId={`inputDoctorNumber-${keyId}`}
              type="text"
              name={`doctorNumber-${keyId}`}
              labelClassName={"email-label"}
              labelText={"Doctors Number"}
              changeEvent={handleNumber}
              maxLength="10"
            />
          </div>
          <div className="d-flex form-flex-wrapper btn-div">
            <Button
              className="btn btn-primary btn-lg btn-color submit-btn"
              type="button"
              btnText={"Submit"}
              disabled
            />
            <Button
              className="btn btn-secondary btn-lg btn-color cancel-btn"
              type="reset"
              btnText={"Cancel"}
            />
          </div>
        </div>
        <div className="right-side-wrapper">
          <div className="card-section-img">
            <Input
              inputId={`inputFile-${keyId}`}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              name={`inputImage-${keyId}`}
              labelClassName={"file-label"}
              labelText={"Upload Doctor Photo"}
              changeEvent={handleInputChange}
              hidden
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Card;
