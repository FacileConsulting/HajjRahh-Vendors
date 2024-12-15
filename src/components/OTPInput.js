import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { 
  updateVendorsFunc, 
  resetVendorsComponentFunc,
  resetVendorsFunc 
} from '../reducers/vendorsSlice';
import { useDispatch } from 'react-redux';

const OTPInput = forwardRef((props, ref) => {
  let { id, componentName, keyName } = props;
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (!isNaN(element.value) && element.value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      dispatch(updateVendorsFunc({ componentName, keyName, value: newOtp }));
      setOtp(newOtp);

      // Move to the next input field
      if (element.value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = otp.map((val, idx) => pastedData[idx] || "");
    dispatch(updateVendorsFunc({ componentName, keyName, value: newOtp }));
    setOtp(newOtp);

    // Move focus to the next empty input
    newOtp.forEach((_, idx) => {
      if (idx < 6) inputRefs.current[idx].focus();
    });
  };
  
  const resetRefCalled = (componentName, keyName) => {    
    if (keyName) {
      dispatch(updateVendorsFunc({ componentName, keyName, value: '' }));
    } else {
      dispatch(resetVendorsComponentFunc({componentName}));
    }
    setOtp(new Array(6).fill(""));
  };

  // Use useImperativeHandle to expose functions to the parent
  useImperativeHandle(ref, () => ({
    resetRefCalled
  }));

  console.log('otp', otp);
  return (
    <div id={id} className="otp-container">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className="otp-input"
        />
      ))}
    </div>
  );
});

export default OTPInput;
