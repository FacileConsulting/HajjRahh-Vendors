// Navigation.js
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { vData } from '../../constant/vendor';

const Navigation = () => {
  const history = useHistory();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [componentActive, setComponentActive] = useState('')

  const handleMenuClick = (item, index) => {
    if (item.subMenu) {
      setOpenMenuIndex(openMenuIndex === index ? null : index);
    } else {
      setComponentActive(item.component);
    }
  };
  
  const renderMenuItems = (items) => {
    return items.map((item, index) => (
      <li key={index} className={item.hide}>
        <Link
          to={`/vendors${item.link}`}
          className={!item.subMenu && `${componentActive === item.component ? 'active main-menu' : 'main-menu'}`}
          onClick={() => handleMenuClick(item, index)}
        >
          {item.title}
          {item.subMenu && <i className={`bi bi-chevron-right ${openMenuIndex === index ? 'rotated' : ''}`}></i>}
        </Link>
        {item.subMenu && openMenuIndex === index && (
          <ul className="sub-menu list-unstyled">
            {renderMenuItems(item.subMenu)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav>
      <ul className="navigation list-unstyled">{renderMenuItems(vData)}</ul>
    </nav>
  );
};

export default Navigation;