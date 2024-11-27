import React from 'react';
import { useSelector } from 'react-redux';

const NoDataAvailable = ({ text }) => {

  
  return (
    <div className="row mb-4 trip-block">
      <div className="col-8">
        <div className="d-flex flex-row">
          <div className="ps-3">
            <h3>{text}</h3>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoDataAvailable;
