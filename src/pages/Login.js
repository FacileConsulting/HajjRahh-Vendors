import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { handleAPIData } from '../hooks/useCustomApi';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import {
  defaultPackages
} from '../constant/func';
import {
  updateVendorsFunc,
  resetVendorsComponentFunc,
  resetVendorsFunc
} from '../reducers/vendorsSlice';
import Input from '../components/Input';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';

const Login = forwardRef((props, ref) => {
  const initialTime = useRef(300); 
  const { id, onLoginSuccess } = props;
  const childRefs = [useRef(), useRef()];
  const history = useHistory();
  const dispatch = useDispatch();
  const { Login } = useSelector(state => state.vendors);
  // console.log('Login', Login);
  const [loginEntry, setLoginEntry] = useState('shower');
  const [loginOTP, setLoginOTP] = useState('hider');
  const [timeLeft, setTimeLeft] = useState(initialTime.current);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetFields = (index, keyName) => {
    if (childRefs[index].current) {
      childRefs[index].current.resetRefCalled('Login', keyName);
    }
  }

  const handleLogInEntryClick = async(isResend) => {
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!Login?.mobile) {
      toast.info('Please enter Mobile Number', toastOptions);
      return;
    }
    if (!mobilePattern.test(Login?.mobile)) {
      toast.info('Please enter valid Mobile Number', toastOptions);
      return;
    }
    if (!isResend) setLoading(true);
    let response = await handleAPIData('POST', '/api/vendors', { type: 'VENDORS_LOGIN', mobile: `91${Login?.mobile}` });
    console.log('/api/vendors loginsef', response);
    if (response.status === 'success' && response.data.isOTP) {
      toast.success(response.data.message, toastOptions);
      resetFields(1, 'otp');
      setIsResendDisabled(true);
      setTimeLeft(initialTime.current);
      if (!isResend) {
        setLoginEntry('hider');
        setLoginOTP('shower');
      } 
      // else {
      //   setTimeLeft(initialTime.current);
      // }
    } else if (response.status === 'success' && response.data.noOTP) {
      toast.success(response.data.message, toastOptions);
      if (!isResend) resetFields(0);
      resetFields(1);
    } else if (response.status === 'error' && response.message) {
      toast.error(response.message, toastOptions);
      if (!isResend) resetFields(0);
      resetFields(1);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
      if (!isResend) resetFields(0);
      resetFields(1);
    }
    if (!isResend) setLoading(false);
  };

  const handleChangeNumberClick = () => {
    setLoginEntry('shower');
    setLoginOTP('hider');
    resetFields(0);
    resetFields(1);
  };

  const handleSendOTPClick = async () => {
    const otp = Login?.otp.join('');
    if (!otp) {
      toast.info('Please enter OTP', toastOptions);
      return;
    }
    if (otp.length !== 6) {
      toast.info('Please fill complete OTP', toastOptions);
      return;
    }
    setLoading(true);
    let response = await handleAPIData('POST', '/api/vendors', {  type: 'VENDORS_LOGIN', mobile: `91${Login?.mobile}`, otp });
    console.log('/api/vendors Login?.mobile, otp', response);
    if (response.status === 'success' && response.data.verified) {
      toast.success(response.data.message, toastOptions);
      // rout in 
      resetFields(0);
      resetFields(1);
      onLoginSuccess(`91${Login?.mobile}`);
    } else if (response.status === 'success' && (response.data.notVerified || response.data.expired)) {
      toast.error(response.data.message, toastOptions);
      resetFields(1, 'otp');
    } else if (response.status === 'error' && response.message) {
      toast.error(response.message, toastOptions);
      resetFields(1, 'otp');
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
      resetFields(1, 'otp');
    }
    setLoading(false);
  };

  useImperativeHandle(ref, () => ({
    handleChangeNumberClick,
    handleSendOTPClick
  }));

  useEffect(() => {
    let timer;
    if (timeLeft <= 0) {
      setIsResendDisabled(false); // Enable resend button when time reaches 0
      return; // Stop the timer
    }    

    // Create the interval
    const startResendTimer = () => {
      timer = setInterval(() => {
        console.log("timeLeft: ", timeLeft);
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 
    
    startResendTimer();   

    return () => clearInterval(timer); 
  }, [timeLeft]);


  return (
    <React.Fragment>
      <div className="header header-login">
        <div className="header-left">
          <a href="#!" className="logo">
            <img src="./assets/images/logo.png" alt="logo" />
          </a>
        </div>
      </div>
      <div className="container-fluid ps-0">
        <div className="row align-items-center">
          <div className="col-md-7 col-sm-12">
            <div className="login-image">
            </div>
          </div>
          <div className="col-md-3 offset-md-1 col-sm-12">
            <div className={`login-entry ${loginEntry}`}>
              <h3 className="mb-4">Login using mobile number</h3>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Enter mobile number</label>
                <Input ref={childRefs[0]} id={"login-enter-mobile-number"} keyName={"mobile"} componentName={"Login"} />
              </div>
              <div className="d-grid gap-2">
                <Button id={"login-get-otp-btn"} loading={loading} handleBtnClick={() => handleLogInEntryClick(false)} btnType={"primary"} classes={"btn-sm"} label={"Send OTP"} />
              </div>
            </div>
            <div className={`login-otp ${loginOTP}`}>
              <h3 className="mb-1">Enter OTP</h3>
              <p>OTP sent to +91 {Login.mobile}</p>
              <Button aTag={true} id={"login-change-number"} handleBtnClick={handleChangeNumberClick} classes={"coloured-link"} label={"Change Number"} />
              <div className="mb-3 mt-4 d-flex justify-content-between">
                <OTPInput ref={childRefs[1]} id={"login-otp"} keyName={"otp"} componentName={"Login"} />
              </div>
              <div className="d-grid gap-2 mb-2">
                <Button id={"login-send-otp-btn"} loading={loading} handleBtnClick={handleSendOTPClick} btnType={"primary"} classes={"btn-sm"} label={"Sign In"} />
              </div>
              <Button aTag={true} id={"login-resend-otp"} handleBtnClick={() => handleLogInEntryClick(true)} classes={`coloured-link ${isResendDisabled ? "disabled-link" : ""}`} label={isResendDisabled? `Resend OTP in ${timeLeft}s` : "Resend OTP"} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Login;