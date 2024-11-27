import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import FlightsFilter from '../components/FlightsFilter';
import FlightsSearch from '../components/FlightsSearch';
import FlightContainer from '../components/FlightContainer';
import NoDataAvailable from '../components/NoDataAvailable';
import Select from '../components/Select';

const CabDetails = ({ id }) => {
  localStorage.setItem('current_route', '/cabDetails');
  const location = useLocation();
  const history = useHistory();
  const { state } = location;
  const [cabDatum, setCabDatum] = useState(state?.data || null);

  const capitalizeWords = str => str.replace(/\b\w/g, char => char.toUpperCase());

  const getCurrentDateTime = () => {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const now = new Date();
    return now.toLocaleString('en-GB', options).replace(',', '').toLowerCase();
  }

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h3 className="mb-2">{capitalizeWords(cabDatum.cabPickUpPlace)} - {capitalizeWords(cabDatum.cabDropPlace)}</h3>
            <p className="hero-text">One-way Trip - {getCurrentDateTime()}</p>
          </div>
        </div>
      </div>
      <div className="container-xxl section-block mb-5">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="cabs-block mt-4">
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <div className="d-flex flex-row">
                    <div className="cab-image">
                      <img src={`./assets/images/${cabDatum.cabImage}.png`} className="img-fluid" alt="" />
                    </div>
                    <div className="ps-3">
                      <h3>{cabDatum.cabName}</h3>
                      <p>One-way Trip &nbsp;&nbsp; · &nbsp;&nbsp; 152 kms &nbsp;&nbsp; · &nbsp;&nbsp; 2 Adults</p>

                    </div>
                  </div>
                </div>
              </div>
              <div className="cabs-separator"></div>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled cab-conditions">
                    {
                      Array.isArray(cabDatum.cabFeatures) && cabDatum.cabFeatures.length > 0 && cabDatum.cabFeatures.map((feature, index) => {
                        return (
                          <li><i className="bi bi-check-circle"></i> {feature}</li>
                        )
                      })
                    }

                  </ul>
                </div>
                <div className="col-md-6">
                {
            Array.isArray(cabDatum.cabTermsAndCondition) && cabDatum.cabTermsAndCondition.length > 0 && cabDatum.cabTermsAndCondition.map((tnc, index) => {
              return (
                <p>{tnc}</p>
              )
            })
          }
                </div>
              </div>
            </div>
            <div className="flight-details flight-details-big">
              <div className="row">
                <div className="col-12">
                  <h3 className="mb-3">Passenger details</h3>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="pickup" className="mb-1">Pickup Address</label>
                  <input type="text" className="form-control" id="pickup" placeholder={capitalizeWords(cabDatum.cabPickUpPlace)} />
                </div>
                <div className="col-6">
                  <label htmlFor="drop" className="mb-1">Drop Address</label>
                  <input type="text" className="form-control" id="drop" placeholder={capitalizeWords(cabDatum.cabDropPlace)} />
                </div>
              </div>
              <div className="row mb-3 mt-4">
                <div className="col-12">
                  <h4>Traveller information</h4>
                </div>
                <div className="col-3">
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Full name" />
                </div>
                <div className="col-3">
                  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Mobile number" />
                </div>
                <div className="col-3">
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email address" />
                </div>
                <div className="col-3">
                  <select className="form-select" aria-label="Large select example">
                    <option selected="">Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h3 className="mt-4">Driver and Cab details</h3>
              </div>
              <div className="col-12 mb-4">
                <p><i className="bi bi-check"></i> Cab and driver details will be shared on your registered phone. (22 Jan 2021
                  at 6:55 pm).</p>
                <p><i className="bi bi-check"></i> Due to traffic or any other unavoidable reason, the pickup may be delayed for
                  30 minutes.</p>
                <p><i className="bi bi-check"></i> For nighttime driving (between 11:00 pm to 7:00 am) on any of the nights,
                  there will be a night driver charge of $100.</p>
              </div>
              <div className="col-6">
                <h3>Included in your price</h3>
                <p><i className="bi bi-check"></i>Toll charge</p>
                <p><i className="bi bi-check"></i>Driver Allowance</p>
                <p><i className="bi bi-check"></i>Only one pickup and drop</p>
              </div>
              <div className="col-6">
                <h3>Extra charge</h3>
                <p><i className="bi bi-check"></i>Waiting time</p>
                <p><i className="bi bi-check"></i>Airport entry charges</p>
                <p><i className="bi bi-check"></i>Parking fee</p>
              </div>
              <div className="col-12">
                <h3 className="mt-4">Safety Guidelines</h3>
              </div>
              <div className="col-12 mb-4">
                <p><i className="bi bi-arrow-right"></i> All passengers coming to the state by road must show a COVID negative
                  report (RT-PCR) not more than 72 hours old or a valid vaccination certificate. (Travel period should
                  commence after 14 days from the 2nd dose)</p>
                <p><i className="bi bi-arrow-right"></i> Dependent on so extremely delivered by. Yet no jokes worse her why. Bed
                  one supposing breakfast day fulfilled off depending questions.</p>
                <p><i className="bi bi-arrow-right"></i> Whatever boy her exertion his extended. Ecstatic followed handsome
                  drawings entirely Mrs one yet outweigh.</p>
                <p><i className="bi bi-arrow-right"></i> Meant balls it if up doubt small purse. Required his you put the
                  outlived answered position. A pleasure exertion if believed provided to.</p>
                <p><i className="bi bi-arrow-right"></i> All led out world this music while asked. Paid mind even sons does he
                  door no. Attended overcame repeated it is perceived Marianne in.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="booking-block">
              <h3 className="booking-title">Fare details</h3>
              <div className="booking-details-block">
                <p className="booking-sub-title">Base Price <span>${cabDatum.cabPrice}</span></p>
                <p className="booking-details">Extra waiting time <span>$5</span></p>
                <p className="booking-details">Convenience Fee <span>$3</span></p>
                <p className="booking-sub-title">Coupon applied <span>-$8</span></p>
                <p className="coupon-type mb-2"><span className="coupon-name">(FLAT $8 off)</span> <a href="#!" className="">delete</a>
                </p>
                <div className="my-3 row">
                  <div className="col-auto">
                    <input type="text" className="form-control form-control-sm" id="exampleFormControlInput1"
                      placeholder="Apply coupon" />
                  </div>
                  <div className="col-auto">
                    <a href="#!" className="btn btn-primary btn-sm">Apply</a>
                  </div>
                </div>
                <p className="booking-details">Taxes (5%) <span>$2</span></p>
              </div>
              <div className="booking-grand-total">
                <p>Grand total</p>
                <h2>${cabDatum.cabPrice + 2} <span>(Inclusive of Taxes)</span></h2>
              </div>
            </div>
            <div className="d-grid gap-2">
              <a href="#!" className="btn btn-primary btn-block">Pay now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default CabDetails;
