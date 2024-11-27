import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetHomeFunc } from '../reducers/homeSlice';
import { changeInputFunc, resetInputFunc } from '../reducers/myAccountSlice';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import Input from './Input';
import Button from './Button';

const Login = forwardRef((props, ref) => {
  const { id } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const childRefs = [useRef(), useRef()];
  const { enterEmailLogin, enterPasswordLogin } = useSelector(state => {
    console.log('state.myAccount login', state)
    return state.myAccount
  });
  const [loading, setLoading] = useState(false);
  
  const getPaymentMethodType = (arr) => {
    let obj = {};
    let creditCard = arr.filter((item) => item === 'creditCard');    
    let debitCard = arr.filter((item) => item === 'debitCard');    
    let upi = arr.filter((item) => item === 'upi');

    if (creditCard.length > 0) {
      obj.creditCard = true;
    } else {
      obj.creditCard = false;
    }

    if (debitCard.length > 0) {
      obj.debitCard = true;
    } else {
      obj.debitCard = false;
    }

    if (upi.length > 0) {
      obj.upi = true;
    } else {
      obj.upi = false;
    }

    return obj;
  }


  const handleSignInClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!enterEmailLogin && !enterPasswordLogin) {
      toast.warning('Please enter something to update', toastOptions);
      return;
    }

    if (!enterEmailLogin) {
      toast.warning('Please enter email', toastOptions);
      return;
    }

    if (!enterPasswordLogin) {
      toast.warning('Please enter password', toastOptions);
      return;
    }

    if (loading) {
      return;
    }

    if (enterEmailLogin && !emailRegex.test(enterEmailLogin)) {
      toast.warning('Please enter a valid email', toastOptions);
      return;
    }

    console.log('sign in changes', enterEmailLogin, enterPasswordLogin);
    // return;

    const payload = {};

    if (enterEmailLogin && enterPasswordLogin) {
      payload.email = enterEmailLogin.trim();
      payload.password = enterPasswordLogin.trim();
    }

    setLoading(true);
    let response = await handleAPIData('POST', '/api/login', payload);
    console.log('QQQQQQQQQQQQQQQQQQQQQQQ', response);
    if (response.status === 'success' && response.data.invalidPassword && response.data.message) {
      toast.error(response.data.message, toastOptions);
    } else if (response.status === 'success' && response.data.invalidUser && response.data.message) {
      handleCancelClick();
      toast.error(response.data.message, toastOptions);
    } else if (response.status === 'success' && response.data.userLoggedIn && response.data.message) {
      toast.success(response.data.message, toastOptions);
      handleCancelClick();
      // dispatch(resetHomeFunc());
      // dispatch(resetInputFunc());
      const { userId, username, email, phoneNumber, address, paymentMethodType, isEnabledEmailNotification } = response.data;
      const allPaymentMethodObj = getPaymentMethodType(paymentMethodType);
      const userDetails = { userId, username, email, phoneNumber, address, ...allPaymentMethodObj, isEnabledEmailNotification };
      dispatch(changeInputFunc({ keyName: 'userId', value: userId }));
      dispatch(changeInputFunc({ keyName: 'displayName', value: username }));
      dispatch(changeInputFunc({ keyName: 'displayEmail', value: email }));
      dispatch(changeInputFunc({ keyName: 'displayPhone', value: phoneNumber }));
      dispatch(changeInputFunc({ keyName: 'displayAddress', value: address }));
      dispatch(changeInputFunc({ keyName: 'creditCard', value: allPaymentMethodObj.creditCard }));
      dispatch(changeInputFunc({ keyName: 'debitCard', value: allPaymentMethodObj.debitCard }));
      dispatch(changeInputFunc({ keyName: 'upi', value: allPaymentMethodObj.upi }));
      dispatch(changeInputFunc({ keyName: 'emailSettings', value: isEnabledEmailNotification }));
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(userDetails));
      history.push('/flights');
      console.log('response', response.data);
    } else if (response.status === 'error' && response.data.message) {
      toast.error(response.data.message, toastOptions);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  };

  const handleCancelClick = () => {
    for (let index = 0; index < childRefs.length; index++) {
      if (childRefs[index].current) {
        childRefs[index].current.resetRefCalled(index);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleCancelClick
  }));

  return (
    <div className="tab-pane fade show active" id={id} role="tabpanel" aria-labelledby="tab-1"
      tabIndex="0">
      <div className="row">
        <div className="col-12 mb-3">
          <Input ref={childRefs[0]} id={"login-enter-email"} keyName={"enterEmailLogin"} placeholder={"Enter email"} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <Input ref={childRefs[1]} id={"register-enter-password"} keyName={"enterPasswordLogin"} placeholder={"Enter password"} type={"password"} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <a href="#!" className="forgot-link">Forgot password?</a>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* <GoogleLogin
                          onSuccess={credentialResponse => {
                            console.log('credentialResponse', credentialResponse);
                            const cred = decodeJwt(credentialResponse.credential);
                            console.log('Login Success: currentUser: data', cred);
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        /> */}
          <Button id={"login-sign-in-btn"} loading={loading} handleBtnClick={handleSignInClick} btnType={"primary"} classes={"float-end"} label={"Sign In"} />
          <Button id={"login-cancel-btn"} handleBtnClick={handleCancelClick} btnType={"secondary"} classes={"float-end mx-4"} label={"Cancel"} />

        </div>
      </div>
    </div>
  )
});

export default Login;
