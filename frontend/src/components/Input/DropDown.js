import { React, useState, useEffect } from 'react';

function Dropdown({
  inputId,
  labelClassName,
  labelText,
  changeEvent,
  parentWrapperClass,
  disable = false,
  ...others
}) {
  const [isInputActive, setIsInputActive] = useState(false);
  const handleInputChange = (event) => {
    if (event.target.type === 'file') {
      return;
    }
    if (event.target.value === '') {
      setIsInputActive(false);
    } else {
      setIsInputActive(true);
    }
  };

  const handleInputClick = (event) => {
    if (event.target.type === 'file') {
      return;
    }
    setIsInputActive(true);
  };

  const handleInputBlur = (e) => {
    if (e.target.value === '') {
      setIsInputActive(false);
    } else {
      setIsInputActive(true);
    }
  };
  const region = [
    'DELHI',
    'CHANDIGARH',
    'JAIPUR',
    'LUCKNOW',
    'MEERUT',
    'SRINAGAR',
    'MUMBAI',
    'AHMEDABAD',
    'NAGPUR',
    'PUNE',
    'BHOPAL',
    'THRISSUR',
    'BANGALORE',
    'CHENNAI',
    'HYDERABAD',
    'VIJAYAWADA',
    'PATNA',
    'RANCHI',
    'CUTTACK',
    'CALCUTTA',
    'REST OF WEST BANGAL',
    'NORTH EAST',
  ].sort();
  return (
    <div
      className={`form-group ${parentWrapperClass ? parentWrapperClass : ''}`}
    >
      <label htmlFor={inputId} className={labelClassName}>
        <select
          id={inputId}
          style={{
            width: '100%',
            borderRadius: '6px',
            padding: '15px',
            color: '#022741',
          }}
          onChange ={changeEvent}
        >
          {region.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </label>
      <div className="error-msg">
        <p></p>
      </div>
    </div>
  );
}

export default Dropdown;
