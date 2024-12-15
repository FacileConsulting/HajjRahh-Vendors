import React, { useEffect, useState} from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Login from "../pages/Login";
import Vendors from "../Vendors";
import { 
  updateVendorsFunc, 
  resetVendorsComponentFunc,
  resetVendorsFunc 
} from '../reducers/vendorsSlice';
import 'react-toastify/dist/ReactToastify.css';
import { use } from "react";

const RequireAuth = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginSuccess = (value) => {  
    console.log(value, 'valuesdfdsf');
    dispatch(updateVendorsFunc({ componentName: 'Login', keyName: 'loggedMobile', value }));
    localStorage.setItem('loggedMobile', value);
    history.push('/dashboard');
    setIsLoggedIn(true);
  };

  const onLogOutSuccess = () => {  
    dispatch(resetVendorsFunc());
    localStorage.removeItem("loggedMobile");
    setIsLoggedIn(false);
    history.push('/');
  };

  useEffect(() => {
    const loggedMobile = localStorage.getItem('loggedMobile');
    if (loggedMobile) {
      dispatch(updateVendorsFunc({ componentName: 'Login', keyName: 'loggedMobile', value: loggedMobile }));
      setIsLoggedIn(true);
      history.push('/dashboard');
    }
  }, []);

  return (
    !isLoggedIn ? (
      <Login onLoginSuccess={onLoginSuccess} />
    ) : (
      <>
        <Vendors onLogOutSuccess={onLogOutSuccess}/>
        {children}
      </>
    )
  );
};

export default withRouter(RequireAuth);
