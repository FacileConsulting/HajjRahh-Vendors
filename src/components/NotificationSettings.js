import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import { changeInputFunc } from '../reducers/myAccountSlice';
import Radio from './Radio';
import Button from './Button';

const NotificationSettings = ({ id }) => {
  const dispatch = useDispatch();
  const childRefs = [useRef(), useRef()];
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
    console.log('state.myAccount', state)
    return state.myAccount 
  });
  const [loading, setLoading] = useState(false);

  const handleSaveClick = async () => {

    if (loading) {
      return;
    }
    // return;

    const payload = {
      type: 'NOTIFICATION_SETTINGS',
      email: displayEmail,
      isEnabledEmailNotification: emailSettings
    }

    setLoading(true);
    let response = await handleAPIData('POST', '/api/myAccount', payload);
    console.log('response', response);
    if (response.status === 'success' && response.data?.isEnabledEmailNotification) {
      const { isEnabledEmailNotification } = response.data;
      const userDetails = { 
        userId,
        username: displayName, 
        email: displayEmail,
        phoneNumber: displayPhone, 
        address: displayAddress,
        creditCard,
        debitCard,
        upi, 
        isEnabledEmailNotification,
      };
      dispatch(changeInputFunc({ keyName: 'emailSettings', value: isEnabledEmailNotification }));
      localStorage.setItem('user_data', JSON.stringify(userDetails));
      toast.success("Notification Settings Updated Successfully", toastOptions);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  };

  const handleResetClick = () => {
    for (let index = 0; index < childRefs.length; index++) {
      if (childRefs[index].current) {
        childRefs[index].current.resetRefCalled(
          "my-account-notification-settings-email-enable",
          "emailSettings",
          "emailEnabled"
        );        
      }
    }
  };

  return (
    <div className="tab-pane fade" id={id} role="tabpanel" tabIndex="0">
      <div className="row">
        <div className="col-4 mb-3">
        <p className="mb-1">Notification email</p>
          <div className="form-check">
            <Radio ref={childRefs[0]} id={"my-account-notification-settings-email-enable"} name={"notification-settings-radio"} keyName={"emailSettings"} valueRadioName={"emailEnabled"} defaultValue={emailSettings} />
            <label className="form-check-label mt-1" htmlFor="emailEnabledFor">
              Enable
            </label>
          </div>
          <div className="form-check">
            <Radio ref={childRefs[1]} id={"my-account-notification-settings-email-disable"} name={"notification-settings-radio"} keyName={"emailSettings"} valueRadioName={"emailDisabled"} defaultValue={emailSettings} />
            {/* <input className="form-check-input" type="radio" value="" id="flexRadioDefault2" /> */}
            <label className="form-check-label mt-1" htmlFor="emailDisabledFor">
              Disable
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button id={"my-account-notification-settings-save-btn"} loading={loading} handleBtnClick={handleSaveClick} btnType={"primary"} classes={"float-end"} label={"Save"} />
          <Button id={"my-account-notification-settings-reset-btn"} handleBtnClick={handleResetClick} btnType={"secondary"} classes={"float-end mx-4"} label={"Reset"} />
          {/* <button type="button" className="btn btn-primary float-end">Save</button>
          <button type="button" className="btn btn-secondary float-end mx-4">Reset</button> */}
        </div>
      </div>
    </div>
  )
};

export default NotificationSettings;
