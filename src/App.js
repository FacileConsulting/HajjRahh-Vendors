import React, { useEffect, useState } from 'react';
import { Route, Switch, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import store from './store';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Holidays from './pages/Holidays';
import HolidayDetails from './pages/HolidayDetails';
import HolidayBooking from './pages/HolidayBooking';
import HolidayConfirmed from './pages/HolidayConfirmed';
import Cabs from './pages/Cabs';
import CabDetails from './pages/CabDetails';
import FlightDetails from './pages/FlightDetails';
import Flights from './pages/Flights';
import Trips from './pages/Trips';
import LoginRegister from './pages/LoginRegister';
import { handleAPIData } from './hooks/useCustomApi';
import { resetHomeFunc, updateFunc } from './reducers/homeSlice';
import { changeInputFunc, resetInputFunc, resetMyAccountFunc } from './reducers/myAccountSlice';
import { toastOptions } from './toastify';
// import './App.css';
import 'rsuite/DatePicker/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';



const App = ({ message }) => {
  localStorage.setItem('current_route', '/flights');
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isAuthenticated = !!localStorage.getItem('access_token');
  console.log('isAuthenticated', isAuthenticated)
  const { displayEmail } = useSelector(state => {
    console.log('state.myAccount register', state)
    return state.myAccount
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeHeaderIcon, setActiveHeaderIcon] = useState({ flights: 'flight-active', holidays: 'holidays', cabs: 'cabs', myAccount: 'myAccount', trips: 'trips', loginRegister: 'loginRegister' });

  const fetchHealthData = async () => {
    let response = await handleAPIData('GET', '/api/health');
    console.log('/api/health', response);
  }

  const handleLogOutClick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_route');
    localStorage.removeItem('user_data');
    dispatch(resetHomeFunc());
    dispatch(resetMyAccountFunc());
    setIsLoggedIn(false);
    history.push('/flights');
    toast.success('You are successfully logged out');
  }

  const checkTokenRouteUser = () => {
    const token = localStorage.getItem('access_token');
    const currRoute = localStorage.getItem('current_route');
    const userDetailsFromLocalStorage = localStorage.getItem('user_data');
    if (token && currRoute && userDetailsFromLocalStorage) {
      return { checked: true, currRoute, userDetailsFromLocalStorage };
    } else {
      history.push('/flights');
      return { checked: false };
    }
  }

  // Check if the page was refreshed
  const checkPageReload = () => {
    const navigationEntries = performance.getEntriesByType('navigation');
    console.log('ddddddd', navigationEntries);
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0];
      if (navEntry.type === 'reload' || navEntry.type === 'navigate') {
        const { checked, currRoute, userDetailsFromLocalStorage } = checkTokenRouteUser();
        console.log('###@#QW', checked, currRoute, userDetailsFromLocalStorage)
        if (checked && userDetailsFromLocalStorage) {
          console.log('###@#eee eeeeeeeQW', checked, currRoute, userDetailsFromLocalStorage)
          const { userId, username, email, phoneNumber, address, creditCard, debitCard, upi, isEnabledEmailNotification } = JSON.parse(userDetailsFromLocalStorage);
          dispatch(resetHomeFunc());
          dispatch(resetMyAccountFunc());
          dispatch(changeInputFunc({ keyName: 'userId', value: userId }));
          dispatch(changeInputFunc({ keyName: 'displayName', value: username }));
          dispatch(changeInputFunc({ keyName: 'displayEmail', value: email }));
          dispatch(changeInputFunc({ keyName: 'displayPhone', value: phoneNumber }));
          dispatch(changeInputFunc({ keyName: 'displayAddress', value: address }));
          dispatch(changeInputFunc({ keyName: 'creditCard', value: creditCard }));
          dispatch(changeInputFunc({ keyName: 'debitCard', value: debitCard }));
          dispatch(changeInputFunc({ keyName: 'upi', value: upi }));
          dispatch(changeInputFunc({ keyName: 'emailSettings', value: isEnabledEmailNotification }));
          console.log('Page was refreshed by the browser refresh buttoneeeee');
          history.push(currRoute);
        } else {
          history.push('/flights');
        }
      } else {
        history.push('/flights');
      }
    } else {
      history.push('/flights');
    }
  }

  const handleHeaderIconClick = (type) => {
    const obj = { flights: 'flights', holidays: 'holidays', cabs: 'cabs', myAccount: 'myAccount', trips: 'trips', loginRegister: 'loginRegister' };
    obj[type] =  `${type}-active`;
    setActiveHeaderIcon({ ...obj });
  }

  // const handleVendorsClick = (e) => {
  //   e.preventDefault();
  //   window.location.href = "http://localhost:3000/vendors";    
  //   // window.location.href = "https://hajjrahh-frontend-gab4gqfbfwgwcnhh.eastus-01.azurewebsites.net/vendors";
  // }

  useEffect(() => {
    fetchHealthData();
    checkPageReload();
  }, []);

  useEffect(() => {
    if (location.pathname !== '/holidays') {
      dispatch(resetHomeFunc());
    }
    // if (location.pathname === '/vendors') {
    //   history.push('/vendors');
    // }
    console.log("Route changed to:", location, location.pathname);
    handleHeaderIconClick(location.pathname.split('/')[1]);
  }, [location.pathname]);

  useEffect(() => {
    if (displayEmail) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [displayEmail]);

  console.log('$###############$', activeHeaderIcon);

  const Headers = () => {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary header-section">
        <div className="container-fluid">
          <Link to="/flights" className="navbar-brand">
            <img src="./assets/images/hajjrahh_logo.jpg" className="hajjrahh-logo" alt="..." />
          </Link>
          {/* <Link to="/" className="navbar-brand">Hajjrahh</Link> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item text-center" onClick={() => handleHeaderIconClick('flights')}>
                <span className={`nav-menu-icon img-${activeHeaderIcon.flights}`}></span><br />
                <Link to="/flights" className={activeHeaderIcon.flights}>Flights</Link>
              </li>
              <li className="nav-item text-center">
                <span className="nav-menu-icon img-hotel"></span> <br />
                <a className="nav-link" aria-current="page">Hotels</a>
              </li>
              <li className="nav-item text-center" onClick={() => handleHeaderIconClick('holidays')}>
                <span className={`nav-menu-icon img-${activeHeaderIcon.holidays}`}></span> <br />
                <Link to="/holidays" className={activeHeaderIcon.holidays}>Holidays</Link>
              </li>
              <li className="nav-item text-center" onClick={() => handleHeaderIconClick('cabs')}>
                <span className={`nav-menu-icon img-${activeHeaderIcon.cabs}`}></span> <br />
                <Link to="/cabs" className={activeHeaderIcon.cabs}>Cabs</Link>
              </li>
              <li className="nav-item text-center">
                <span className="nav-menu-icon img-invest"></span> <br />
                <a className="nav-link" aria-current="page">Invest</a>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex nav-secondary">
              {
                isLoggedIn &&
                <>
                  <li className="nav-item dropdown">
                    <Link to="/myAccount" className={activeHeaderIcon.myAccount}> My Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trips" className={activeHeaderIcon.trips}>Trips</Link>
                  </li>
                </>
              } 
              <li className="nav-item">
                <Link to="/holidayBooking">Support</Link>
                {/* <a className="nav-link" href="#">Support</a> */}
              </li>
              {
                isLoggedIn ?
                  <li className="nav-item" onClick={handleLogOutClick}>
                    <a className="nav-link" href="#">LogOut</a>
                  </li> :
                  <li className="nav-item">
                    <Link className={`nav-link nav-btn btn-secondary ${activeHeaderIcon.loginRegister}`} to="/loginRegister">Sign In</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  const Footers = () => {
    return (
      <div className="section-bg">
        <div className="container-xxl py-5 section-block">
          <div className="row align-items-center">
            <div className="col">
              <div className="logo mb-2">HajjRahh</div>
              <p className="text-dark">© 2024 HajjRahh. All rights reserved.</p>
            </div>
            <div className="col">
              <ul className="list-inline float-end">
                <li className="list-inline-item"><a>Terms of Use</a></li>
                <li className="list-inline-item">|</li>
                <li className="list-inline-item"><a>Privacy and Cookies</a></li>
                <li className="list-inline-item">|</li>
                <li className="list-inline-item"><a>Cookie consent</a></li>
                <li className="list-inline-item">|</li>
                <li className="list-inline-item"><a>Contact us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }



  return (
    <>
      <section className="section-wrapper">
        <Headers />
        <Switch>
          <Route path="/" exact component={Flights} />
          {/* <Route path="/myAccount" component={isAuthenticated ? <MyAccount /> : <LoginRegister />} /> */}
          {/* <Route
              path="/myAccount" component={MyAccount} render={() => isAuthenticated ? (
                  <Redirect to="/myAccount" />
                ) : (
                  <LoginRegister />
                )
              }
            /> */}
          <Route path="/myAccount" component={MyAccount} />
          <Route path="/trips" component={Trips} />
          <Route path="/holidays" component={Holidays} />
          <Route path="/holidayDetails" component={HolidayDetails} />
          <Route path="/holidayBooking" component={HolidayBooking} />
          <Route path="/holidayConfirmed" component={HolidayConfirmed} />
          <Route path="/cabs" component={Cabs} />
          <Route path="/cabDetails" component={CabDetails} />
          <Route path="/flights" component={Flights} />
          <Route path="/flightDetails" component={FlightDetails} />
          <Route path="/loginRegister" component={LoginRegister} />
        </Switch>
      </section>
      <Footers />
      <ToastContainer />
    </>
  )
};

export default App;
