import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Counter from '../components/Counter';
import Button from '../components/Button';
import { DatePicker } from 'rsuite';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';

const HolidayBooking = ({ id }) => {
  localStorage.setItem('current_route', '/holidayBooking');
  const { userId, displayName, displayEmail, displayPhone, displayAddress, creditCard, debitCard, upi } = useSelector(state => state.myAccount);
  const location = useLocation();
  const history = useHistory();
  const { state } = location;
  const [flightData, setFlightData] = useState(state?.data?.flightData || null);
  const [holidayData, setHolidayData] = useState(state?.data?.holidayData || null);
  const [loading, setLoading] = useState(false);
  let isProfileChecked = false;
  const passengers = [];
  let billingDetails = {};
  let creditCardData = { name: '', card: '', expiry: '', cvv: '' };
  let debitCardData = { name: '', card: '', expiry: '', cvv: '' };
  let internetBanking = '';
  let upiData = '';
  let paymentActive = 'internetBanking';
  let coupon = 100;
  let taxes = 20;

  console.log('$$$$$$@@@@@flightsDataflightsData', state);

  const dateStyles = {
    border: '1px solid #79747E',
    height: '47px',
    fontSize: '16px',
    lineHeight: '50px',
    borderRadius: '6px'
  };

  const displayFamily = () => {
    const adults = flightData.adults === 1 ? 'Adult' : 'Adults';
    const children = flightData.children === 1 ? 'Child' : 'Children';
    const infants = flightData.infants === 1 ? 'Infant' : 'Infants';
    return `${flightData.adults} ${adults} ${flightData.children} ${children} ${flightData.infants} ${infants}`;
  }

  const getCurrentDateTime = () => {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const now = new Date();
    return now.toLocaleString('en-GB', options).replace(',', '').toLowerCase();
  }

  const handlePassenger = (event, idx, type) => {
    passengers[idx] = { ...passengers[idx], [type]: event.target.value };
  }

  const handlePassengerDOB = (value, idx) => {
    if (value == null) {
      passengers[idx] = { ...passengers[idx], dob: '' };
    } else {
      if (value && value.getDate() && value.getMonth() && value.getFullYear()) {
        const date = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
        passengers[idx] = { ...passengers[idx], dob: date };
      }
    }
  }

  const handleIsProfile = (event) => {
    isProfileChecked = event.target.checked;
    billingDetails = {};
    $('#mobilePhoneProfile').val('');
    $('#emailProfile').val('');
    $('#billingAddessProfile').val('');
    $('#mobilePhoneProfile').prop('disabled', event.target.checked);
    $('#emailProfile').prop('disabled', event.target.checked);
    $('#billingAddessProfile').prop('disabled', event.target.checked);
  };

  const handleBilling = (event, key) => {
    billingDetails[key] = event.target.value;
  }

  const handleCreditCard = (event, key) => {
    creditCardData[key] = event.target.value;
  }

  const handleDebitCard = (event, key) => {
    debitCardData[key] = event.target.value;
  }

  const handleInternetBanking = (event) => {
    internetBanking = event.target.value;
  }

  const handleUPI = (event) => {
    upiData = event.target.value;
  }

  const handlePaymentLinkClick = (key) => {
    paymentActive = key;
  }

  const filterFamily = () => {
    if (flightData?.travelerPricings.length > 0) {
      let adultArr = flightData.travelerPricings.filter(o => o.travelerType === 'ADULT');
      let childArr = flightData.travelerPricings.filter(o => o.travelerType === 'CHILD');
      let infantArr = flightData.travelerPricings.filter(o => o.travelerType === 'HELD_INFANT');
      let adultArray = [];
      let childArray = [];
      let infantArray = [];
      if (adultArr.length > 0) {
        adultArray = adultArr[0];
      }
      if (childArr.length > 0) {
        childArray = childArr[0];
      }
      if (infantArr.length > 0) {
        infantArray = infantArr[0];
      }
      return [adultArray, childArray, infantArray];
    }
  }

  const family = filterFamily();

  const handleMakePaymentClick = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    const cvvRegex = /^\d{3,4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    const cardNumberRegex = /^\d{16}$/;
    console.log('passengerspassengers', upiRegex.test(upiData), upiData, paymentActive, isProfileChecked, passengers.length, creditCardData, billingDetails, passengers, displayName, displayEmail, displayPhone, displayAddress);


    if (passengers.length === 0) {
      toast.info('Please fill all passengers details', toastOptions);
      return;
    }

    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i] || !passengers[i].firstName || !passengers[i].lastName || !passengers[i].dob || !passengers[i].gender) {
        toast.info('Please fill all passengers details111', toastOptions);
        return;
      }
    }

    if (!isProfileChecked && (!billingDetails.mobileNumber || !billingDetails.email || !billingDetails.billingAddress)) {
      toast.info('Please fill all billing details', toastOptions);
      return;
    }

    if (paymentActive === 'credit' && (!creditCardData.name || !creditCardData.card || !creditCardData.expiry || !creditCardData.cvv)) {
      toast.info('Please fill all credit card details', toastOptions);
      return;
    } else if (paymentActive === 'debit' && (!debitCardData.name || !debitCardData.card || !debitCardData.expiry || !debitCardData.cvv)) {
      toast.info('Please fill all debit card details', toastOptions);
      return;
    } else if (paymentActive === 'internetBanking' && !internetBanking) {
      toast.info('Please select bank', toastOptions);
      return;
    } else if (paymentActive === 'upi' && !upiData) {
      toast.info('Please enter upi', toastOptions);
      return;
    }

    if (paymentActive === 'upi' && upiData && !upiRegex.test(upiData)) {
      toast.warning('Please enter a valid upi', toastOptions);
      return;
    }

    if ((paymentActive === 'debit') && debitCardData.cvv && !cvvRegex.test(debitCardData.cvv)) {
      toast.warning('Please enter a valid cvv', toastOptions);
      return;
    }

    if ((paymentActive === 'debit') && debitCardData.expiry && !expiryRegex.test(debitCardData.expiry)) {
      toast.warning('Please enter a valid expiry', toastOptions);
      return;
    }

    if ((paymentActive === 'debit') && debitCardData.card && !cardNumberRegex.test(debitCardData.card)) {
      toast.warning('Please enter a valid card number', toastOptions);
      return;
    }

    if ((paymentActive === 'credit') && creditCardData.cvv && !cvvRegex.test(creditCardData.cvv)) {
      toast.warning('Please enter a valid cvv', toastOptions);
      return;
    }

    if ((paymentActive === 'credit') && creditCardData.expiry && !expiryRegex.test(creditCardData.expiry)) {
      toast.warning('Please enter a valid expiry', toastOptions);
      return;
    }

    if ((paymentActive === 'credit') && creditCardData.card && !cardNumberRegex.test(creditCardData.card)) {
      toast.warning('Please enter a valid card number', toastOptions);
      return;
    }

    if (!isProfileChecked && billingDetails.mobileNumber && !phoneRegex.test(billingDetails.mobileNumber)) {
      toast.info('Please fill a valid phone number', toastOptions);
      return;
    }

    if (!isProfileChecked && billingDetails.email && !emailRegex.test(billingDetails.email)) {
      toast.info('Please fill a valid email', toastOptions);
      return;
    }

    if (loading) {
      return;
    }

    const createBillingDetails = () => {
      return {
        email: displayEmail,
        mobileNumber: displayPhone,
        billingAddress: displayAddress
      };
    }

    const createPaymentDetails = (type) => {
      if (type === 'credit') {
        return creditCardData;
      } else if (type === 'debit') {
        return debitCardData;
      } else if (type === 'internetBanking') {
        return internetBanking;
      } else if (type === 'upi') {
        return upiData;
      }
      return {
        email: displayEmail,
        mobileNumber: displayPhone,
        billingAddress: displayAddress
      };
    }

    const payload = {
      userId,
      holidayId: holidayData._id,
      packageName: holidayData.packageName,
      packageDuration: holidayData.packageDuration,
      holidayDetailsStartDate: holidayData.holidayDetailsStartDate,
      holidayDetailsEndDate: holidayData.holidayDetailsEndDate,
      departurePlaceLabel: holidayData.departurePlaceLabel,
      destinationPlaceLabel: holidayData.destinationPlaceLabel,
      passengers,
      billingDetails: isProfileChecked ? createBillingDetails() : billingDetails,
      paymentDetails: {
        type: paymentActive,
        data: createPaymentDetails(paymentActive)
      }
    }

    setLoading(true);
    let response = await handleAPIData('POST', '/api/holidayBooking', payload);
    let bookingResponse = response.data;
    if (bookingResponse.status === 'success' && (bookingResponse.invalidPackage || bookingResponse.userNotLoggedIn)) {
      toast.info(bookingResponse.message, toastOptions);
    } else if (response.status === 'success' && bookingResponse.data) {
      history.push({
        pathname: '/holidayConfirmed',
        state: { from: 'Holiday Make Payment click', data: bookingResponse.data }
      });
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  };

  const RenderPassengerField = ({ id, index }) => {
    return (
      <div id={id} key={id} className="passengers-booking row mb-3">
        <div className="col-3">
          <input type="text" className="form-control" id={`passengerFirstName${index}`} placeholder="First Name" onChange={(e) => handlePassenger(e, index, 'firstName')} />
        </div>
        <div className="col-3">
          <input type="text" className="form-control" id={`passengerLastName${index}`} placeholder="Last Name" onChange={(e) => handlePassenger(e, index, 'lastName')} />
        </div>
        <div className="col-3">
          <div className="input-group date">
            <DatePicker oneTap id={`holidayBookingDOB${index}`} size="lg" style={dateStyles} placeholder="Date of Birth" onChange={(e) => handlePassengerDOB(e, index)} format="dd-MM-yyyy" />
          </div>
        </div>
        <div className="col-3">
          <select id={`holidayBookingGender${index}`} onChange={(e) => handlePassenger(e, index, 'gender')} className="form-select">
            <option selected="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <div className="trip-summary">
              <h3 className="mb-2">{holidayData.packageName}</h3>
              <p className="hero-texted">{holidayData.packageDuration}</p>
              <p className="hero-texted"><span>Travel dates: </span>{holidayData.holidayDetailsStartDate} <span>To: </span>{holidayData.holidayDetailsEndDate}</p>
              <p className="hero-texted"><span>Source: </span>{holidayData.departurePlaceLabel}</p>
              <p className="hero-texted"><span>Destination: </span>{holidayData.destinationPlaceLabel}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl section-block mb-5">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="flight-details flight-details-big">
              <div className="row">
                <div className="col-12"><h3 className="mb-3">Passenger details</h3></div>
              </div>
              {
                Array(flightData.adults + flightData.children + flightData.infants).fill(0).map((item, index) => {
                  return (<RenderPassengerField id={`passenger-${index}`} index={index} />)
                })
              }
              <div className="row">
                <div className="col-12">
                  <h3 className="my-3">Billing details</h3>
                  <div className="form-check">
                    <input className="form-check-input" name="profileAddress" type="checkbox" id="profileAddress" onChange={handleIsProfile} />
                    <label className="form-check-label mt-1" htmlFor="sameAsProfileAddress">
                      Same as profile address
                    </label>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-4">
                  <input type="text" className="form-control" id="mobilePhoneProfile" placeholder="Mobile Number" onChange={(e) => handleBilling(e, 'mobileNumber')} />
                </div>
                <div className="col-4">
                  <input type="text" className="form-control" id="emailProfile" placeholder="Email" onChange={(e) => handleBilling(e, 'email')} />
                </div>
                <div className="col-4">
                  <input type="text" className="form-control" id="billingAddessProfile" placeholder="Billing Address" onChange={(e) => handleBilling(e, 'billingAddress')} />
                </div>
              </div>
            </div>
            <div className="flight-details flight-details-big pb-4">
              <div className="row">
                <div className="col-12"><h3 className="mb-3">Payment details</h3></div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="d-flex align-items-start">
                    <div className="nav flex-column me-3 tabs-cards" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      {
                        creditCard &&
                        <button className="nav-link active" id="v-credit-card-tab" data-bs-toggle="pill" data-bs-target="#v-credit-card" type="button" role="tab" aria-controls="v-credit-card" aria-selected="true" onClick={() => handlePaymentLinkClick('credit')}>Credit card</button>
                      }
                      {
                        debitCard &&
                        <button className="nav-link" id="v-debit-card-tab" data-bs-toggle="pill" data-bs-target="#v-debit-card" type="button" role="tab" aria-controls="v-debit-card" aria-selected="false" onClick={() => handlePaymentLinkClick('debit')}>Debit card</button>
                      }
                      <button className="nav-link" id="v-internet-banking-tab" data-bs-toggle="pill" data-bs-target="#v-internet-banking" type="button" role="tab" aria-controls="v-internet-banking" aria-selected="false" onClick={() => handlePaymentLinkClick('internetBanking')}>Internet banking</button>
                      {
                        upi &&
                        <button className="nav-link" id="v-upi-id-tab" data-bs-toggle="pill" data-bs-target="#v-upi-id" type="button" role="tab" aria-controls="v-upi-id" aria-selected="false" onClick={() => handlePaymentLinkClick('upi')}>UPI</button>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <div className="tab-content" id="v-pills-tabContent">
                    {
                      creditCard &&
                      <div className={`tab-pane fade ${paymentActive === 'creditCard' ? 'show active' : ''}`} id="v-credit-card" role="tabpanel" aria-labelledby="v-credit-card-tab" tabindex="0">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <input type="text" className="form-control" id="creditCardName" placeholder="Name On Card" onChange={(e) => handleCreditCard(e, 'name')} />
                          </div>
                          <div className="col-12 mb-3">
                            <input type="text" className="form-control" id="creditCardNumber" placeholder="Card Number" onChange={(e) => handleCreditCard(e, 'card')} />
                          </div>
                          <div className="col-4">
                            <input type="text" className="form-control" id="creditCardExpiry" placeholder="MM/YYYY" onChange={(e) => handleCreditCard(e, 'expiry')} />
                          </div>
                          <div className="col-4">
                            <input type="text" className="form-control" id="creditCardCVV" placeholder="CVV" onChange={(e) => handleCreditCard(e, 'cvv')} />
                          </div>
                        </div>
                      </div>
                    }
                    {
                      debitCard &&
                      <div className={`tab-pane fade ${paymentActive === 'debitCard' ? 'show active' : ''}`} id="v-debit-card" role="tabpanel" aria-labelledby="v-debit-card-tab" tabindex="0">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <input type="text" className="form-control" id="debitCardName" placeholder="Name On Card" onChange={(e) => handleDebitCard(e, 'name')} />
                          </div>
                          <div className="col-12 mb-3">
                            <input type="text" className="form-control" id="debitCardNumber" placeholder="Card Number" onChange={(e) => handleDebitCard(e, 'card')} />
                          </div>
                          <div className="col-4">
                            <input type="text" className="form-control" id="debitCardExpiry" placeholder="MM/YYYY" onChange={(e) => handleDebitCard(e, 'expiry')} />
                          </div>
                          <div className="col-4">
                            <input type="text" className="form-control" id="debitCardCVV" placeholder="CVV" onChange={(e) => handleDebitCard(e, 'cvv')} />
                          </div>
                        </div>
                      </div>
                    }
                    <div className="tab-pane fade" id="v-internet-banking" role="tabpanel" aria-labelledby="v-internet-banking-tab" tabindex="0">
                      <select className="form-select" aria-label="Large select example" onChange={handleInternetBanking}>
                        <option selected="">Select Bank</option>
                        <option value="hdfcBank">HDFC Bank</option>
                        <option value="iciciBank">ICICI Bank</option>
                        <option value="stateBankOfIndia">State Bank Of India</option>
                        <option value="axisBank">Axis Bank</option>
                      </select>
                    </div>
                    {
                      upi &&
                      <div className={`tab-pane fade ${paymentActive === 'upi' ? 'show active' : ''}`} id="v-upi-id" role="tabpanel" aria-labelledby="v-upi-id-tab" tabindex="0">
                        <input type="text" className="form-control" id="upi-id" placeholder="Enter UPI ID" onChange={handleUPI} />
                      </div>
                    }


                  </div>
                  <div className="mt-4">
                    <Button id={"holiday-booking-make-payment-btn"} loading={loading} handleBtnClick={handleMakePaymentClick} btnType={"primary"} classes={"float-end"} label={"Make Payment"} />
                    {/* <a href="#!" className="btn btn-primary">Make Payment</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="booking-block">
              <h3 className="booking-title">Booking details</h3>
              <div className="booking-details-block">
                <p className="booking-details">Trip type:  <span>{flightData.roundOneWay}</span></p>
                <p className="booking-details">Trip duration: <span>{flightData.duration}</span></p>
                <p className="booking-details">Booking on: <span>{getCurrentDateTime()}</span></p>
                <p className="booking-details">Number of passangers: <span>{displayFamily()}</span></p>
              </div>
            </div>
            <div className="booking-block">
              <h3 className="booking-title">Fare details</h3>
              <div className="booking-details-block">
                <p className="booking-sub-title">Basic cost:<span>${flightData.price.grandTotal}</span></p>
                {
                  family.map((passenger, passengerIndex) => (
                    <>
                      {
                        passenger.travelerType === 'ADULT' && flightData.adults &&
                        <p className="booking-details">{flightData.adults === 1 ? 'Adult' : 'Adults'} X {flightData.adults}: <span>${passenger.price.total * flightData.adults}</span></p>
                      }
                      {
                        passenger.travelerType === 'CHILD' && flightData.children &&
                        <p className="booking-details">{flightData.children === 1 ? 'Child' : 'Children'} X {flightData.children}: <span>${passenger.price.total * flightData.children}</span></p>
                      }
                      {
                        passenger.travelerType === 'HELD_INFANT' && flightData.infants &&
                        <p className="booking-details">{flightData.infants === 1 ? 'Infant' : 'Infants'} X {flightData.infants}: <span>${passenger.price.total * flightData.infants}</span></p>
                      }
                    </>
                  ))
                }
                <p className="booking-sub-title">Coupon applied <span>-${coupon}</span></p>
                <p className="coupon-type mb-2"><span className="coupon-name">(25% applied)</span> <a href="#!" className="">delete</a></p>
                <div className="my-3 row">
                  <div className="col-auto">
                    <input type="text" className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Apply coupon" />
                  </div>
                  <div className="col-auto">
                    <a href="#!" className="btn btn-primary btn-sm">Apply</a>
                  </div>
                </div>
                <p className="booking-details">Taxes (5%) <span>${taxes}</span></p>
              </div>
              <div className="booking-grand-total">
                <p>Grand total</p>
                <h2>${flightData.price.grandTotal - coupon + taxes} <span>(Inclusive of Taxes)</span></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default HolidayBooking;
