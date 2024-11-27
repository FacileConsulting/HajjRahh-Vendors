import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { decodeJwt } from 'jose';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import Register from '../components/Register';
import Login from '../components/Login';

const LoginRegister = () => {
  localStorage.setItem('current_route', '/loginRegister');

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12 text-center">
            <h1 className="mb-2">Welcome to Hajjrah</h1>
            <p className="hero-text">Please Sign In / Sign Up using your Email/Mobile to continue</p>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col-4 offset-4">
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="header-login-btn" data-bs-toggle="tab" data-bs-target="#login-pane" type="button"
                  role="tab">Sign In</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="header-register-btn" data-bs-toggle="tab" data-bs-target="#register-pane" type="button"
                  role="tab">Sign Up</button>
              </li>
            </ul>
            <div className="row tab-margin">
              <div className="col">
                <div className="tab-content" id="login-register-content">
                  <Login id={"login-pane"} />                  
                  <Register id={"register-pane"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default LoginRegister;
