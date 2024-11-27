import React, { useRef  } from 'react';
import EditProfile from '../components/EditProfile';
import DisplayProfile from '../components/DisplayProfile';
import ChangePassword from '../components/ChangePassword';
import NotificationSettings from '../components/NotificationSettings';
import PaymentMethod from '../components/PaymentMethod';

const MyAccount = ({id }) => {
  localStorage.setItem('current_route', '/myAccount');
  // Below useRef and reset/cancel is used to reset the fields on tab change
  const editProfileRef = useRef();
  const changePasswordRef = useRef();
  // const paymentMethodRef = useRef();

  const handleEditProfileTabClick = () => {
    if (editProfileRef.current) {
      editProfileRef.current.handleCancelClick();
    }
  };

  const handleChangePasswordTabClick = () => {
    if (changePasswordRef.current) {
      changePasswordRef.current.handleResetClick();
    }
  };

  // const handlePaymentMethodTabClick = () => {
  //   if (paymentMethodRef.current) {
  //     paymentMethodRef.current.handleResetClick();
  //   }
  // };

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
            <div className="col-lg-12 col-md-12 text-center">
                <h1 className="mb-2">My account</h1>
                <p className="hero-text">View/manage your account details</p>
            </div>
        </div>
    </div>
    <div className="container-xxl py-5 section-block">
      <div className="row">
        <div className="col-3">
          <div className="row">
            <DisplayProfile />
          </div>
        </div>
        <div className="col-9">
          <ul className="nav nav-tabs justify-content-center" id="my-account-details" role="tablist">
            <li className="nav-item" role="presentation">
            <button className="nav-link active" id="edit-profile" data-bs-toggle="tab" data-bs-target="#my-account-edit-profile" type="button" role="tab" aria-selected="true" onClick={handleEditProfileTabClick}>Edit profile</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="change-password" data-bs-toggle="tab" data-bs-target="#my-account-change-password" type="button" role="tab" aria-selected="false" onClick={handleChangePasswordTabClick}>Change password</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="notification-settings" data-bs-toggle="tab" data-bs-target="#my-account-notification-settings" type="button" role="tab" aria-selected="false">Notification settings</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="payment-methods" data-bs-toggle="tab" data-bs-target="#my-account-payment-method" type="button" role="tab" aria-selected="false">Payment method</button>
            </li>
          </ul>
          <div className="row tab-margin">
            <div className="col">
              <div className="tab-content" id="my-account-content">
                <EditProfile id={"my-account-edit-profile"}  ref={editProfileRef} />
                <ChangePassword id={"my-account-change-password"} ref={changePasswordRef} />
                <NotificationSettings id={"my-account-notification-settings"} />
                <PaymentMethod id={"my-account-payment-method"} />
              </div>
            </div>
          </div>
        </div>              
      </div>
    </div>
    </>
  )
};

export default MyAccount;
