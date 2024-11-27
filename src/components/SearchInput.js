import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { changeInputFunc, resetInputFunc } from '../reducers/myAccountSlice';
import { updateFunc } from '../reducers/homeSlice';
import { useDispatch } from 'react-redux';

const SearchInput = ({ id, keyName, placeholder, middle, lowerOne, lowerTwo, options, isFlight }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [middleValue, setMiddleValue] = useState(middle || '');
  const [lowerOneValue, setLowerOneValue] = useState(lowerOne || '');
  const [lowerTwoValue, setLowerTwoValue] = useState(lowerTwo || '');
  const [searchFilterOptions, setSearchFilterOptions] = useState([]);

  const handleOptionClick = (option) => {
    dispatch(updateFunc({ keyName, value: `${option.value}^${option.label}` }));
    setSearchValue('');
    setMiddleValue(option.label);
    setLowerOneValue(option.value);
    setLowerTwoValue(`${option.lowerOne} ${option.lowerTwo}`);
    setSearchFilterOptions([]);
  };

  const handleChange = (event) => {
    const value = event.target.value ? event.target.value.toLowerCase() : '';
    if (value.length > 1) {
      const filtered = options.filter( o => o.label.toLowerCase().includes(value) );
      setSearchFilterOptions(filtered);
      console.log(id, keyName, placeholder, options, filtered, event.target.value);
    } else {
      setSearchValue('');
      setSearchFilterOptions([]);
    }
    setSearchValue(value);
  };

  return (
    <div className="dropdown">
      <a className="form-selection" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <label htmlFor="from" className="form-label">{placeholder}</label>
        <input type="test" className="form-control header-form" placeholder={middleValue} />
        {
          isFlight ? 
          <div className="helper-text">[{lowerOneValue}] {lowerTwoValue}</div> :
          <div className="helper-text">{lowerTwoValue}</div>
        }
        
      </a>
      <ul className="dropdown-menu custom-dropdown list-unstyled">
        <li>
          <div className="input-group dropdown-search">
            <span className="input-group-text" id="search"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control" placeholder="Search" aria-describedby="search" onChange={handleChange} value={searchValue}/>
          </div>
        </li>
        {
          Array.isArray(searchFilterOptions) && searchFilterOptions.length > 0 && searchFilterOptions.map((option, index) => {
            return (
              <li key={option.value} className="result-item" onClick={() => handleOptionClick(option, index)}>
                {
                  isFlight && <div className="flight-icon"><i className="bi bi-airplane"></i></div>
                }
                <div className="result-right">
                  {
                    isFlight ?
                    <div className="result-title">{option.label} ({option.value})</div> : 
                    <div className="result-title">{option.label}</div>
                  }                  
                  <div className="result-footer">{option.lowerOne} | {option.lowerTwo}</div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};

export default SearchInput;
