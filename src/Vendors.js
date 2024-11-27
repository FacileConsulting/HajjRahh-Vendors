import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navigation from './components/vendors/Navigation';
import PageRenderer from './components/vendors/PageRenderer';
import { vData } from './constant/vendor';
import {
  resetVendorsComponentFunc, resetVendorsFunc, updateVendorsFunc
} from './reducers/vendorsSlice';

import 'react-toastify/dist/ReactToastify.css';
import './Vendors.css';

const renderRoutes = (routes) => {
  return routes.map((item) => (
    <React.Fragment key={item.link}>
      {/* Main Route */}
      <Route
        path={`/vendors${item.link}`}
        exact={item.exact}
        render={() =>
          item.component ? (
            <PageRenderer componentName={item.component} data={item} />
          ) : null
        }
      />
      
      {/* Render Sub-routes if any */}
      {item.subMenu && renderRoutes(item.subMenu)}
    </React.Fragment>
  ));
};

const Vendors = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetVendorsFunc());
  }, []);
  // localStorage.setItem('current_route', '/vendors');

  return (
    <>
      <div className="vendor-main header">
        <div className="header-left">
          <a href="#!" className="logo">
            <img src="./assets/images/applogo.png" alt="logo" />
          </a>
          <div className="input-group header-search">
            <span className="input-group-text" id="basic-addon1"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <ul className="header-right list-unstyled">
          <li className="logout"><a href="#!"><i className="bi bi-box-arrow-right"></i></a></li>
        </ul>
      </div>
      <Navigation />
      <Switch>
        {renderRoutes(vData)}
      </Switch>
      <ToastContainer />
    </>

  )
};

export default Vendors;
