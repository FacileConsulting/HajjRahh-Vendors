import React, { forwardRef, useImperativeHandle, useState } from 'react';
import $ from 'jquery';
import { changeInputFunc, resetInputFunc } from '../reducers/myAccountSlice';
import { useDispatch } from 'react-redux';

const Checkbox = forwardRef((props, ref) => {
  let { id, keyName, disabled, defaultValue } = props;
  const dispatch = useDispatch();  
  $(`#${id}`).prop('checked', defaultValue);
  const [value, setValue] = useState(defaultValue);  

  const resetRefCalled = (index) => {
    console.log('sdfsdfsdfsdf@@@@@@@@@', id, keyName);
    $(`#${id}`).prop('checked', false);
    dispatch(resetInputFunc(keyName));
    setValue(false);
  };

  // Use useImperativeHandle to expose functions to the parent
  useImperativeHandle(ref, () => ({
    resetRefCalled
  }));

  const handleChange = (event) => {
    // $(`#${id}`).prop('checked', true);
    console.log('sdfsdfsdfsdf', id, keyName, event.target.checked);
    dispatch(changeInputFunc({ keyName, value: event.target.checked }));
    setValue(event.target.checked);
  };

  return (
    <input type="checkbox" name={keyName} className="form-check-input" id={id} onChange={handleChange} defaultChecked={defaultValue} disabled={disabled} />
  )
});

export default Checkbox;
