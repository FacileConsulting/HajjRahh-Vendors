import React from 'react';
import Button from './Button';

const HolidayContainer = ({ id, holidayData, flightsDatum, departure, destination, holidayCardCallback }) => {
  console.log('holidayData', holidayData, flightsDatum);

  const handleHolidayViewDetailsClick = async (event) => {
    event.stopPropagation();
    holidayData.departurePlace = departure.split('^')[0];
    holidayData.destinationPlace = destination.split('^')[0];
    holidayCardCallback({ flightsDatum, holidayData });
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
    if (flightsDatum?.dictionaries?.aircraft) {
      return flightsDatum?.dictionaries?.aircraft[code];
    }
  }

  const getPlaceName = (code) => {
    if (flightsDatum?.dictionaries?.locations) {
      return `${code}-${flightsDatum?.dictionaries?.locations[code].countryCode}`;
    }
  }

  const modifyFlightData = (datum, index) => {
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
      holidayDetailActive: index === 0 ? 'active' : '',
      roundOneWay: 'One Way',
      // roundOneWay: heading.roundOneWay === 'roundTrip' ? 'Round Trip' : 'One Way',
      halts: formatHalts(halts),
      time: formatTimeArray(timeArray),
      duration: sumAndCovertToDHM(durationArray),
      fromToCodes: formatFromToCodes(fromToCodes),
      validatingAirlineCodes: datum.validatingAirlineCodes.map(item => `${item}^${dictionaries[item]}`)
    }
  }

  const FlightButton = ({ index, id, flData }) => {
    flightsDatum.data[index] = { ...flData} ;
    return (
      <div id={id} key={id} className="cust-flight">
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
      </div>
    )
  }

  return (
    <div id={id} key={id} className="row mb-4 trip-block">
      <div className="col-10">
        <div className="d-flex flex-row align-items-start">
          <div className="trip-image">
            <img src="./assets/images/book_online/img-1.png" className="img-style" alt="" />
          </div>
          <div className="ps-3">
            <h3>{holidayData.packageName}</h3>
            <p>{holidayData.packageDuration}</p>
            <ul className="list-inline list-unstyled tour-features">
              <li className="list-inline-item">
                <span className="material-symbols-outlined">
                  hotel
                </span>
                <p>Hotel</p>
              </li>
              <li className="list-inline-item">
                <span className="material-symbols-outlined">
                  directions_car
                </span>
                <p>Transfers</p>
              </li>
              <li className="list-inline-item">
                <span className="material-symbols-outlined">
                  restaurant
                </span>
                <p>Food Included</p>
              </li>
            </ul>
            {
              Array.isArray(flightsDatum.data) && flightsDatum.data.length > 0 &&
              (<>
                {
                  Array.isArray(flightsDatum.data) && flightsDatum.data.length > 0 && flightsDatum.data.map((flight, index) => {
                    return (<FlightButton index={index} id={`fl-${index}`} flData={modifyFlightData(flight, index)} />)
                  })
                }
              </>
              )
            }
          </div>
        </div>
      </div>
      <div className="col-2 text-end">
        <h2 className="mb-0">{`$${holidayData.price}`}</h2>
        <p className="mb-4">Per person onwards</p>
        <Button id={"holiday-view-details-btn"} handleBtnClick={handleHolidayViewDetailsClick} btnType={"primary"} classes={"btn-sm"} label={"View details"} />
      </div>
    </div>
  )
};

export default HolidayContainer;
