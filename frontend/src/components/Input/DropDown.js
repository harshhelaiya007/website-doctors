import React, { useState } from "react";

function Dropdown({
  inputId,
  labelClassName,
  labelText,
  options,
  changeEvent,
  parentWrapperClass,
  selectedValue,
}) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleOptionClick = (option) => {
    setIsDropdownActive(false);
    changeEvent(option);
  };

  return (
    <div
      className={`form-group ${parentWrapperClass ? parentWrapperClass : ""}`}
    >
      <label htmlFor={inputId} className={labelClassName}>
        <span
          className={`input-field_label ${
            isDropdownActive ? "input-focus input-active" : ""
          }`}
        >
          {labelText}
          <span className="input-field_required" aria-hidden="true">
            {" "}
            *
          </span>
        </span>
        <div
          id={inputId}
          className={`input-field dropdown ${isDropdownActive ? "active" : ""}`}
          onClick={handleDropdownClick}
        >
          {selectedValue || "Select an option"}
          <i className="fa fa-caret-down"></i>
          <ul className={`dropdown-list ${isDropdownActive ? "active" : ""}`}>
            {options.map((option, index) => (
              <li
                key={index}
                className={`dropdown-item ${
                  selectedValue === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </label>
      <div className="error-msg">
        <p></p>
      </div>
    </div>
  );
}

export default Dropdown;
