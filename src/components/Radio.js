import React, { forwardRef, useImperativeHandle, useState } from 'react';
import $ from 'jquery';
import { updateFunc } from '../reducers/homeSlice';
import { useDispatch } from 'react-redux';

const Radio = forwardRef((props, ref) => {
  let { id, keyName, name, valueRadioName, defaultValue } = props;
  const dispatch = useDispatch();
  $(`#${id}`).prop('checked', defaultValue === valueRadioName);
  const [value, setValue] = useState(defaultValue);  

  const resetRefCalled = (enableId, keyName, vals) => {
    $(`#${enableId}`).prop('checked', true);
    dispatch(updateFunc({ keyName, value: vals }));
    setValue(vals);
  };

  // Use useImperativeHandle to expose functions to the parent
  useImperativeHandle(ref, () => ({
    resetRefCalled
  }));

  const handleChange = (event) => {
    console.log('sdfsdfsdfsdf', id, keyName, valueRadioName, event.target.value, event.target.checked);
    dispatch(updateFunc({ keyName, value: event.target.value }));
    $('#flight-traveller-ECONOMY').prop('checked', false);
    $('#flight-traveller-BUSINESS').prop('checked', false);
    $('#flight-traveller-FIRST').prop('checked', false);
    $(`#${id}`).prop('checked', event.target.value === valueRadioName);
    setValue(event.target.value);
  };

  return (
    <input type="radio" name={name} className="form-check-input" id={id} onChange={handleChange} value={valueRadioName} defaultChecked={value === valueRadioName} />
  )
});

export default Radio;
