import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetHomeFunc } from '../reducers/homeSlice';
import HolidaysModifySearch from '../components/HolidaysModifySearch';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import HolidaysFilter from '../components/HolidaysFilter';
import NoDataAvailable from '../components/NoDataAvailable';
import HolidayContainer from '../components/HolidayContainer';
import Select from '../components/Select';
import DefaultBody from '../components/DefaultBody';
import store from '../store'
import 'react-toastify/dist/ReactToastify.css';

const Holidays = ({ id }) => {
  localStorage.setItem('current_route', '/holidays');
  const history = useHistory();

  const sortOptions = [
    {
      value: '',
      label: 'Select'
    },
    {
      value: 'bydate',
      label: 'By Date'
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

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const { trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000, tourFocus1, tourFocus2, tourFocus3, tourFocus4, tourFocus5, languageHindi, languageEnglish, languageArabic, meals1, meals2, meals3, meals4, meals5, vehicleTypeHatchback, vehicleTypeSedan, vehicleTypeSUV, vehicleTypeMUV, vehicleTypeCompactSUV, sp1, sp2, sp3, sp4, sp5 } = useSelector(state => state.myAccount);
  const [holidaysData, setHolidaysData] = useState(state?.data?.holidaysData || null);
  const [flightsDatum, setFlightsDatum] = useState(state?.data?.flightsData || { data: [], dictionaries: {}, meta: {} });
  const [loading, setLoading] = useState(false);
  const [toCallback, setToCallback] = useState(false);
  const [panelClass, setPanelClass] = useState('filter-list');
  // dispatch(resetHomeFunc());
  const {
    departure,
    destination,
    holidaySort,
    holidayDepartureDate,
    holidayReturnDate,
    sacredType,
    flightType,
    flightClass,
    foodType
  } = useSelector(state => state.home);

  const holidayCardCallback = (data) => {
    history.push({
      pathname: '/holidayDetails',
      state: { from: 'Holiday View Details click', data: data }
    });
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
      fromHoliday: true,
      flyingFrom: departure.split('^')[0],
      flyingTo: destination.split('^')[0],
      flightDepartureDateNotReversed: holidayDepartureDate,
      flightDepartureDate: convertDate(holidayDepartureDate),
      flightReturnDate: convertDate(holidayReturnDate),
      sacredType,
      flightType: flightType === 'direct' ? true : false,
      travelClass: flightClass,
      foodType
    }
  }

  const handleHolidaySearchFilter = async (type) => {
    let payload = {};
    setPanelClass('filter-list');
    if (loading) {
      return;
    }
    console.log('tripsers', type, trip3, trip4, trip7);

    // if (!departure && !destination && !holidayDepartureDate && !sacredType && !foodType) {
    if (!departure && !destination && !holidayDepartureDate) {
      toast.info('Please select atleast one field', toastOptions);
      return;
    } else if (!departure) {
      toast.info('Please select departure place', toastOptions);
      return;
    } else if (!destination) {
      toast.info('Please select destination place', toastOptions);
      return;
    } else if (!holidayDepartureDate) {
      toast.info('Please select departure date', toastOptions);
      return;
    }

    if (type === 'filter' && !trip3 && !trip4 && !trip7 && !trip11 && !trip16 && !star5 && !star4 && !star3 && !transBus && !transLandOnly && !transFlight && !transCruise && !transOptional && !themeAdventure && !themeAffordable && !themeArtCulture && !themeBeach && !themeBestSeller && !priceLt1000 && !priceGt1000 && !priceGt2000 && !priceGt4000 && !priceGt8000 && !tourFocus1 && !tourFocus2 && !tourFocus3 && !tourFocus4 && !tourFocus5 && !languageHindi && !languageEnglish && !languageArabic && !meals1 && !meals2 && !meals3 && !meals4 && !meals5 && !vehicleTypeHatchback && !vehicleTypeSedan && !vehicleTypeSUV && !vehicleTypeMUV && !vehicleTypeCompactSUV && !sp1 && !sp2 && !sp3 && !sp4 && !sp5) {
      toast.info('Please select atleast one filter', toastOptions);
      return;
    }
    if (type === 'filter' && (holidaysData === null || holidaysData.length === 0)) {
      setToCallback(!toCallback);
      toast.info('Please perform modify search operation first', toastOptions);
      return;
    }

    if (type === 'filter') {
      payload = {
        ...preparePayload(),
        trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000, tourFocus1, tourFocus2, tourFocus3, tourFocus4, tourFocus5, languageHindi, languageEnglish, languageArabic, meals1, meals2, meals3, meals4, meals5, vehicleTypeHatchback, vehicleTypeSedan, vehicleTypeSUV, vehicleTypeMUV, vehicleTypeCompactSUV, sp1, sp2, sp3, sp4, sp5
      }
    }

    if (type === 'search') {
      payload = {
        ...preparePayload()
      }
    }
    setToCallback(!toCallback);
    console.log('sfsdfdfdf', departure, destination, holidayDepartureDate, holidayReturnDate, sacredType, flightType, flightClass, foodType, trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000, tourFocus1, tourFocus2, tourFocus3, tourFocus4, tourFocus5, languageHindi, languageEnglish, languageArabic, meals1, meals2, meals3, meals4, meals5, vehicleTypeHatchback, vehicleTypeSedan, vehicleTypeSUV, vehicleTypeMUV, vehicleTypeCompactSUV, sp1, sp2, sp3, sp4, sp5);
    setLoading(true);
    let resFlights = await handleAPIData('POST', '/api/searchFlights', payload);
    let resHolidays = await handleAPIData('POST', '/api/searchHolidays', payload);
    console.log('responseFlights responseHolidays', resFlights, resHolidays);
    let responseFlights = resFlights.data;
    let responseHolidays = resHolidays.data;


    if (responseFlights && responseFlights.status === 'success' && responseFlights.data.data.length === 0) {
      toast.info('No flights available.', toastOptions);
      setFlightsDatum({ data: [], dictionaries: {}, meta: {} });
    } else {
      setFlightsDatum({ data: [], dictionaries: {}, meta: {} });
    }

    if (responseFlights && responseFlights.status === 'success' && responseHolidays && responseHolidays.status === 'success' && responseHolidays.data.length > 0) {
      if (holidaySort) {
        holidaySortBy(holidaySort, responseHolidays.data, responseFlights.data);
      } else {
        const { data, dictionaries, meta } = responseFlights.data;
        setFlightsDatum({ data, dictionaries, meta });
        setHolidaysData(responseHolidays.data);
      }
    } else if (responseHolidays && responseHolidays.status === 'success' && responseHolidays.data.length === 0) {
      toast.warning('Search Holidays Not Found.', toastOptions);
      setHolidaysData([]);
      console.log('responsezero', responseHolidays.data);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  }

  const handlePanelCallbackParent = () => {
    setPanelClass(panelClass === 'filter-list' ? 'filter-show' : 'filter-list');
  }

  const holidaySortBy = (type, holidaysData, fd) => {
    const { data, dictionaries, meta } = fd;
    setFlightsDatum({ data, dictionaries, meta });
    if (type === 'byprice') {
      let sortedHolidaysData = holidaysData.sort((a, b) => new Date(a.price) - new Date(b.price));
      console.log('dsf', sortedHolidaysData);
      setHolidaysData([...sortedHolidaysData]);
    } else if (type === 'bydate') {
      const sortedDates = holidaysData.sort((a, b) => {
        const dateA = new Date(a.dateRange[0].split('-').reverse().join('-'));
        const dateB = new Date(b.dateRange[0].split('-').reverse().join('-'));
        return dateA - dateB;
      });
      console.log('bydate', sortedDates);
      setHolidaysData([...sortedDates]);
    }
  }

  useEffect(() => {
    console.log('useEff', state);
    if (state == null) {
      console.log('useEffinner');
      dispatch(resetHomeFunc());
    }

  }, []);

  useEffect(() => {
    console.log("Data updated: ", holidaySort);
    if (holidaysData && holidaysData.length > 0) {
      holidaySortBy(holidaySort, holidaysData, flightsDatum);
    }
  }, [holidaySort]);

  return (
    <>
      <HolidaysModifySearch id={"holidays-modify-search"} loading={loading} holidaysCallback={handleHolidaySearchFilter} />
      {
        holidaysData && holidaysData.length > 0 && flightsDatum.data.length > 0 ?
          <>
            <HolidaysFilter id={"holidays-filter"} loading={loading} toCallback={toCallback} panelClass={panelClass} holidaysCallback={handleHolidaySearchFilter} handlePanelCallback={handlePanelCallbackParent} />
            <div className="container-xxl py-5 section-block">
              <div className="row mb-4 mt-4">
                <div className="col-auto me-auto">
                  <h3>Packages based on search</h3>
                </div>
                <div className="col-auto">
                  <div className="row g-1 align-items-center">
                    <div className="col-auto">
                      <span>Sort by:</span>
                    </div>
                    <div className="col-auto">
                      <Select id={"holidays-sort"} keyName={"holidaySort"} eventType={1} options={sortOptions} classes={"form-sort"} />
                    </div>
                  </div>
                </div>
              </div>
              {
                holidaysData.map((holiday, index) => {
                  return (<HolidayContainer id={`holiday-${index}`} holidayData={holiday} flightsDatum={flightsDatum} departure={departure} destination={destination} holidayCardCallback={holidayCardCallback} />)
                })
              }
            </div> </> : <DefaultBody />
      }

    </>
  )
};

export default Holidays;
