import React from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import './Signup.css'

function Signup() {
    return (
        <section className="form-section login-box signup">
            <div className="form-section-inner signup">
                <div className="container card-section-login-wrapper">
                    <div className="card-section login-box signup">
                        <h2 className="heading-title">Sign Up Form</h2>
                        <form>
                            <Input inputId={'inputUserName'} type="text" name="username" labelClassName={''} labelText={'Username'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputEmail'} type="text" name="email" labelClassName={''} labelText={'Email'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputRegion'} type="text" name="region" labelClassName={''} labelText={'Region'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputHQ'} type="text" name="hq" labelClassName={''} labelText={'HQ'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputFSOName'} type="text" name="fsoName" labelClassName={''} labelText={'FSO Name'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputPassword'} type="password" name="password" labelClassName={''} labelText={'Password'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputConfirmPassword'} type="password" name="confirmPassword" labelClassName={''} labelText={'Confirm Password'} parentWrapperClass={'login-form'} />
                            <div className="d-flex form-flex-wrapper btn-div jus-center">
                                <Button className="btn btn-primary btn-lg btn-color signUp-btn" type="button" btnText={'Sign Up'} disabled/>
                                <Button className="btn btn-secondary btn-lg btn-color cancel-btn" type="button" btnText={'Cancel'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup