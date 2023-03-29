import { React, useState } from 'react'
import './Forms.css'
import Input from '../Input/Input'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

function Forms() {

    return (
        <div>
            {/* <!-- Form Section start here --> */}
            <section className="form-section main">
                <div className="form-section-inner">
                    <div className="add-btn-div">
                        <img src="./assets/image/add-btn.png" alt="Add Button" className="add-btn" />
                    </div>
                    <div className="minus-btn-div dsp-none">
                        <img src="./assets/image/minus-btn.png" alt="Minus Button" className="minus-btn" />
                    </div>
                    <div className="sideBar-cardClone i-dsp-none">
                        <div className="select-item">
                            <Link to={''}>1</Link>
                        </div>
                    </div>
                    <div className="container card-section-wrapper">
                        <div className="card-section" data-id="card-0">
                            <h2 className="heading-title">Doctors Details Form <span className="form-number"></span></h2>
                            <form>
                                <div className="d-flex main-wrapper">
                                    <div className="left-side-wrapper">
                                        <div className="d-flex form-flex-wrapper">
                                            <Input inputId={'inputDoctorName'} type="text" name="fullName" labelText={'Doctor Name'} />
                                            <Input inputId={'inputEmail'} type="text" name="email" labelClassName={'email-label'} labelText={'Email'} />
                                        </div>
                                        <div className="d-flex form-flex-wrapper">
                                            <Input inputId={'inputRegion'} type="text" name="region" labelText={'Region'} />
                                            <Input inputId={'inputHQ'} type="text" name="hq" labelClassName={'email-label'} labelText={'HQ'} />
                                        </div>
                                        <div className="d-flex form-flex-wrapper">
                                            <Input inputId={'inputFSOName'} type="text" name="fsoName" labelText={'FSO Name'} />
                                            <Input inputId={'inputDoctorNumber'} type="text" name="doctorNumber" labelClassName={'email-label'} labelText={'Doctors Number'} />
                                        </div>
                                        <div className="d-flex form-flex-wrapper btn-div">
                                            <Button className="btn btn-primary btn-lg btn-color submit-btn" type="button" btnText={'Submit'} />
                                            <Button className="btn btn-secondary btn-lg btn-color cancel-btn" type="button" btnText={'Cancel'} />
                                        </div>
                                    </div>
                                    <div className="right-side-wrapper">
                                        <div className="card-section-img">
                                            <Input inputId={'inputFile'} type="file" accept="image/png, image/jpg, image/jpeg" name="inputImage" labelClassName={'file-label'} labelText={'Upload Doctor Photo'} hidden />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Form Section end here --> */}
        </div>
    )
}

export default Forms;