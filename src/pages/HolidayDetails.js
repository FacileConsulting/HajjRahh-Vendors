import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Counter from '../components/Counter';
import Button from '../components/Button';
import { updateFunc, dateFunc, dateResetFunc } from '../reducers/homeSlice';
import { DatePicker } from 'rsuite';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';

// 022 68446530 



const HolidayDetails = ({ id }) => {
  localStorage.setItem('current_route', '/holidayDetails');
  const { departure, destination, roundOneWay, adults, children, infants, holidayDetailsStartDate, holidayDetailsEndDate } = useSelector(state => state.home);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = location;
  const [flightData, setFlightData] = useState({}); 
  const [flightsDatum, setFlightsDatum] = useState(state?.data?.flightsDatum || null);
  const [holidayData, setHolidayData] = useState(state?.data?.holidayData || null);
  const [loading, setLoading] = useState(false);

  console.log('$$$$$$@@@@@', flightsDatum, holidayData);

  const dateStyles = {
    border: '1px solid #79747E',
    height: '47px',
    fontSize: '16px',
    lineHeight: '50px',
    borderRadius: '6px'
  };
  
  const departureArray = [
    {
      value: 'BLR',
      label: 'Bengaluru'
    },
    {
      value: 'BOM',
      label: 'Mumbai'
    },
    {
      value: 'CCU',
      label: 'Kolkata'
    },
    {
      value: 'MAA',
      label: 'Chennai'
    },
    {
      value: 'DEL',
      label: 'Delhi'
    }
  ];
  
  const destinationArray = [
    {
      value: 'AUH',
      label: 'Abu Dhabi'
    },
    {
      value: 'DXB',
      label: 'Dubai'
    },
    {
      value: 'SYD',
      label: 'Sydney'
    },
    {
      value: 'LGA',
      label: 'New York'
    },
    {
      value: 'LON',
      label: 'London'
    }
  ];

  const handleBookNowClick = () => {
    const filteredFlightActive = flightsDatum.data.filter(o => o.holidayDetailActive === 'active');
    if (!holidayDetailsStartDate) {
      toast.info('Please select state date', toastOptions);
      return;
    }
    if (!holidayDetailsEndDate) {
      toast.info('Please select end date', toastOptions);
      return;
    }
    if (filteredFlightActive.length ===  1) {
      const obDep = departureArray.find( obj => obj.value === holidayData.departurePlace);
      const obDes = destinationArray.find( obj => obj.value === holidayData.destinationPlace);
      holidayData.departurePlaceLabel = obDep.label;
      holidayData.destinationPlaceLabel = obDes.label;
      holidayData.holidayDetailsStartDate = formatToTxtDateOther(holidayDetailsStartDate);
      holidayData.holidayDetailsEndDate = formatToTxtDateOther(holidayDetailsEndDate);
      flightData.adults = adults;
      flightData.children = children;
      flightData.infants = infants;
      console.log('WWWWWWWWWW', flightData, holidayData);
      history.push({
        pathname: '/holidayBooking',
        state: { from: 'Holiday Book Now', data: { flightData, holidayData } }
      });
    } else {
      toast.info('Please select atleast one flight', toastOptions);
    }
  }


  const handleFlightButtonClick = (event, index) => {
    event.stopPropagation();
    console.log('indexindexindexindexindex', index);
    for (let i = 0; i < flightsDatum.data.length; i++) {
      if (index === i) {
        flightsDatum.data[i].holidayDetailActive = 'active';
        assigningQuickViewData(flightsDatum.data[i]);
      } else {
        flightsDatum.data[i].holidayDetailActive = '';
      }
    }
    console.log('flightsDatumflightsDatumflightsDatumflightsDatum', flightsDatum);
    setFlightsDatum(flightsDatum);
  }
  
  const handleHolidayStartDate = (value) => {
    if (value == null) {
      dispatch(updateFunc({ keyName: 'holidayDetailsStartDate', value: '' }));
    } else {
      const date = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
      dispatch(updateFunc({ keyName: 'holidayDetailsStartDate', value: date }));
    }    
  }
  
  const handleHolidayEndDate = (value) => {
    if (value == null) {
      dispatch(updateFunc({ keyName: 'holidayDetailsEndDate', value: '' }));
    } else {
      const date = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
      dispatch(updateFunc({ keyName: 'holidayDetailsEndDate', value: date }));
    }    
  }

  const renderGender = () => {
    const genderData = [
      { id: 'adults', type: 'Adults :', ages: '>= 13', defaultValue: 1 },
      { id: 'children', type: 'Children :', ages: '3-12', defaultValue: 0 },
      { id: 'infants', type: 'Infants :', ages: '<= 2', defaultValue: 0 },
    ];

    return (
      <>
        {
          genderData && genderData.length > 0 && genderData.map((obj) => {
            return (
              <li>
                <div className="row">
                  <div className="col">
                    <h4 className="mb-0">{obj.type}</h4> <p className="small-text">{obj.ages}</p>
                  </div>
                  <div className="col">
                    <a className="dropdown-item" href="#">
                      <Counter id={`holiday-details-${obj.id}`} counterByOther={true} defaultValue={obj.defaultValue} keyName={obj.id} />
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

  const convertISODurationToReadable = (duration) => {
    let totalMinutes = 0;

    const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);

    if (matches) {
      const days = parseInt(matches[1]) || 0;
      const hours = parseInt(matches[2]) || 0;
      const minutes = parseInt(matches[3]) || 0;

      totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
    }
    return totalMinutes;
  }

  const formatFromToCodes = (arr) => {
    let newArray = [];
    for (let z = 0; z < arr.length; z++) {
      newArray.push([...new Set(arr[z])].join('-'));
    }
    return newArray;
  }

  const internalCovertToDHM = (mins) => {
    let totalMinutes = mins;
    const minutesInHour = 60;
    let minutesInDay = 24 * minutesInHour;

    const days = Math.floor(totalMinutes / minutesInDay);
    totalMinutes %= minutesInDay;

    const hours = Math.floor(totalMinutes / minutesInHour);
    const minutes = totalMinutes % minutesInHour;

    let displayed = '';

    if (days) {
      displayed = `${days} day${days !== 1 ? 's' : ''}`
    }
    if (hours) {
      displayed = `${displayed}  ${hours} hour${hours !== 1 ? 's' : ''}`
    }
    if (minutes) {
      displayed = `${displayed}  ${minutes} minute${minutes !== 1 ? 's' : ''}`
    }
    return displayed.trim();
  }

  const sumAndCovertToDHM = (arr) => {
    let totalMinutes = arr.reduce((accumulator, current) => accumulator + current, 0);
    return internalCovertToDHM(totalMinutes);
  }

  const formatTimeArray = (arr) => {
    const start = arr[0];
    const end = arr[arr.length - 1];
    const part1 = start.split('T')[1];
    const part2 = end.split('T')[1];
    const startTime = `${part1.split(':')[0]}:${part1.split(':')[1]}`;
    const endTime = `${part2.split(':')[0]}:${part2.split(':')[1]}`;
    return `${startTime} - ${endTime}`.trim();
  }

  const formatHalts = (arr) => {
    const returned = [];
    for (let z = 0; z < arr.length; z++) {
      const part0 = arr[z].split('^')[0];
      const part1 = new Date(arr[z].split('^')[1]);
      const part2 = new Date(arr[z].split('^')[2]);
      const differenceInMilliseconds = part1 - part2;
      const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
      const formatted = sumAndCovertToDHM([differenceInMinutes]);
      returned.push(`${formatted} | ${part0}`);
    }
    return returned;
  }
  
  const formatToTxtDateOther = (inputDate) => {
    // Split the input string by '-'
    const [day, month, year] = inputDate.split('-').map(Number);
    
    // Create a new Date object (month - 1 because months are 0-indexed)
    const date = new Date(year, month - 1, day);

    // Define options for formatting
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Replace the weekday with the correct short format
    const [weekday, monthName, dayNum, yearNum] = formattedDate.split(' ');
    
    // Return the final formatted date
    return `${weekday} ${monthName} ${dayNum} ${yearNum}`;
  }

  const formatToTxtDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    const date = new Date(dateString);

    // Format the date and time
    const datePart = date.toLocaleString('en-US', options);
    return datePart;
  }

  const getTripTime = (dateString1, dateString2) => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;

    // Convert milliseconds to minutes
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return differenceInMinutes;
  }

  const getAircraft = (code) => {
    if (flightsDatum?.dictionaries?.aircraft) {
      return flightsDatum?.dictionaries?.aircraft[code];
    }
  }

  const getPlaceName = (code) => {
    if (flightsDatum?.dictionaries?.locations) {
      return `${code}-${flightsDatum?.dictionaries?.locations[code].countryCode}`;
    }
  }

  const modifyFlightData = (datum) => {
    const dictionaries = flightsDatum.dictionaries.carriers;
    // 11.00 - 16.40
    const timeArray = [];
    // BLR-SSD-AUH
    const fromToCodes = [];
    // 2 days 4 hours
    const durationArray = [];
    // 2 days 4 hours | HYD
    let halts = [];
    for (let x = 0; x < datum.itineraries.length; x++) {
      durationArray.push(convertISODurationToReadable(datum.itineraries[x].duration));
      let fromToCodesTemp = [];
      for (let y = 0; y < datum.itineraries[x].segments.length; y++) {
        fromToCodesTemp.push(datum.itineraries[x].segments[y].departure.iataCode);
        timeArray.push(datum.itineraries[x].segments[y].departure.at);
        fromToCodesTemp.push(datum.itineraries[x].segments[y].arrival.iataCode);
        timeArray.push(datum.itineraries[x].segments[y].arrival.at);

        // Quick view
        const departureAt = datum.itineraries[x].segments[y].departure.at;
        const departureIataCode = datum.itineraries[x].segments[y].departure.iataCode;
        const arrivalAt = datum.itineraries[x].segments[y].arrival.at;
        const arrivalIataCode = datum.itineraries[x].segments[y].arrival.iataCode;
        const aeroplane = datum.itineraries[x].segments[y].aircraft.code;

        datum.itineraries[x].segments[y].departureFormattedDate = formatToTxtDate(departureAt);
        datum.itineraries[x].segments[y].departurePlace = getPlaceName(departureIataCode);

        datum.itineraries[x].segments[y].arrivalFormattedDate = formatToTxtDate(arrivalAt);
        datum.itineraries[x].segments[y].arrivalPlace = getPlaceName(arrivalIataCode);

        datum.itineraries[x].segments[y].tripTime = internalCovertToDHM(getTripTime(departureAt, arrivalAt));
        datum.itineraries[x].segments[y].aeroplane = getAircraft(aeroplane);

        if (y > 0) {
          const departureCode = datum.itineraries[x].segments[y].departure.iataCode;
          const arrivalAt = datum.itineraries[x].segments[y - 1].arrival.at;
          const departureAt = datum.itineraries[x].segments[y].departure.at;
          halts.push(`${departureCode}^${departureAt}^${arrivalAt}`);

          // Quick View
          const arrivalIataCode = datum.itineraries[x].segments[y - 1].arrival.iataCode;

          datum.itineraries[x].segments[y].transitTime = internalCovertToDHM(getTripTime(arrivalAt, departureAt));
          datum.itineraries[x].segments[y].haltPlace = getPlaceName(arrivalIataCode);
        }
      }
      fromToCodes.push(fromToCodesTemp);
    }
    return {
      ...datum,
      roundOneWay: 'One Way',
      // roundOneWay: heading.roundOneWay === 'roundTrip' ? 'Round Trip' : 'One Way',
      halts: formatHalts(halts),
      time: formatTimeArray(timeArray),
      duration: sumAndCovertToDHM(durationArray),
      fromToCodes: formatFromToCodes(fromToCodes),
      validatingAirlineCodes: datum.validatingAirlineCodes.map(item => `${item}^${dictionaries[item]}`)
    }
  }

  const assigningQuickViewData = async (flightData) => {
    // flightData.roundOneWay = 'roundTrip';
    setLoading(true);
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
    setFlightData(flightData);
    setLoading(false);
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

  const FlightButton = ({ idx, id, flData }) => {
    return (
      <a href="#!" id={id} key={id} className={`cust-flight cust-flight-link ${flData.holidayDetailActive}`} onClick={event => handleFlightButtonClick(event, idx)}>
        <div className="d-flex flex-row">
          <div className="flight-logo">
            <img src="./assets/images/Emirates_logo.svg" className="img-style" alt="" />
          </div>
          <div className="ps-3">
            <h4>{flData.time}</h4>
            <p>{flData?.validatingAirlineCodes[0].split('^')[1]}</p>
            {
              flData?.fromToCodes && flData.fromToCodes.length > 0 && flData.fromToCodes.map((item) => {
                return (
                  <p>{item} {flData.halts.length > 0 && `(${flData.halts.length > 1 ? `${flData.halts.length} stops` : `${flData.halts.length} stop`})`}</p>
                )
              })
            }
          </div>
        </div>
      </a>
    )
  } 

  const RenderItinerary = ({ id, itinerary }) => {
    return (
      <dl id={id} key={id} className="row mb-4">
        <dt className="col-sm-3">
          <h4>Day {itinerary.dayNumber}: {itinerary.title}</h4>
        </dt>
        <dd className="col-sm-9">
          <div className="itinerary-detail">
            <div className="itinerary-details-line"></div>
            {
              Array.isArray(itinerary.description) && itinerary.description.length > 0 && itinerary.description.map((desp, index) => {
                return (
                  <>
                    <h4 className="mt-2">{desp.dayer}</h4>
                    <p>{desp.description}</p>
                  </>
                )
              })
            }
          </div>
        </dd>
      </dl>
    )
  }

  const RenderOverviewBrief = ({ id, brief }) => {
    return (
      <div id={id} key={id} className="mb-3">
        <span className="overview-icon"><i className={`bi bi-${brief.icon}`}></i></span>
        <div className="overview-details align-top">
          <h4>{brief.name}</h4>
          <p>{brief.brief}</p>
        </div>
      </div>
    )
  } 

  const RenderInclusionExclusion = ({ id, inclusionExclusion }) => {
    return (
      <p id={id} key={id}><i className="bi bi-check"></i>{inclusionExclusion}</p>
    )
  } 

  const RenderTermsAndConditions = ({ id, termsAndConditions }) => {
    return (
      <p id={id} key={id}>{termsAndConditions}</p>
    )
  }

  // console.log('$$$$$$@@@@@', flightData.duration, flightData);

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h3 className="mb-2">{holidayData.packageName}</h3>
            <p className="hero-text">{holidayData.packageDuration}</p>
          </div>
        </div>
      </div>
      <div className="container-xxl">
        <nav className="nav overview-tabs">
          <a className="nav-link active" aria-current="page" href="#flight-details">Flights</a>
          <a className="nav-link" href="#carouselExampleIndicators">Images</a>
          <a className="nav-link" href="#trip-overview-block">Overview</a>
          <a className="nav-link" href="#itinerary-block">itinerary</a>
          <a className="nav-link" href="#inc-exc">Inclusion / Exclution</a>
          <a className="nav-link" href="#t&c">Terms & Conditions</a>
        </nav>
      </div>
      <div className="container-xxl section-block mb-5">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="row" id="flight-details">
              <div className="col-12">
                {
                  Array.isArray(flightsDatum.data) && flightsDatum.data.length > 0 &&
                  (
                    <>
                      {
                        Array.isArray(flightsDatum.data) && flightsDatum.data.length > 0 && flightsDatum.data.map((flight, index) => {
                          return (<FlightButton idx={index} id={`fll-${index}`} flData={modifyFlightData(flight, index)} />)
                        })
                      }
                    </>
                  )
                }
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="flight-details flight-details-big">
                  {
                    loading ?
                      <div className="d-flex justify-content-center padding-top-btm">
                        <span className="spinner-border spinner-border-lg" role="status"></span>
                      </div> :
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
                      </>
                  }
                </div>
              </div>
            </div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="./assets/images/slider/slider-1.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/slider/slider-2.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/slider/slider-3.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/slider/slider-4.png" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="./assets/images/slider/slider-5.png" className="d-block w-100" alt="..." />
                </div>
              </div>
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                  className="active thumbnail" aria-current="true" aria-label="Slide 1">
                  <img src="./assets/images/slider/slider-1.png" className="d-block w-100" alt="..." />
                </button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="thumbnail"
                  aria-label="Slide 2">
                  <img src="./assets/images/slider/slider-2.png" className="d-block w-100" alt="..." />
                </button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className="thumbnail"
                  aria-label="Slide 3">
                  <img src="./assets/images/slider/slider-3.png" className="d-block w-100" alt="..." />
                </button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" className="thumbnail"
                  aria-label="Slide 4">
                  <img src="./assets/images/slider/slider-4.png" className="d-block w-100" alt="..." />
                </button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" className="thumbnail"
                  aria-label="Slide 5">
                  <img src="./assets/images/slider/slider-5.png" className="d-block w-100" alt="..." />
                </button>
              </div>
            </div>
            <h3 id="trip-overview-block">Overview</h3>
            <p>{holidayData.packageDetails.overview}</p>
            <div className="trip-overview">
              <div className="row">
                <div className="col-6">
                  {
                    Array.isArray(holidayData.packageDetails.overviewOneBrief) && holidayData.packageDetails.overviewOneBrief.length > 0 && holidayData.packageDetails.overviewOneBrief.map((brief, index) => {
                      return (<RenderOverviewBrief id={`briefOne-${index}`} brief={brief} />)
                    })
                  }
                </div>
                <div className="col-6">
                  {
                    Array.isArray(holidayData.packageDetails.overviewTwoBrief) && holidayData.packageDetails.overviewTwoBrief.length > 0 && holidayData.packageDetails.overviewTwoBrief.map((brief, index) => {
                      return (<RenderOverviewBrief id={`briefTwo-${index}`} brief={brief} />)
                    })
                  }
                </div>
              </div>
            </div>
            <div className="h-line"></div>
            <h3 id="itinerary-block">Itinerary</h3>
            <div className="day-itinerary">
              {
                Array.isArray(holidayData.packageDetails.dayWiseItinerary) && holidayData.packageDetails.dayWiseItinerary.length > 0 && holidayData.packageDetails.dayWiseItinerary.map((itinerary, index) => {
                  return (<RenderItinerary id={`itinerary-${index}`} itinerary={itinerary} />)
                })
              }
            </div>
            <div className="h-line"></div>
            <div className="row" id="inc-exc">
              <div className="col-6">
                <h3>Inclusion</h3>
                {
                  Array.isArray(holidayData.packageDetails.inclusions) && holidayData.packageDetails.inclusions.length > 0 && holidayData.packageDetails.inclusions.map((inclusion, index) => {
                    return (<RenderInclusionExclusion id={`inclusion-${index}`} inclusionExclusion={inclusion} />)
                  })
                }
              </div>
              <div className="col-6">
                <h3>Exclution</h3>
                {
                  Array.isArray(holidayData.packageDetails.exclusions) && holidayData.packageDetails.exclusions.length > 0 && holidayData.packageDetails.exclusions.map((exclusion, index) => {
                    return (<RenderInclusionExclusion id={`exclusion-${index}`} inclusionExclusion={exclusion} />)
                  })
                }
              </div>
            </div>
            <div className="h-line"></div>
            <div className="row" id="t&c">
              <div className="col-12">
                <h3>Terms & Conditions</h3>
                {
                  Array.isArray(holidayData.packageDetails.termsAndConditions) && holidayData.packageDetails.termsAndConditions.length > 0 && holidayData.packageDetails.termsAndConditions.map((termsAndConditions, index) => {
                    return (<RenderTermsAndConditions id={`termsAndConditions-${index}`} termsAndConditions={termsAndConditions} />)
                  })
                }
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="booking-block mt-0">
              <h3 className="booking-title">Booking details</h3>
              <div className="booking-details-block booking-dates">
                <div className="input-group mb-3">
                  <DatePicker oneTap id="holiday-details-start-date-datepicker" size="lg" style={dateStyles} placeholder="Start Date" onChange={handleHolidayStartDate} format="dd-MM-yyyy" />
                  
                </div>
                <div className="input-group">
                  <DatePicker oneTap id="holiday-details-end-date-datepicker" size="lg" style={dateStyles} placeholder="End Date" onChange={handleHolidayEndDate} format="dd-MM-yyyy" />
                </div>
                <div className="dropdown">
                  <a className="guests-dropdown dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    id="dropdownMenuClickableInside" data-bs-auto-close="outside" aria-expanded="false">
                    Guests
                  </a>
                  <ul className="dropdown-menu dropmenu-guest" aria-labelledby="dropdownMenuClickableInside">
                    {renderGender()}
                  </ul>
                </div>
                <div className="d-grid gap-2 mt-3">                                    
                  <Button id={"holiday-details-book-now-btn"} handleBtnClick={handleBookNowClick} btnType={"primary"} classes={"btn-block"} label={"Book Now"} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
};

export default HolidayDetails;
