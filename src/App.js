import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageRenderer from './components/PageRenderer';
import { vData } from './constant/vendor';
import {
  resetVendorsComponentFunc, resetVendorsFunc, updateVendorsFunc
} from './reducers/vendorsSlice';

import 'react-toastify/dist/ReactToastify.css';
import Vendors from './Vendors';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';


const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogoClick = () => {
    history.push('/dashboard');
  };
  return (
    <>
      <RequireAuth>
        <Switch>
          <>
            <Route
              path="/dashboard"
              render={() => <PageRenderer componentName={'Dashboard'} data={vData[0]} />
              }
            />
            <Route
              path="/package-management-list"
              render={() => <PageRenderer componentName={'PackageManagementList'} data={vData[1].subMenu[0]} />
              }
            />
            <Route
              path="/package-management-new"
              render={() => <PageRenderer componentName={'PackageManagementNew'} data={vData[1].subMenu[1]} />
              }
            />
            <Route
              path="/package-management-view"
              render={() => <PageRenderer componentName={'PackageManagementView'} data={vData[1].subMenu[2]} />
              }
            />
            <Route
              path="/pilgrimage-booking-new"
              render={() => <PageRenderer componentName={'PilgrimageBookingNew'} data={vData[1].subMenu[3]} />
              }
            />
            <Route
              path="/pilgrimage-booking-list"
              render={() => <PageRenderer componentName={'PilgrimageBookingList'} data={vData[1].subMenu[4]} />
              }
            />
            <Route
              path="/pilgrimage-booking-view"
              render={() => <PageRenderer componentName={'PilgrimageBookingView'} data={vData[1].subMenu[5]} />
              }
            />
            <Route
              path="/hotel-profile-management-list"
              render={() => <PageRenderer componentName={'HotelProfileManagementList'} data={vData[2].subMenu[0]} />
              }
            />
          </>
        </Switch>
      </RequireAuth>
      <ToastContainer />
    </>
  )
};

export default App;
