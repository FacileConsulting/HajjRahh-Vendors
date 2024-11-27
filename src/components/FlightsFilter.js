import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from './Checkbox';
import Button from './Button';
import store from '../store'


const FlightsFilter = forwardRef((props, ref) => {
  const { id, loading, flightsCallback, toCallback, panelClass, handlePanelCallback } = props;
  const childRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];


  const handlePanel = () => {
    handlePanelCallback();
  }

  const handleSearchClick = () => {
    flightsCallback('filter');
  }

  const handleCancelClick = () => {
    console.log('childRefs', childRefs);
    for (let index = 0; index < childRefs.length; index++) {
      if (childRefs[index].current) {
        childRefs[index].current.resetRefCalled();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleCancelClick
  }));

  // Fetch data when component mounts
  useEffect(() => {
    handleCancelClick();
  }, [toCallback]); // Empty dependency array means this runs once on mount

  return (
    <div id={id} className="section-listing-filter" >
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <ul className="d-flex flex-row listing-filters justify-content-center align-items-start list-unstyled">
              <li className="filter-type-first text-end">
                <a href="#!" onClick={handlePanel}><i className="bi bi-funnel-fill"></i></a>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Airlines<i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[0]} id={"flight-filter-emirates"} keyName={"emirates"} />
                      <label className="form-check-label" htmlFor="emiratesFor">
                        Emirates
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[1]} id={"flight-filter-lufthansa"} keyName={"lufthansa"} />
                      <label className="form-check-label" htmlFor="lufthansaFor">
                        Lufthansa
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[2]} id={"flight-filter-qatarAiraways"} keyName={"qatarAiraways"} />
                      <label className="form-check-label" htmlFor="qatarAirawaysFor">
                        Qatar Airways
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[3]} id={"flight-filter-etihadAiraways"} keyName={"etihadAiraways"} />
                      <label className="form-check-label" htmlFor="etihadAirawaysFor">
                        Etihad Airways
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[4]} id={"flight-filter-egyptair"} keyName={"egyptair"} />
                      <label className="form-check-label" htmlFor="egyptairFor">
                        Egyptair
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Duration <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[5]} id={"flight-filter-two-four-hour"} keyName={"twoFourHour"} />
                      <label className="form-check-label" htmlFor="twoFourHourFor">
                        2-4 Hours
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[6]} id={"flight-filter-four-six-hour"} keyName={"fourSixHour"} />
                      <label className="form-check-label" htmlFor="fourSixHourFor">
                        4-6 Hours
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>No. Of Stops <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[7]} id={"flight-filter-zero-stop"} keyName={"zeroStop"} />
                      <label className="form-check-label" htmlFor="zeroStopFor">
                        0 Stop
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[8]} id={"flight-filter-one-stop"} keyName={"oneStop"} />
                      <label className="form-check-label" htmlFor="oneStopFor">
                        1 Stop
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[9]} id={"flight-filter-above-one-stop"} keyName={"aboveOneStop"} />
                      <label className="form-check-label" htmlFor="aboveOneStopFor">
                        Above 1 Stop
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Halal <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[10]} id={"flight-filter-egg"} keyName={"egg"} disabled={true} />
                      <label className="form-check-label" htmlFor="eggFor">
                        Egg
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[11]} id={"flight-filter-non-veg"} keyName={"nonVeg"} disabled={true} />
                      <label className="form-check-label" htmlFor="nonVegFor">
                        Non Veg
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Time <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check flight-time">
                      <Checkbox ref={childRefs[12]} id={"flight-filter-morning"} keyName={"morning"} />
                      <label className="form-check-label" htmlFor="morningFor">
                        00:00 am to 05:59am
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check flight-time">
                      <Checkbox ref={childRefs[13]} id={"flight-filter-afternoon"} keyName={"afternoon"} />
                      <label className="form-check-label" htmlFor="afternoonFor">
                        06:00 am to 11:59 am
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check flight-time">
                      <Checkbox ref={childRefs[14]} id={"flight-filter-evening"} keyName={"evening"} />
                      <label className="form-check-label" htmlFor="eveningFor">
                        12:00 pm to 05:59 pm
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check flight-time">
                      <Checkbox ref={childRefs[15]} id={"flight-filter-night"} keyName={"night"} />
                      <label className="form-check-label" htmlFor="nightFor">
                        06:00 pm to 11:59 pm
                      </label>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
            <div className={`text-center mt-3 ${panelClass}`} onClick={handlePanel}>
              <Button id={"flight-filter-cancel-btn"} handleBtnClick={handleCancelClick} btnType={"secondary"} classes={"btn-sm flight-cancel-btn"} label={"Cancel"} />
              <Button id={"flight-filter-search-btn"} loading={loading} handleBtnClick={handleSearchClick} btnType={"primary"} classes={"btn-sm"} label={"Search"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default FlightsFilter;