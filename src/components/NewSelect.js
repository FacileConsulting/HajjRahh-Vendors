import React, { useState } from 'react';
import { updateFunc } from '../reducers/homeSlice';
import { useDispatch } from 'react-redux';

const NewSelect = ({ id, options, keyName, placeholder, value }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionClick = (option) => {
    dispatch(updateFunc({ keyName, value: `${option.value}` }));
    setSelectedOption(option.label);
  };

  return (
    <div id={id}>
      <a href="#!" className="form-selection" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <label htmlFor="type" className="form-label">{placeholder}</label>
        <input type="test" className="form-control header-form" id={`input-${id}`} placeholder={selectedOption} />
      </a>
      <ul className="dropdown-menu custom-dropdown">
        {
          Array.isArray(options) && options.length > 0 && options.map((option, index) => {
            return (
              <li key={option.value} className="result-item pb-2" onClick={() => handleOptionClick(option, index)}>
                <div className="result-right ms-0">
                  <div className="result-title">{option.label}</div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};

export default NewSelect;
