import React, { useState } from 'react';
import { updateFunc } from '../reducers/homeSlice';
import { useDispatch } from 'react-redux';

const Select = ({ id, options, classes, keyName, eventType, selectIsList, value }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (event) => {
    if (eventType === 1) {
      dispatch(updateFunc({ keyName, value: event.target.value }));
    } else if (eventType === 2) {
      dispatch(updateFunc({ keyName, value: `${event.target.value}^${event.target.selectedOptions[0].label}` }));
    }
    setSelectedOption(event.target.value);
  };

  const handleClick = (option) => {
    if (id === 'flights-search-travel-class-ul') {
      dispatch(updateFunc({ keyName: 'travelClass', value: `${option.value}^${option.label}` }));
    }
    setSelectedOption(option.label);
  };


  const IfSelectIsUL = () =>
    <div id={id} className="dropdown">
      <a className="class-guests dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
        {selectedOption || 'Economy'}
      </a>
      <ul className="dropdown-menu">
        {
          options && options.length > 0 && options.map((option) => {
            return (
              <li key={option.value} value={option.value} onClick={() => handleClick(option)}>
                <a className="dropdown-item" href="#">{option.label}</a>
              </li>
            )
          })
        }
      </ul>
    </div>

  const IfSelectisSelect = () =>
    <select id={id} value={selectedOption} onChange={handleChange} className={`form-select form-select-lg ${classes}`}>
      {
        options && options.length > 0 && options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })
      }
    </select>

  return (
    <>
      {
        selectIsList ? <IfSelectIsUL /> : <IfSelectisSelect />
      }
    </>
  )
};

export default Select;
