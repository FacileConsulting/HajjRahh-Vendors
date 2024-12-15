import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  updateVendorsFunc, 
  resetVendorsComponentFunc,
  resetVendorsFunc 
} from '../reducers/vendorsSlice';

const Input = forwardRef((props, ref) => {
  let { id, componentName, keyName, placeholder, disabled, type } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const resetRefCalled = (componentName, keyName) => {
    if (keyName) {
      dispatch(updateVendorsFunc({ componentName, keyName, value: '' }));
    } else {
      dispatch(resetVendorsComponentFunc({componentName}));
    }    
    setValue('');
  };

  // Use useImperativeHandle to expose functions to the parent
  useImperativeHandle(ref, () => ({
    resetRefCalled
  }));

  const handleChange = (event) => {
    console.log(id, keyName, placeholder);
    dispatch(updateVendorsFunc({ componentName, keyName, value: event.target.value }));
    setValue(event.target.value);
  };

  return (
    <input type={type ? type : "text"} className="form-control" disabled={disabled} id={id} placeholder={placeholder || ''} onChange={handleChange} value={value} />
  )
});

export default Input;
