import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Photo from '../Photo/Photo';

function Card({ keyId, handleRefreshDataStats, disbledBtn }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [region, setRegion] = useState('');
  const [hq, setHq] = useState('');
  const [fsoname, setFsoName] = useState('');
  const [fileDirect, setFileDirect] = useState('');
  const [image, setImage] = useState(null);
  var userInfo = localStorage.getItem('userData');

  if (userInfo && !userInfo == '') {
    userInfo = JSON.parse(localStorage.getItem('userData'));
  }

  const [psName, setPsName] = useState('');
  const [doctorSpeciality, setDoctorSpeciality] = useState('');
  const [doctorPlace, setDoctorPlace] = useState('');

  const handlePsName = (e) => {
    setPsName(e.target.value);
    if (!e.target.value == '') {
      showSuccess(e.target);
    } else {
      showError(e.target, 'PS is Required', 'Please Enter Valid PS.');
    }
  };

  const handleDoctorSpeciality = (e) => {
    setDoctorSpeciality(e.target.value);
    if (!e.target.value == '') {
      showSuccess(e.target);
    } else {
      showError(
        e.target,
        'Speciality is Required',
        'Please Enter Valid Speciality.'
      );
    }
  };

  const handleDoctorPlace = (e) => {
    setDoctorPlace(e.target.value);
    if (!e.target.value == '') {
      showSuccess(e.target);
    } else {
      showError(e.target, 'Place is Required', 'Please Enter Valid Place.');
    }
  };

  const showSuccess = (inputEle) => {
    inputEle.parentNode.parentNode.classList.add('valid');
    inputEle.parentNode.parentNode.classList.remove('error');
    inputEle.classList.add('valid');
    inputEle.classList.remove('error');
    inputEle.parentNode.nextElementSibling.classList.remove('show');
    inputEle.parentNode.nextElementSibling.querySelector('p').textContent = '';
    inputEle.parentNode.parentNode.classList.remove('error-show');
  };

  const showError = (inputEle, msg) => {
    inputEle.parentNode.parentNode.classList.add('error');
    inputEle.parentNode.parentNode.classList.remove('valid');
    inputEle.classList.add('error');
    inputEle.classList.remove('valid');
    inputEle.parentNode.nextElementSibling.classList.add('show');
    inputEle.parentNode.nextElementSibling.querySelector('p').textContent = msg;
    inputEle.parentNode.parentNode.classList.add('error-show');
  };

  const showRequired = (inputEle, requiredMsg, validationMsg) => {
    if (inputEle.value == '') {
      showError(inputEle, requiredMsg);
    } else {
      showError(inputEle, validationMsg);
    }
  };

  // name field validation
  const handleName = (e) => {
    let docRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == '' && docRegx.test(inputValue)) {
      showSuccess(e.target);
      setName(inputValue);
    } else {
      showRequired(e.target, 'Name is Required.', 'Please Enter Valid Name.');
    }
  };
  const handleDoctorNumber = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == '') {
      showSuccess(e.target);
      setNumber(inputValue);
    } else {
      showRequired(
        e.target,
        'Number is Required.',
        'Please Enter Valid Number.'
      );
    }
  };

  const handleFsoName = (e) => {
    let docRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == '' && docRegx.test(inputValue)) {
      showSuccess(e.target);
      setFsoName(inputValue);
    } else {
      showRequired(e.target, 'Name is Required.', 'Please Enter Valid Name.');
    }
  };

  const handleRegion = (e) => {
    e.target.value = e.target.value.replace(/[^a-z\s]/gi, '');
    let regionRegx = /^[a-zA-Z]+[a-zA-Z\s]+$/;
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == '' && regionRegx.test(inputValue)) {
      showSuccess(e.target);
      setRegion(inputValue);
    } else {
      showError(e.target, 'Region is Required', 'Please Enter Valid Region.');
    }
  };

  const handleHq = (e) => {
    let inputValue = e.target.value;
    // buttonDisable(e.target);
    if (!inputValue == '') {
      showSuccess(e.target);
      setHq(inputValue);
    } else {
      showError(e.target, 'HQ is Required', 'Please Enter Valid HQ.');
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files;
    setFileDirect(file[0]);
    event.target.classList.add('valid');
    event.target.parentElement.parentNode.classList.add('valid');
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
      alert('Please upload an image of size less than or equal to 1MB');
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
    if (disbledBtn) {
      alert('You have reched limit of 15 records');
    } else {
      var loaderEle = document.querySelector('.lds-dual-ring');
      loaderEle.classList.add('active');
      document.querySelector('.form-section').classList.add('dsp-none');
      document.querySelector('.header').classList.add('dsp-none');

      const formData = new FormData();
      formData.append('cardId', keyId);
      formData.append('reference', userInfo.user.user.email);
      formData.append('name', name);
      formData.append('region', region);
      formData.append('hq', hq);
      formData.append('ps', psName);
      formData.append('doctorNumber', number);
      formData.append('fsoname', fsoname);
      formData.append('doctorPlace', doctorPlace);
      formData.append('doctorSpeciality', doctorSpeciality);
      formData.append('image', fileDirect);

      // form axios

      axios
        .post('/forms', formData)
        .then((response) => {
          var loaderEle = document.querySelector('.lds-dual-ring');
          loaderEle.classList.remove('active');
          document.querySelector('.form-section').classList.remove('dsp-none');
          document.querySelector('.header').classList.remove('dsp-none');
          // Refresh parent state for data checking
          handleRefreshDataStats();
          setName('');
          setPsName('');
          setDoctorPlace('');
          setDoctorSpeciality('');
          setHq('');
          setRegion('');
          setImage(null);
          setFileDirect('');
          alert('Data Successfully Saved');
          // do something with the response data
        })
        .catch((error) => {
          var loaderEle = document.querySelector('.lds-dual-ring');
          loaderEle.classList.remove('active');
          document.querySelector('.form-section').classList.remove('dsp-none');
          document.querySelector('.header').classList.remove('dsp-none');
          if (error.response.status === 400) {
            alert('BAD REQUEST');
          } else {
            alert('Server Error');
          }
        });
    }
  };

  useEffect(() => {
    let inputFieldDRegion = document.querySelector(`#inputRegion-${keyId}`);
    let inputFieldDHQ = document.querySelector(`#inputHQ-${keyId}`);
    let inputFieldFsoName = document.querySelector(`#inputFSOName-${keyId}`);

    if (!inputFieldDRegion == '') {
      if (userInfo && !userInfo.user == '') {
        inputFieldDRegion.value = userInfo.user.user.region;
        setRegion(userInfo.user.user.region);
        inputFieldDHQ.value = userInfo.user.user.hq;
        setHq(userInfo.user.user.hq);
        inputFieldFsoName.value = userInfo.user.user.fsoname;
        setFsoName(userInfo.user.user.fsoname);

        inputFieldDRegion.parentElement.parentNode.classList.add('valid');
        inputFieldDHQ.parentElement.parentNode.classList.add('valid');
        inputFieldDRegion.previousElementSibling.classList.add(
          'input-active',
          'input-focus'
        );
        inputFieldDRegion.classList.add('valid');
        inputFieldDHQ.classList.add('valid');
        inputFieldDHQ.previousElementSibling.classList.add(
          'input-active',
          'input-focus'
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
                inputId={`inputPsName-${keyId}`}
                type="text"
                name={`psName-${keyId}`}
                labelText={'PS Name'}
                changeEvent={handlePsName}
              />
              <Input
                inputId={`inputHQ-${keyId}`}
                type="text"
                name={`hq-${keyId}`}
                labelClassName={'label'}
                labelText={'HQ'}
                disable={true}
                changeEvent={handleHq}
              />
            </div>
            <div className="d-flex form-flex-wrapper">
              <Input
                inputId={`inputRegion-${keyId}`}
                type="text"
                name={`region-${keyId}`}
                disable={true}
                labelText={'Region'}
                changeEvent={handleRegion}
              />
              <Input
                inputId={`inputDoctorName-${keyId}`}
                type="text"
                name={`fullName-${keyId}`}
                labelText={'Doctor Name'}
                changeEvent={handleName}
              />
            </div>

            {/* New Input Fields */}
            <div className="d-flex form-flex-wrapper">
              <Input
                inputId={`doctorNumber-${keyId}`}
                type="number"
                name={`doctorNumber-${keyId}`}
                labelText={'Doctor Mobile Number'}
                changeEvent={handleDoctorNumber}
              />
              <Input
                inputId={`inputDoctorPlace-${keyId}`}
                type="text"
                name={`doctorPlace-${keyId}`}
                labelText={'Doctor Place'}
                changeEvent={handleDoctorPlace}
              />
            </div>
            <div className="d-flex form-flex-wrapper">
              <Input
                inputId={`inputFSOName-${keyId}`}
                type="text"
                disable={true}
                name={`fsoName-${keyId}`}
                labelText={'FSO Name'}
                changeEvent={handleFsoName}
              />
              <Input
                inputId={`inputDoctorSpeciality-${keyId}`}
                type="text"
                name={`doctorSpeciality-${keyId}`}
                labelText={'Doctor Speciality'}
                changeEvent={handleDoctorSpeciality}
              />
            </div>
            {/* End New Input Fields */}

            <div className="d-flex form-flex-wrapper btn-div">
              <Button
                className="btn btn-primary btn-lg btn-color submit-btn"
                type="submit"
                btnText={'Submit'}
              />
              <Button
                className="btn btn-secondary btn-lg btn-color cancel-btn"
                type="reset"
                btnText={'Cancel'}
              />
            </div>
          </div>
          <div className="right-side-wrapper">
            <div
              className={`card-section-img ${image ? 'inputFileUpload' : ''}`}
            >
              <Input
                inputId={`inputFile-${keyId}`}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                name={`inputImage-${keyId}`}
                labelClassName={'file-label'}
                labelText={'Upload Doctor Photo'}
                changeEvent={handleInputChange}
                hidden
              />
              <Photo UploadImage={image} key={keyId} indexId={keyId} />
            </div>
            <br />
            <p className={`info-p ${image ? 'dsp-none' : ''}`}>
              Please Upload Image First
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Card;
