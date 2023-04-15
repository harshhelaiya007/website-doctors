import { React, useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Photo from "../Photo/Photo";
import ModelImageContext from "../Context/ModelImageContext";

function Card({ keyId }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [region, setRegion] = useState("");
  const [hq, setHq] = useState("");
  const [fsoname, setFsoName] = useState("");
  const [fileDirect, setFileDirect] = useState("");
  const [image, setImage] = useState(null);
  var userInfo = localStorage.getItem("userData");

  if (userInfo && !userInfo == "") {
    userInfo = JSON.parse(localStorage.getItem("userData"));
  }

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
    // buttonDisable(e.target);
    if (!inputValue == "" && docRegx.test(inputValue)) {
      showSuccess(e.target);
      setName(inputValue);
    } else {
      showRequired(e.target, "Name is Required.", "Please Enter Valid Name.");
    }
  };

  const handleFsoName = (e) => {
    let docRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "" && docRegx.test(inputValue)) {
      showSuccess(e.target);
      setFsoName(inputValue);
    } else {
      showRequired(e.target, "Name is Required.", "Please Enter Valid Name.");
    }
  };

  const handleRegion = (e) => {
    e.target.value = e.target.value.replace(/[^a-z\s]/gi, "");
    let regionRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == "" && regionRegx.test(inputValue)) {
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

  const handleInputChange = (event) => {
    const file = event.target.files;
    setFileDirect(file[0]);
    event.target.classList.add("valid");
    event.target.parentElement.parentNode.classList.add("valid");
    const bool = validateImageSize(file);
    if (bool) {
      convertToBase64(file, true)
        .then((data) => {
          setImage(data);
          console.log(file[0]);
          // openModelImage();
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
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    var loaderEle = document.querySelector(".lds-dual-ring");
    loaderEle.classList.add("active");
    document.querySelector(".form-section").classList.add("dsp-none");
    document.querySelector(".header").classList.add("dsp-none");

    const formData = new FormData();
    formData.append("cardId", keyId);
    formData.append("reference", userInfo.user.user.email);
    formData.append("name", name);
    formData.append("region", region);
    formData.append("hq", hq);
    formData.append("fsoname", fsoname);
    formData.append("doctorNumber", number);
    formData.append("image", fileDirect);

    // form axios
    axios
      .post("/forms", formData)
      .then((response) => {
        console.log(response.data);
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document.querySelector(".form-section").classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        alert("Data Successfully Saved");
        // do something with the response data
      })
      .catch((error) => {
        var loaderEle = document.querySelector(".lds-dual-ring");
        loaderEle.classList.remove("active");
        document.querySelector(".form-section").classList.remove("dsp-none");
        document.querySelector(".header").classList.remove("dsp-none");
        if (error.response.status === 400) {
          alert("BAD REQUEST");
        } else {
          alert("Server Error");
        }
      });
  };

  useEffect(() => {
    let inputFieldDRegion = document.querySelector(`#inputRegion-${keyId}`);
    let inputFieldDHQ = document.querySelector(`#inputHQ-${keyId}`);
    let inputFieldFsoName = document.querySelector(`#inputFSOName-${keyId}`);
    console.log(
      inputFieldDRegion.parentElement.parentNode.classList.add("valid")
    );
    if (!inputFieldDRegion == "") {
      if (userInfo && !userInfo.user == "") {
        inputFieldDRegion.value = userInfo.user.user.region;
        setRegion(userInfo.user.user.region);
        inputFieldDHQ.value = userInfo.user.user.hq;
        setHq(userInfo.user.user.hq);
        inputFieldFsoName.value = userInfo.user.user.fsoname;
        setFsoName(userInfo.user.user.fsoname);

        inputFieldDRegion.parentElement.parentNode.classList.add("valid");
        inputFieldDHQ.parentElement.parentNode.classList.add("valid");
        inputFieldFsoName.parentElement.parentNode.classList.add("valid");

        inputFieldDRegion.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
        inputFieldDRegion.classList.add("valid");
        inputFieldDHQ.classList.add("valid");
        inputFieldFsoName.classList.add("valid");
        inputFieldDHQ.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
        inputFieldFsoName.previousElementSibling.classList.add(
          "input-active",
          "input-focus"
        );
      }
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitClick}>
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
                inputId={`inputRegion-${keyId}`}
                type="text"
                name={`region-${keyId}`}
                labelText={"Region"}
                changeEvent={handleRegion}
              />
            </div>
            <div className="d-flex form-flex-wrapper">
              <Input
                inputId={`inputHQ-${keyId}`}
                type="text"
                name={`hq-${keyId}`}
                labelClassName={"label"}
                labelText={"HQ"}
                changeEvent={handleHq}
              />
              <Input
                inputId={`inputFSOName-${keyId}`}
                type="text"
                name={`fsoName-${keyId}`}
                labelText={"FSO Name"}
                changeEvent={handleFsoName}
              />
            </div>
            <div className="d-flex form-flex-wrapper btn-div">
              <Button
                className="btn btn-primary btn-lg btn-color submit-btn"
                type="submit"
                btnText={"submit"}
              />
              <Button
                className="btn btn-secondary btn-lg btn-color cancel-btn"
                type="reset"
                btnText={"Cancel"}
              />
            </div>
          </div>
          <div className="right-side-wrapper">
            <div
              className={`card-section-img ${
                image ? "inputFileUpload" : ""
              }`}
            >
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
              <Photo UploadImage={image} key={keyId} indexId={keyId} />
            </div>
            <br />
            <p className={`info-p ${image ? "dsp-none" : ""}`}>
              Please Upload Image First
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Card;
