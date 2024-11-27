import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { changeInputFunc, resetInputFunc } from '../reducers/myAccountSlice';
import { useDispatch } from 'react-redux';

const Input = forwardRef((props, ref) => {
  let { id, keyName, placeholder, disabled, type } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState('');  

  const resetRefCalled = (index) => {
    dispatch(resetInputFunc(keyName));
    setValue('');
  };

  // Use useImperativeHandle to expose functions to the parent
  useImperativeHandle(ref, () => ({
    resetRefCalled
  }));

  const handleChange = (event) => {
    console.log(id, keyName, placeholder);
    dispatch(changeInputFunc({ keyName, value: event.target.value }));
    setValue(event.target.value);
  };

  return (
    <input type={type ? type : "text"} className="form-control" disabled={disabled} id={id} placeholder={placeholder} onChange={handleChange} value={value} />
  )
});

export default Input;
