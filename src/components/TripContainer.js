import React from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

const TripContainer = ({ id, tripData, statusClass }) => {
  console.log('tripData', tripData)

  // const { displayName, displayEmail, displayPhone, displayAddress } = useSelector(state => state.myAccount);
  const handleViewDetailsClick = () => {

  }
  const handleEndTripClick = () => {

  }
  const handleCancelTripClick = () => {

  }

  return (
    <div className="row mb-4" id={id} key={id}>
      <div className="col-5 offset-1">
        <div className="d-flex flex-row">
          <div className="trip-image">
            <img src={`./assets/images/book_online/${tripData.image}`} className="img-style" alt="" />
          </div>
          <div className="ps-3">
            <h3>{tripData.packageName}</h3>
            <p>{tripData.dateRange.length ? `${tripData.dateRange[0]} to ${tripData.dateRange[tripData.dateRange.length - 1]}` : 'No Dates Available'}</p>
            <span className={`badge text-bg-${statusClass} mt-2 trip-status`}>{tripData.status}</span>
          </div>
        </div>
      </div>
      <div className="col-5 text-end">
      <Button id={"trip-container-view-details-btn"} loading={false} handleBtnClick={handleViewDetailsClick} btnType={"primary"} classes={"btn-sm"} label={"View details"} />
        {
          tripData.status === 'upcoming' &&
          <>
            <Button id={"trip-container-end-trip-btn"} loading={false} handleBtnClick={handleEndTripClick} btnType={"secondary"} classes={"btn-sm mx-2"} label={"End trip"} />
            <Button id={"trip-container-cancel-trip-btn"} loading={false} handleBtnClick={handleCancelTripClick} btnType={"secondary"} classes={"btn-sm"} label={"Cancel trip"} />
          </>
        }
      </div>
    </div>
  )
};

export default TripContainer;
