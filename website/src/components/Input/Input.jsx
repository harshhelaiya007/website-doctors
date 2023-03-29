import { React, useState } from 'react'

function Input({ inputId, labelClassName, labelText, changeEvent, parentWrapperClass, ...others }) {

    const [isInputActive, setIsInputActive] = useState(false);
    const handleInputChange = (event) => {
        if (event.target.value === '') {
            setIsInputActive(false);
        } else {
            setIsInputActive(true);
        }
    }

    const handleInputClick = () => {
        setIsInputActive(true);
    };

    const handleInputBlur = (e) => {
        if (e.target.value === '') {
            setIsInputActive(false);
        } else {
            setIsInputActive(true);
        }
    }

    return (
        <div className={`form-group ${parentWrapperClass}`}>
            <label htmlFor={inputId} className={labelClassName}>
                <span className={`input-field_label ${isInputActive ? 'input-focus input-active' : ''}`}>{labelText}<span className="input-field_required"
                    aria-hidden="true"> *</span></span>
                <input id={inputId} className="input-field" {...others} onClick={handleInputClick}
                    onInput={handleInputChange} onChange={changeEvent} onBlur={handleInputBlur}></input>
            </label>
            <div className="error-msg"><p></p></div>
        </div>
    )
}

export default Input