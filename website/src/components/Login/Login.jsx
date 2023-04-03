import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './Login.css'

function Login() {

    return (
        <section className="form-section login-box">
            <div className="form-section-inner">
                <div className="container card-section-login-wrapper">
                    <div className="card-section login-box">
                        <h2 className="heading-title">Login Form</h2>
                        <form>
                            <Input inputId={'inputEmail'} type="text" name="email" labelClassName={'email-label'} labelText={'Email'} parentWrapperClass={'login-form'} />
                            <Input inputId={'inputPassword'} type="text" name="password" labelClassName={'password-label'} labelText={'Password'} parentWrapperClass={'login-form'} />
                            <a href="/forget-password.html" className="forget-password dsp-none">Forget Password?</a>
                            <div className="d-flex form-flex-wrapper btn-div jus-center">
                                <Button className="btn btn-primary btn-lg btn-color login-btn" type="button" btnText={'Login'} />
                                <Button className="btn btn-secondary btn-lg btn-color cancel-btn" type="button" btnText={'Cancel'} />
                            </div>
                            <p className="text-center">Don't have an account? <Link to='/Signup' className="forget-password">Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login