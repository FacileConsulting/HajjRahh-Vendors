import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from './Checkbox';
import Button from './Button';
import store from '../store'


const CabsFilter = forwardRef((props, ref) => {
  const { id, loading, cabsCallback, toCallback, panelClass, handlePanelCallback } = props;
  const { cabPassengers3, cabPassengers4, cabPassengers5, cabPassengers6, cabPriceLt40, cabPriceLt60, cabPriceLt80, cabPriceLt100, cabVehicleHatchback, cabVehicleSedan, cabVehicleSUV, cabVehicleMUV, cabVehicleCompactSUV, cabModelWagonR, cabModelIndica, cabModelDzire, cabModelEtios, cabModelXcent } = useSelector(state => state.myAccount);
  const childRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];


  const handlePanel = () => {
    handlePanelCallback();
  }

  const handleSearchClick = () => {
    cabsCallback('filter');
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
                <a href="#!" onClick={handlePanel}>Passenger capacity<i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>                  
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[0]} id={"cab-filter-cabPassengers3"} keyName={"cabPassengers3"} defaultValue={cabPassengers3} />
                      <label className="form-check-label" htmlFor="cabPassengers3">
                        3 Passengers
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[1]} id={"cab-filter-cabPassengers4"} keyName={"cabPassengers4"} defaultValue={cabPassengers4} />
                      <label className="form-check-label" htmlFor="cabPassengers4">
                        4 Passengers
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[2]} id={"cab-filter-cabPassengers5"} keyName={"cabPassengers5"} defaultValue={cabPassengers5} />
                      <label className="form-check-label" htmlFor="cabPassengers5">
                        5 Passengers
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[3]} id={"cab-filter-cabPassengers6"} keyName={"cabPassengers6"} defaultValue={cabPassengers6} />
                      <label className="form-check-label" htmlFor="cabPassengers6">
                        6 Passengers
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Price <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[4]} id={"cab-filter-cabPriceLt40"} keyName={"cabPriceLt40"} defaultValue={cabPriceLt40} />
                      <label className="form-check-label" htmlFor="cabPriceLt40">
                        $20 - $40
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[5]} id={"cab-filter-cabPriceLt60"} keyName={"cabPriceLt60"} defaultValue={cabPriceLt60} />
                      <label className="form-check-label" htmlFor="cabPriceLt60">
                        $40 - $60
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[6]} id={"cab-filter-cabPriceLt80"} keyName={"cabPriceLt80"} defaultValue={cabPriceLt80} />
                      <label className="form-check-label" htmlFor="cabPriceLt80">
                        $60 - $80
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[7]} id={"cab-filter-cabPriceLt100"} keyName={"cabPriceLt100"} defaultValue={cabPriceLt100} />
                      <label className="form-check-label" htmlFor="cabPriceLt100">
                        $80 - $100
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Vehicle Type <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[8]} id={"cab-filter-cabVehicleHatchback"} keyName={"cabVehicleHatchback"} defaultValue={cabVehicleHatchback} />
                      <label className="form-check-label" htmlFor="cabVehicleHatchback">
                        Hatchback
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[9]} id={"cab-filter-cabVehicleSedan"} keyName={"cabVehicleSedan"} defaultValue={cabVehicleSedan} />
                      <label className="form-check-label" htmlFor="cabVehicleSedan">
                        Sedan
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[10]} id={"cab-filter-cabVehicleSUV"} keyName={"cabVehicleSUV"} defaultValue={cabVehicleSUV} />
                      <label className="form-check-label" htmlFor="cabVehicleSUV">
                        SUV
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[11]} id={"cab-filter-cabVehicleMUV"} keyName={"cabVehicleMUV"} defaultValue={cabVehicleMUV} />
                      <label className="form-check-label" htmlFor="cabVehicleMUV">
                        MUV
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[12]} id={"cab-filter-cabVehicleCompactSUV"} keyName={"cabVehicleCompactSUV"} defaultValue={cabVehicleCompactSUV} />
                      <label className="form-check-label" htmlFor="cabVehicleCompactSUV">
                        Compact SUV
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Car Model <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[13]} id={"cab-filter-cabModelWagonR"} keyName={"cabModelWagonR"} defaultValue={cabModelWagonR} />
                      <label className="form-check-label" htmlFor="cabModelWagonR">
                        Wagon R
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[14]} id={"cab-filter-cabModelIndica"} keyName={"cabModelIndica"} defaultValue={cabModelIndica} />
                      <label className="form-check-label" htmlFor="cabModelIndica">
                        Indica
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[15]} id={"cab-filter-cabModelDzire"} keyName={"cabModelDzire"} defaultValue={cabModelDzire} />
                      <label className="form-check-label" htmlFor="cabModelDzire">
                        Dzire
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[16]} id={"cab-filter-cabModelEtios"} keyName={"cabModelEtios"} defaultValue={cabModelEtios} />
                      <label className="form-check-label" htmlFor="cabModelEtios">
                        Etios
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[17]} id={"cab-filter-cabModelXcent"} keyName={"cabModelXcent"} defaultValue={cabModelXcent} />
                      <label className="form-check-label" htmlFor="cabModelXcent">
                        Xcent
                      </label>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
            <div className={`text-center mt-3 ${panelClass}`} onClick={handlePanel}>
              <Button id={"cab-filter-cancel-btn"} handleBtnClick={handleCancelClick} btnType={"secondary"} classes={"btn-sm cab-cancel-btn"} label={"Cancel"} />
              <Button id={"cab-filter-search-btn"} loading={loading} handleBtnClick={handleSearchClick} btnType={"primary"} classes={"btn-sm"} label={"Search"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default CabsFilter;