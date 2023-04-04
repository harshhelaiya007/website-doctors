import { React, useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Photo from "../Photo/Photo";
import ModelImageContext from "../Context/ModelImageContext";

function Card({ keyId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [region, setRegion] = useState("");
  const [hq, setHq] = useState("");
  const [fsoname, setFsoName] = useState("");
  const [file, setFile] = useState([]);
  const { setImage, croppedImage } = useContext(ModelImageContext);
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
    buttonDisable(e.target);
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
    buttonDisable(e.target);
    if (!inputValue == "" && docRegx.test(inputValue)) {
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

  const handleNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    let docNumberRegx = /^[0-9]*$/;
    let inputValue = e.target.value;
    buttonDisable(e.target);
    if (!inputValue == "" && docNumberRegx.test(inputValue)) {
      showSuccess(e.target);
      setNumber(inputValue);
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
    setFile(file[0]);
    event.target.classList.add("valid");
    event.target.parentElement.parentNode.classList.add("valid");
    const bool = validateImageSize(file);
    if (bool) {
      convertToBase64(file, true)
        .then((data) => {
          setImage(data);
          openModelImage();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please upload an image of size less than or equal to 100KB");
    }
  };

  const openModelImage = () => {
    document.getElementById("clickMe").click();
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

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    var imageUrl;
    // image axios
    axios
    .post("http://localhost:3000/upload", formData)
    .then((response) => {
      console.log(response.data);
      // do something with the response data
      imageUrl = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(imageUrl + '  new');
    // form axios
    axios
      .post("http://localhost:3000/forms", {
        cardId: keyId,
        reference: userInfo,
        name: name,
        email: email,
        region: region,
        hq: hq,
        fsoname: fsoname,
        doctorNumber: number,
        image: imageUrl
      })
      .then((response) => {
        console.log(response.data);
        alert('Data Successfully Saved')
        // do something with the response data
      })
      .catch((error) => {
        console.log(error);
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
        setRegion(userInfo.user.user.region)
        inputFieldDHQ.value = userInfo.user.user.hq;
        setHq(userInfo.user.user.hq)
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
                changeEvent={handleFsoName}
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
                type="submit"
                btnText={"submit"}
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
            <div
              className={`card-section-img ${
                croppedImage ? "inputFileUpload" : ""
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
              <Photo UploadImage={croppedImage} key={keyId} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Card;
