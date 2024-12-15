import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import PageRenderer from './components/PageRenderer';
import { vData } from './constant/vendor';
import {
  resetVendorsComponentFunc, resetVendorsFunc, updateVendorsFunc
} from './reducers/vendorsSlice';


import './Vendors.css';
import Login from './pages/Login';


const Vendors = ({ onLogOutSuccess }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Login } = useSelector(state => state.vendors);
  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Open the clicked menu, close if already open
  };

  const handleLogoClick = () => {
    history.push('/dashboard');
  };

  const handleLogOutClick = () => {
    onLogOutSuccess();
  };

  return (
    <React.Fragment>
      <div className="vendor-main header">
        <div className="header-left">
          <a className="logo">
            <img src="./assets/images/applogo.png" alt="logo" onClick={handleLogoClick} />
          </a>
          <div className="input-group header-search">
            <span className="input-group-text" id="basic-addon1"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <ul className="header-right list-unstyled">
          <span className="mt-1 p-1">User : {Login.loggedMobile}</span>
          <li className="logout" onClick={handleLogOutClick}><a href="#!"><i className="bi bi-box-arrow-right"></i></a></li>
        </ul>
      </div>
      <nav>
        <ul className="navigation list-unstyled">
          {vData.map((menuItem, index) => (
            <React.Fragment key={menuItem.id}>
              {menuItem.subMenu.length > 0 ? (
                <li>
                  <a
                    className={`main-menu ${openMenu === index ? "active" : ""}`}
                    onClick={() => handleToggle(index)}
                  >
                    {menuItem.title} <i className={`bi bi-chevron-right arrow-toggle ${openMenu === index ? "rotated" : ""}`}></i>
                  </a>
                  <ul
                    className="sub-menu list-unstyled"
                    style={{ display: openMenu === index ? "block" : "none" }}
                  >
                    {menuItem.subMenu.map((subMenuItem) => (
                      <li key={subMenuItem.title} className={subMenuItem.hide} >
                        <Link to={subMenuItem.link}>{subMenuItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li>
                  <Link to={menuItem.link}>{menuItem.title}</Link>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  )
};

export default Vendors;
