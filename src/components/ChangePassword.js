import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changeInputFunc } from '../reducers/myAccountSlice';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import Input from './Input';
import Button from './Button';

const ChangePassword = forwardRef((props, ref) => {
  const { id } = props;
  const dispatch = useDispatch();
  const childRefs = [useRef(), useRef(), useRef()];
  const { password, newPassword, confirmPassword, displayEmail } = useSelector(state => {
    console.log('state.myAccount', state)
    return state.myAccount 
  });
  const [loading, setLoading] = useState(false);


  const handleChangePasswordClick = async () => {

    if (loading) {
      return;
    }

    if (!password) {
      toast.warning('Please enter correct password', toastOptions);
      return;
    } else if (!newPassword) {
      toast.warning('Please enter a new password', toastOptions);
      return;
    } else if (!confirmPassword) {
      toast.warning('Please confirm new password', toastOptions);
      return;
    } else if (newPassword !== confirmPassword) {
      toast.warning('Passwords do not match', toastOptions);
      return;
    }

    console.log('password, newPassword, confirmPassword changes', password, newPassword, confirmPassword);
    // return;

    const payload = {
      type: 'CHANGE_PASSWORD',
      email: displayEmail,
      password: password.trim(),
      newPassword: newPassword.trim()
    }

    setLoading(true);
    let response = await handleAPIData('POST', '/api/myAccount', payload);
    console.log('response', response);
    if (response.status === 'success' && response.data.passwordChanged) {
      toast.success(response.data.message, toastOptions);
      handleResetClick();
    } else if (response.status === 'success'&& response.data.invalidPassword) {
      toast.error(response.data.message, toastOptions);
      console.log('response', response.data);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  };

  const handleResetClick = () => {
    for (let index = 0; index < childRefs.length; index++) {
      if (childRefs[index].current) {
        childRefs[index].current.resetRefCalled(index);        
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleResetClick
  }));

  return (
    <div className="tab-pane fade" id={id} role="tabpanel" tabIndex="0">
      <div className="row">
        <div className="row">
          <div className="col-4 mb-3">
            <Input ref={childRefs[0]} id={"my-account-change-password-old-password"} keyName={"password"} placeholder={"Enter old password"} type={"password"} />
            {/* <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter old password" /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-4 mb-3">
            <Input ref={childRefs[1]} id={"my-account-change-password-new-password"} keyName={"newPassword"} placeholder={"Enter new password"} type={"password"} />
          </div>
        </div>
        <div className="row">
          <div className="col-4 mb-3">
            <Input ref={childRefs[2]} id={"my-account-change-password-confirm-password"} keyName={"confirmPassword"} placeholder={"Reconfirm new password"} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button id={"my-account-edit-profile-change-password-btn"} loading={loading} handleBtnClick={handleChangePasswordClick} btnType={"primary"} classes={"float-end"} label={"Change password"} />
            <Button id={"my-account-edit-profile-reset-btn"} handleBtnClick={handleResetClick} btnType={"secondary"} classes={"float-end mx-4"} label={"Reset"} />
            {/* <button type="button" className="btn btn-primary float-end">Change password</button>
            <button type="button" className="btn btn-secondary float-end mx-4">Reset</button> */}
          </div>
        </div>
      </div>
    </div>
  )
});

export default ChangePassword;
