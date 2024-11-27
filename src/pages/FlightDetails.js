import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';

const FlightDetails = ({ id }) => {
  localStorage.setItem('current_route', '/flightDetails');
  const location = useLocation();
  const { state } = location;
  const [flightData, setFlightData] = useState(state?.data || null);
  const [loading, setLoading] = useState(true);

  console.log('$$$$$$@@@@@', flightData.duration, flightData);

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

  const filterPassengers = () => {
    if (flightData?.travelerPricings.length > 0) {
      let adultArr = flightData.travelerPricings.filter( o => o.travelerType === 'ADULT' );
      let childArr = flightData.travelerPricings.filter( o => o.travelerType === 'CHILD' );
      let infantArr = flightData.travelerPricings.filter( o => o.travelerType === 'HELD_INFANT' );
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
      return [ adultArray, childArray, infantArray ];
    }     
  }

  const passengers = filterPassengers();
  console.log('!!!!!!!!!!!!!!!!!', passengers)

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h1 className="mb-2">Booking</h1>
          </div>
        </div>
      </div>
      <div className="container-xxl section-block mb-5">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="flight-details flight-details-big flight-details-pad">
              {
                flightData.itineraries && flightData.itineraries.length > 0 && flightData.itineraries.map((itinery, itineryIndex) => (
                  <>
                    {
                      itinery.segments.map((segment, segmentIndex) => (
                        <section key={`segment_${itineryIndex}_${segmentIndex}`}>
                          {
                            segment.transitTime &&
                            <div className="transit-block">
                              <p>Transit time: {segment.transitTime} - {segment.haltAirport} ({segment.departure.iataCode})</p>
                              <p>At this stop, you need to: Prepare transit visa if required</p>
                            </div>
                          }
                          <div className="d-flex flex-row">
                            <div className="flight-logo">
                              <img src="./assets/images/Emirates_logo.svg" className="img-style" alt="" />
                            </div>
                            <div className="airport-details">
                              <span className="travel-line"></span>
                              <p>{segment.departureFormattedDate}</p>
                              <h3>{segment.departureAirport} ({segment.departure.iataCode})</h3>
                              <div className="flight-information">
                                <p className="small-text pb-1">Trip time : {segment.tripTime}</p>
                                <p className="small-text pb-3">Aircraft : {segment.aeroplane}</p>
                                <div className="row">
                                  <div className="col-6">
                                    <p className=" mb-2"><i className="bi bi-luggage me-2"></i> Baggage 1 x 23 kg</p>
                                    <p className=" mb-2"><i className="bi bi-tv me-2"></i> In-flight entertainment</p>
                                    <p><i className="bi bi-wifi me-2"></i> Free wifi internet</p>
                                  </div>
                                  <div className="col-6">
                                    <p className=" mb-2"><i className="bi bi-suitcase2 me-2"></i> Cabin baggage 1 x 7 kg</p>
                                    <p><i className="bi bi-1-circle me-2"></i> Priority Boarding</p>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-4">{segment.arrivalFormattedDate}</p>
                              <h3>{segment.arrivalAirport} ({segment.arrival.iataCode})</h3>
                            </div>
                          </div>
                        </section>
                      ))
                    }
                  </>
                ))
              }
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
                <p className="booking-sub-title">Base fare:  <span>${flightData.price.grandTotal}</span></p>
                {
                  passengers.map((passenger, passengerIndex) =>  (
                    <>
                      {
                        passenger.travelerType === 'ADULT' && flightData.adults &&
                        <p className="booking-details">{flightData.adults === 1 ? 'Adult' : 'Adults'} X {flightData.adults}: <span>${passenger.price.total}</span></p>
                      }
                      {
                        passenger.travelerType === 'CHILD' && flightData.children &&
                        <p className="booking-details">{flightData.children === 1 ? 'Child' : 'Children'} X {flightData.children}: <span>${passenger.price.total}</span></p>
                      }
                      {
                        passenger.travelerType === 'HELD_INFANT' && flightData.infants &&
                        <p className="booking-details">{flightData.infants === 1 ? 'Infant' : 'Infants'} X {flightData.infants}: <span>${passenger.price.total}</span></p>
                      }
                    </>
                  ))
                }
                <p className="booking-sub-title">Fee & Surcharges:  <span>$100</span></p>
                <p className="booking-details">Service charge: <span>$5</span></p>
                <p className="booking-details">Hospitality <span>$5</span></p>
                <p className="booking-details">Taxes <span>$20</span></p>
                <p className="booking-details">Airlines fuel surcharge <span>$70</span></p>
              </div>
            </div>
            <div className="d-grid gap-2">
              <a href="#!" className="btn btn-primary btn-block">Book now</a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
};

export default FlightDetails;
