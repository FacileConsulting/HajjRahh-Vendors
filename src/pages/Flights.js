import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import FlightsFilter from '../components/FlightsFilter';
import FlightsSearch from '../components/FlightsSearch';
import FlightContainer from '../components/FlightContainer';
import NoDataAvailable from '../components/NoDataAvailable';
import Select from '../components/Select';
import DefaultBody from '../components/DefaultBody';

const Flights = ({ id }) => {
  localStorage.setItem('current_route', '/flights');
  const history = useHistory();

  const sortOptions = [
    {
      value: '',
      label: 'Select'
    },
    {
      value: 'byduration',
      label: 'By Duration'
    },
    {
      value: 'byprice',
      label: 'By Price'
    },
    // {
    //   value: 'bycost',
    //   label: 'By cost'
    // }
  ]

  const { roundOneWay, adults, children, infants, travelClass, flyingFrom, flyingTo, flightDepartureDate, flightReturnDate, flightSort } = useSelector(state => state.home);
  const { displayEmail, emirates, lufthansa, qatarAiraways, etihadAiraways, egyptair, twoFourHour, fourSixHour, zeroStop, oneStop, aboveOneStop, egg, nonVeg, morning, afternoon, evening, night } = useSelector(state => state.myAccount);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [toCallback, setToCallback] = useState(false);
  const [panelClass, setPanelClass] = useState('filter-list');
  const [flightsData, setFlightsData] = useState({ data: [], dictionaries: {}, meta: {} });
  const [heading, setHeading] = useState({
    flyingFrom: '',
    flyingTo: '',
    guests: 0,
    roundOneWay: '',
    travelClass: ''
  });

  useEffect(() => {
    console.log("flightSort updated: ", flightSort);
    if (flightsData.data && flightsData.data.length > 0) {
      const { data, dictionaries, meta } = flightsData;
      flightSortBy(flightSort, data, dictionaries, meta);
    }
  }, [flightSort]);

  const flightCardCallback = (data) => {
    history.push({
      pathname: '/flightDetails',
      state: { from: 'Flight Card click', data: data }
    });
  }

  const handlePanelCallbackParent = () => {
    setPanelClass(panelClass === 'filter-list' ? 'filter-show' : 'filter-list');
  }

  const convertDate = (dateStr) => {
    if (!dateStr) {
      return ''
    }
    const [day, month, year] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  const preparePayload = () => {
    return {
      flyingFrom: flyingFrom.split('^')[0],
      flyingTo: flyingTo.split('^')[0],
      flightDepartureDate: convertDate(flightDepartureDate),
      flightReturnDate: convertDate(flightReturnDate),
      adults,
      children,
      infants,
      flightType: false,
      travelClass: travelClass.split('^')[0]
    }
  }

  const handleFlightSearchFilter = async (type) => {
    let payload = {};
    setPanelClass('filter-list');
    if (searchLoading || filterLoading) {
      return;
    }

    if (type === 'filter') {
      if (!emirates && !lufthansa && !qatarAiraways && !etihadAiraways && !egyptair && !twoFourHour && !fourSixHour && !zeroStop && !oneStop && !aboveOneStop && !egg && !nonVeg && !morning && !afternoon && !evening && !night) {
        toast.info('Please select atleast one filter', toastOptions);
        return;
      }
      if (flightsData == null || flightsData?.data.length === 0) {
        setToCallback(!toCallback);
        toast.info('Please select atleast one search field', toastOptions);
        return;
      }
      payload = {
        ...preparePayload(),
        emirates, lufthansa, qatarAiraways, etihadAiraways, egyptair, twoFourHour, fourSixHour, zeroStop, oneStop, aboveOneStop, egg, nonVeg, morning, afternoon, evening, night
      }
      setFilterLoading(true);
    }


    if (type === 'search') {
      setToCallback(!toCallback);
      if (!flyingFrom && !flyingTo && !flightDepartureDate && !flightReturnDate) {
        toast.info('Please select atleast one field', toastOptions);
        return;
      } else if (!flyingFrom) {
        toast.info('Please select Flying From field', toastOptions);
        return;
      } else if (!flyingTo) {
        toast.info('Please select Flying To field', toastOptions);
        return;
      } else if (!flightDepartureDate) {
        toast.info('Please select Departure Date', toastOptions);
        return;
      }
      payload = {
        ...preparePayload()
      }
      setSearchLoading(true);
    }

    let response = await handleAPIData('POST', '/api/searchFlights', payload);
    console.log('tripsreresponseresponseresponsesponse', response);
    if (response?.status === 'success' && response?.data?.data?.data.length > 0) {
      const { data, dictionaries, meta } = response?.data?.data;
      if (flightSort) {
        flightSortBy(flightSort, data, dictionaries, meta);
      } else {
        setFlightsData({ data, dictionaries, meta });
        setHeading({
          flyingFrom: `${flyingFrom.split('^')[1]} (${flyingFrom.split('^')[0]})`,
          flyingTo: `${flyingTo.split('^')[1]} (${flyingTo.split('^')[0]})`,
          guests: adults + children + infants,
          roundOneWay,
          travelClass: travelClass.split('^')[1]
        });
      }


    } else {
      setFlightsData({ data: [], dictionaries: {}, meta: {} });
      setHeading({
        flyingFrom: '',
        flyingTo: '',
        guests: 0,
        roundOneWay: '',
        travelClass: ''
      });
      toast.error('Something went wrong. Please try again.', toastOptions);
    }

    if (type === 'search') {
      setSearchLoading(false);
    } else if (type === 'filter') {
      setFilterLoading(false);
    }
  }

  const flightSortBy = (type, flightsData, dictionaries, meta) => {
    if (type === 'byprice') {
      let sortedFlightsData = flightsData.sort((a, b) => a.price.grandTotal - b.price.grandTotal);
      console.log('dsf', sortedFlightsData);
      setFlightsData({ data: [...sortedFlightsData], dictionaries, meta });
    } else if (type === 'byduration') {
      for (let y = 0; y < flightsData.length; y++) {
        let durationArray = [];
        for (let x = 0; x < flightsData[y].itineraries.length; x++) {
          durationArray.push(convertISODurationToReadable(flightsData[y].itineraries[x].duration));
        }
        flightsData[y].totalDurationInMin = durationArray.reduce((accumulator, current) => accumulator + current, 0);
      }
      let sortedFlightsData = flightsData.sort((a, b) => a.totalDurationInMin - b.totalDurationInMin);
      setFlightsData({ data: [...sortedFlightsData], dictionaries, meta });
    }
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
    if (flightsData?.dictionaries?.aircraft) {
      return flightsData?.dictionaries?.aircraft[code];
    }
  }

  const getPlaceName = (code) => {
    if (flightsData?.dictionaries?.locations) {
      return `${code}-${flightsData?.dictionaries?.locations[code].countryCode}`;
    }
  }

  const modifyFlightData = (datum) => {
    const dictionaries = flightsData.dictionaries.carriers;
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
      roundOneWay: heading.roundOneWay === 'roundTrip' ? 'Round Trip' : 'One Way',
      halts: formatHalts(halts),
      time: formatTimeArray(timeArray),
      duration: sumAndCovertToDHM(durationArray),
      fromToCodes: formatFromToCodes(fromToCodes),
      validatingAirlineCodes: datum.validatingAirlineCodes.map(item => `${item}^${dictionaries[item]}`)
    }
  }

  const renderHeading = () => {
    return (
      <div className="row mb-4 mt-4">
        <div className="col">
          <h2 className="mb-2">{heading.flyingFrom} - {heading.flyingTo}</h2>
          <p>{flightsData.meta.count} Flights &nbsp;&nbsp; · &nbsp;&nbsp; {heading.roundOneWay === 'roundTrip' ? 'Round Trip' : 'One Way'} &nbsp;&nbsp; · &nbsp;&nbsp; {heading.travelClass} &nbsp;&nbsp; · &nbsp;&nbsp; {heading.guests} Guests</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <FlightsSearch id={"flights-search"} loading={searchLoading} flightsCallback={handleFlightSearchFilter} />
      {
        flightsData.data.length > 0 ?
        <>
          <FlightsFilter id={"flights-filter"} loading={filterLoading} toCallback={toCallback} panelClass={panelClass} flightsCallback={handleFlightSearchFilter} handlePanelCallback={handlePanelCallbackParent} airlines={flightsData?.dictionaries?.carriers} />
          <div className="container-xxl py-5 section-block">
            {renderHeading()}
            <div className="row mb-4 mt-4 d-flex justify-content-end">
              <div className="col-auto">
                <div className="row g-1 align-items-center mb-2">
                  <div className="col-auto">
                    <span>Sort by:</span>
                  </div>
                  <div className="col-auto">
                    <Select id={"flights-sort"} keyName={"flightSort"} eventType={1} options={sortOptions} classes={"form-sort"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion" id="flight-contain">
              {
                Array.isArray(flightsData.data) && flightsData.data.length > 0 &&
                (
                  <>
                    {
                      Array.isArray(flightsData.data) && flightsData.data.length > 0 && flightsData.data.map((flight, index) => {
                        return (<FlightContainer id={`flight-${index}`} flightData={modifyFlightData(flight)} flightCardCallback={flightCardCallback} />)
                      })
                    }
                  </>
                )
              }
              {
                Array.isArray(flightsData.data) && flightsData.data.length === 0 &&
                <NoDataAvailable text={"No Data Available. Please modify or perform your search"} />
              }
            </div>
          </div>
        </> : <DefaultBody />
      }
    </>
  )
};

export default Flights;
