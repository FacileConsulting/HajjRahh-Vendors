import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAPIData } from '../hooks/useCustomApi';

const FlightContainer = ({ id, flightData, flightCardCallback }) => {
  const { roundOneWay, adults, children, infants } = useSelector(state => state.home);
  const [detailViewLoading, setDetailViewLoading] = useState(false);
  const [quickViewLoading, setQuickViewLoading] = useState(false);

  const assigningQuickViewData = async () => {
    flightData.adults = adults;
    flightData.children = children;
    flightData.infants = infants; 
    flightData.roundOneWay = roundOneWay === 'roundTrip' ? 'Round Trip' : 'One Way';
    for (let x = 0; x < flightData.itineraries.length; x++) {
      for (let y = 0; y < flightData.itineraries[x].segments.length; y++) {
        const departurePlace = flightData.itineraries[x].segments[y].departurePlace;
        const arrivalPlace = flightData.itineraries[x].segments[y].arrivalPlace;
        const haltPlace = flightData.itineraries[x].segments[y].haltPlace;
        if (departurePlace) {
          await delay(500);
          flightData.itineraries[x].segments[y].departureAirport = await apiAirportPlace(departurePlace);
        }
        if (arrivalPlace) {
          await delay(500);
          flightData.itineraries[x].segments[y].arrivalAirport = await apiAirportPlace(arrivalPlace);
        }
        if (haltPlace) {
          flightData.itineraries[x].segments[y].haltAirport = flightData.itineraries[x].segments[y - 1].arrivalAirport;
        }
      }
    }
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const apiAirportPlace = async (codes) => {
    let response = await handleAPIData('POST', '/api/searchAirport', { codes });
    if (response?.status === 'success' && response?.data?.data) {
      return response?.data?.data;
    } else {
      return '';
    }
  }

  const handleFlightCardClick = async (event) => {
    event.stopPropagation();
    if (flightData.isQuickDetailViewClicked) {
      flightCardCallback(flightData);
    } else {
      setDetailViewLoading(true);
      await assigningQuickViewData();
      flightData.isQuickDetailViewClicked = true;
      setDetailViewLoading(false);
      flightCardCallback(flightData);
    }
  }

  const handleQuickViewClick = async (event) => {
    event.stopPropagation();
    if (flightData.isQuickDetailViewClicked) {
      return;
    }
    setQuickViewLoading(true);
    await assigningQuickViewData();
    flightData.isQuickDetailViewClicked = true;
    setQuickViewLoading(false);
  }

  return (
    <div id={id} key={id} className="accordion-item flight-block" onClick={handleFlightCardClick}>
      {
        detailViewLoading &&
        <div className="d-flex justify-content-center padding-top-btm for-abs">
          <span className="spinner-border spinner-border-lg" role="status"></span>
        </div>
      }
      <h2 className={`accordion-header ${detailViewLoading && 'flight-opacity'}`}>
        <div className="row">
          <>
            <div className="col-md-8 col-sm-12">
              <div className="row">
                <div className="col-md-2 col-sm-12 flight-logo">
                  <img src="./assets/images/Emirates_logo.svg" className="img-style" alt="" />
                </div>
                <div className="col-md-3 col-sm-12">
                  <h3>{flightData?.time}</h3>
                  <p>{flightData?.validatingAirlineCodes[0].split('^')[1]}</p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <h3>{flightData?.duration}</h3>
                  {
                    flightData?.fromToCodes && flightData.fromToCodes.length > 0 && flightData.fromToCodes.map((item) => {
                      return (
                        <p>{item}</p>
                      )
                    })
                  }
                </div>
                <div className="col-md-3 col-sm-12">
                  <h3>{flightData?.halts.length} {flightData.halts.length > 1 ? 'stops' : 'stop'}</h3>
                  {
                    flightData?.halts && flightData.halts.length > 0 && flightData.halts.map((item) => {
                      return (
                        <p>{item}</p>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 text-end">
              <div className="d-flex justify-content-end">
                <div>
                  <h2 className="mb-2">${flightData?.price?.grandTotal}</h2>
                  <p>{flightData?.roundOneWay}</p>
                </div>
                <div className="ps-5 text-center">
                  <a href="#!" className="btn btn-primary btn-sm mb-2" onClick={handleFlightCardClick}>Book now</a>
                  <a href="#!" className="flight-details-link collapsed" data-bs-toggle="collapse" data-bs-target={`#flight-accordion-${id}`} aria-expanded="false" aria-controls={`flight-accordion-${id}`} onClick={handleQuickViewClick}>Quick view</a>
                </div>
              </div>
            </div>
          </>
        </div>
      </h2>

      <div id={`flight-accordion-${id}`} className="accordion-collapse collapse" data-bs-parent="#flight-contain">
        <div className="accordion-body flight-details">
          {
            quickViewLoading ?
              <div className="d-flex justify-content-center padding-top-btm">
                <span className="spinner-border spinner-border-lg" role="status"></span>
              </div>
              :
              <>
                {
                  flightData.itineraries && flightData.itineraries.length > 0 && flightData.itineraries.map((itinery, itineryIndex) => (
                    <>
                      {
                        itinery.segments.map((segment, segmentIndex) => (
                          <section key={`segment_${itineryIndex}_${segmentIndex}`}>
                            {
                              segment.transitTime &&
                              <div className="transit-block">
                                Transit time: {segment.transitTime} - {segment.haltAirport} ({segment.departure.iataCode})
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
                                <p className="mt-4">{segment.arrivalFormattedDate}</p>
                                <h3>{segment.arrivalAirport} ({segment.arrival.iataCode})</h3>
                              </div>
                              <div className="ps-5">
                                <p className="small-text">Trip time : {segment.tripTime}</p>
                                <p className="small-text">Aircraft : {segment.aeroplane}</p>
                              </div>
                            </div>
                          </section>
                        ))
                      }
                    </>
                  ))
                }
              </>
          }
        </div>
      </div>
    </div>
  )
};

export default FlightContainer;
