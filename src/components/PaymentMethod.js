import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import { changeInputFunc } from '../reducers/myAccountSlice';
import Checkbox from './Checkbox';
import Button from './Button';

const PaymentMethod = forwardRef((props, ref) => {
  const { id } = props;
  const dispatch = useDispatch();
  const childRefs = [useRef(), useRef(), useRef()];

  const { 
    userId,
    displayName, 
    displayEmail, 
    displayPhone, 
    displayAddress, 
    creditCard, 
    debitCard,
    upi,
    emailSettings 
  } = useSelector(state => {
    console.log('state.myAccount.apyment', state)
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

  const handleSaveClick = async () => {

    const paymentSetter = () => {
      const getValues = [];
      if (creditCard) {
        getValues.push('creditCard');
      } 
      if (debitCard) {
        getValues.push('debitCard');
      } 
      if (upi) {
        getValues.push('upi');
      } 
      return getValues;
    }

    const getArray = paymentSetter();
    if (getArray.length === 0) {
      toast.info('Please select atleast one payment method', toastOptions);
      return;
    }

    if (loading) {
      return;
    }

    console.log('creditCard, debitCard, upi', creditCard, debitCard, upi );
    // return;

    const payload = {
      type: 'PAYMENT_METHOD',
      email: displayEmail,
      paymentMethodType: paymentSetter()
    }

    if (payload.paymentMethodType.length === 0) {
      return;
    }    

    setLoading(true);
    let response = await handleAPIData('POST', '/api/myAccount', payload);
    console.log('response', response);
    if (response.status === 'success' && response.data?.paymentMethodType) {
      const { paymentMethodType } = response.data;
      const allPaymentMethodObj = getPaymentMethodType(paymentMethodType);
      const userDetails = { 
        userId,
        username: displayName, 
        email: displayEmail,
        phoneNumber: displayPhone, 
        address: displayAddress,
        ...allPaymentMethodObj,
        isEnabledEmailNotification: emailSettings
      };
      dispatch(changeInputFunc({ keyName: 'creditCard', value: allPaymentMethodObj.creditCard }));
      dispatch(changeInputFunc({ keyName: 'debitCard', value: allPaymentMethodObj.debitCard }));
      dispatch(changeInputFunc({ keyName: 'upi', value: allPaymentMethodObj.upi }));
      localStorage.setItem('user_data', JSON.stringify(userDetails));
      toast.success('Payment Method types updated successfully', toastOptions);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  };

  const handleResetClick = () => {
    for (let index = 0; index < childRefs.length; index++) {
      if (childRefs[index].current) {
        childRefs[index].current.resetRefCalled();        
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleResetClick
  }));

  return (
    <div className="tab-pane fade" id={id} role="tabpanel" tabIndex="0">
      <div className="row">
        <div className="col-4 mb-3">
          <p className="mb-1">Select mode of payments</p>
          <div className="form-check">
            <Checkbox ref={childRefs[0]} id={"my-account-payment-method-credit-card"} keyName={"creditCard"} defaultValue={creditCard} />
            <label className="form-check-label mt-1" htmlFor="creditCardFor">
              Credit card
            </label>
          </div>
          <div className="form-check">
            <Checkbox ref={childRefs[1]} id={"my-account-payment-method--debit-card"} keyName={"debitCard"} defaultValue={debitCard} />
            <label className="form-check-label mt-1" htmlFor="debitCardFor">
              Debit card
            </label>
          </div>
          <div className="form-check">
            <Checkbox ref={childRefs[2]} id={"my-account-payment-method-upi"} keyName={"upi"} defaultValue={upi} />
            <label className="form-check-label mt-1" htmlFor="upiFor">
              UPI
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button id={"my-account-payment-method-save-btn"} loading={loading} handleBtnClick={handleSaveClick} btnType={"primary"} classes={"float-end"} label={"Save"} />
          <Button id={"my-account-payment-method-reset-btn"} handleBtnClick={handleResetClick} btnType={"secondary"} classes={"float-end mx-4"} label={"Reset"} />
        </div>
      </div>
    </div>
  )
});

export default PaymentMethod;
