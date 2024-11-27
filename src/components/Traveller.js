import React, { useRef, useState } from 'react';
import { updateFunc } from '../reducers/homeSlice';
import Counter from './Counter';
import Radio from './Radio';
import { useDispatch, useSelector } from 'react-redux';

const Traveller = ({ id, placeholder, defaultTravellers, defaultValue, keyName }) => {
  const dispatch = useDispatch();
  const childRefs = [useRef(), useRef(), useRef()];
  const { adults, children, infants, travelClass } = useSelector(state => state.home);
  const [ showTravellerMenu, setShowTravellerMenu ] = useState(false);

  const renderGender = () => {
    const genderData = [
      { id: 'adults', label: 'Adults :', ages: '>= 13', defaultValue: 1 },
      { id: 'children', label: 'Children :', ages: '3-12', defaultValue: 0 },
      { id: 'infants', label: 'Infants :', ages: '<= 2', defaultValue: 0 },
    ];

    return (
      <>
        {
          genderData && genderData.length > 0 && genderData.map((obj) => {
            return (
              <li>
                <div className="row">
                  <div className="col">
                    <h4 className="mb-0">{obj.label}</h4> <p className="small-text">{obj.ages}</p>
                  </div>
                  <div className="col">
                    <a className="dropdown-item" href="#">
                      <Counter id={`${id}-counter-${obj.id}`} counterByOther={true} defaultValue={obj.defaultValue} keyName={obj.id} />
                    </a>
                  </div>
                </div>
              </li>
            )
          })
        }
      </>
    )
  }

  const renderFlightClass = () => {
    const flightClassData = [
      { id: 'ECONOMY', value: 'ECONOMY^Economy', label: 'Economy' },
      { id: 'BUSINESS', value: 'BUSINESS^Business', label: 'Business' },
      { id: 'FIRST', value: 'FIRST^First Class', label: 'First Class' },
    ];

    return (
      <>
        {
          flightClassData && flightClassData.length > 0 && flightClassData.map((obj, index) => {
            return (
              <li className="mb-1">
                <div className="form-check">
                  <Radio ref={childRefs[index]} id={`${id}-${obj.id}`} name={`flight-class-${id}`} keyName={keyName} valueRadioName={obj.value} defaultValue={defaultValue} />
                  <label className="form-check-label mt-1" htmlFor={`${id}-${obj.id}-for`}>
                    {obj.label}
                  </label>
                </div>
              </li>
            )
          })
        }
      </>
    )
  }

  const handleTravallerClick = () => {
    setShowTravellerMenu(!showTravellerMenu);
  }

  return (
    <div className="traveler-major">


      <a className="form-selection" href="#" role="button" onClick={handleTravallerClick}>
        <label htmlFor="travelers" className="form-label">{placeholder}</label>
        <div className="header-form">{(adults + children + infants) || defaultTravellers} Traveler(s)</div>
        <div className="helper-text">{travelClass.split('^')[1]}</div>
      </a>

      <ul className={showTravellerMenu ? 'dropmenu-guest traveller-menu-show' : 'dropmenu-guest traveller-menu-hide'}>
      {/* <ul className='dropdown-menu dropmenu-guest'> */}
        {renderGender()}
        <li className="mb-2"><h5>Select Class</h5></li>
        {renderFlightClass()}
      </ul>
    </div>
  )
};

export default Traveller;
