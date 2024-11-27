import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { resetHomeFunc } from '../reducers/homeSlice';
import { handleAPIData } from '../hooks/useCustomApi';
import CabsFilter from '../components/CabsFilter';
import CabsSearch from '../components/CabsSearch';
import CabContainer from '../components/CabContainer';
import NoDataAvailable from '../components/NoDataAvailable';
import Select from '../components/Select';
import DefaultBody from '../components/DefaultBody';

const Cabs = ({ id }) => {
  localStorage.setItem('current_route', '/cabs');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [toCallback, setToCallback] = useState(false);
  const [cabsData, setCabsData] = useState([]);

  const sortOptions = [
    {
      value: '',
      label: 'Select'
    },
    // {
    //   value: 'bydate',
    //   label: 'By Date'
    // },
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
  const [panelClass, setPanelClass] = useState('filter-list');
  const { cabPassengers3, cabPassengers4, cabPassengers5, cabPassengers6, cabPriceLt40, cabPriceLt60, cabPriceLt80, cabPriceLt100, cabVehicleHatchback, cabVehicleSedan, cabVehicleSUV, cabVehicleMUV, cabVehicleCompactSUV, cabModelWagonR, cabModelIndica, cabModelDzire, cabModelEtios, cabModelXcent } = useSelector(state => state.myAccount);

  const {
    cabSort,
    cabPickUpPlace,
    cabDropPlace,
    cabDate,
    cabTime
  } = useSelector(state => state.home);

  const cabCardCallback = (data) => {
    history.push({
      pathname: '/cabDetails',
      state: { from: 'Cab View Details click', data: data }
    });
  }

  const handlePanelCallbackParent = () => {
    setPanelClass(panelClass === 'filter-list' ? 'filter-show' : 'filter-list');
  }

  const cabSortBy = (type, cabsData) => {
    if (type === 'byprice') {
      let sortedcabsData = cabsData.sort((a, b) => new Date(a.price) - new Date(b.price));
      console.log('dsf', sortedcabsData);
      setCabsData([...sortedcabsData]);
    } else if (type === 'bydate') {
      const sortedDates = cabsData.sort((a, b) => {
        const dateA = new Date(a.dateRange[0].split('-').reverse().join('-'));
        const dateB = new Date(b.dateRange[0].split('-').reverse().join('-'));
        return dateA - dateB;
      });
      console.log('bydate', sortedDates);
      setCabsData([...sortedDates]);
    }
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

  const handleBookNowClick = () => {
    history.push({
      pathname: '/cabDetails',
      state: { from: 'Holiday Make Payment click', data: 'bookingResponse.data' }
    });
  }

  const preparePayload = () => {
    return {
      cabPickUpPlace: cabPickUpPlace.split('^')[0],
      cabDropPlace: cabDropPlace.split('^')[0],
      cabDate: cabDate,
      cabTime: cabTime
    }
  }

  const handleCabSearchFilter = async (type) => {
    let payload = {};
    setPanelClass('filter-list');
    if (loading) {
      return;
    }

    if (!cabPickUpPlace && !cabDropPlace && !cabDate && !cabTime) {
      toast.info('Please select atleast one field', toastOptions);
      return;
    } else if (!cabPickUpPlace) {
      toast.info('Please select Pick Up place', toastOptions);
      return;
    } else if (!cabDropPlace) {
      toast.info('Please select Drop place', toastOptions);
      return;
    } else if (!cabDate) {
      toast.info('Please select date', toastOptions);
      return;
    } else if (!cabTime) {
      toast.info('Please select time', toastOptions);
      return;
    }

    if (type === 'filter' && !cabPassengers3 && !cabPassengers4 && !cabPassengers5 && !cabPassengers6 && !cabPriceLt40 && !cabPriceLt60 && !cabPriceLt80 && !cabPriceLt100 && !cabVehicleHatchback && !cabVehicleSedan && !cabVehicleSUV && !cabVehicleMUV && !cabVehicleCompactSUV && !cabModelWagonR && !cabModelIndica && !cabModelDzire && !cabModelEtios && !cabModelXcent) {
      toast.info('Please select atleast one filter', toastOptions);
      return;
    }
    if (type === 'filter' && (cabsData === null || cabsData.length === 0)) {
      setToCallback(!toCallback);
      toast.info('Please perform modify search operation first', toastOptions);
      return;
    }

    if (type === 'filter') {
      payload = {
        ...preparePayload(),
        cabPassengers3, cabPassengers4, cabPassengers5, cabPassengers6, cabPriceLt40, cabPriceLt60, cabPriceLt80, cabPriceLt100, cabVehicleHatchback, cabVehicleSedan, cabVehicleSUV, cabVehicleMUV, cabVehicleCompactSUV, cabModelWagonR, cabModelIndica, cabModelDzire, cabModelEtios, cabModelXcent
      }
    }

    if (type === 'search') {
      payload = {
        ...preparePayload()
      }
    }
    setToCallback(!toCallback);
    console.log('sfsdfdfdf', payload, cabPickUpPlace, cabDropPlace, cabDate, cabPassengers3, cabPassengers4, cabPassengers5, cabPassengers6, cabPriceLt40, cabPriceLt60, cabPriceLt80, cabPriceLt100, cabVehicleHatchback, cabVehicleSedan, cabVehicleSUV, cabVehicleMUV, cabVehicleCompactSUV, cabModelWagonR, cabModelIndica, cabModelDzire, cabModelEtios, cabModelXcent);
    setLoading(true);
    let resCabs = await handleAPIData('POST', '/api/searchCabs', payload);
    console.log('resCabs', resCabs);
    let responseCabs = resCabs.data;

    if (responseCabs && responseCabs.status === 'success' && responseCabs.data.length > 0) {
      if (cabSort) {
        cabSortBy(cabSort, responseCabs.data);
      } else {
        setCabsData(responseCabs.data);
      }
    } else if (responseCabs && responseCabs.status === 'success' && responseCabs.data.length === 0) {
      toast.warning('Search Cabs Not Found.', toastOptions);
      setCabsData([]);
      console.log('responsezero', responseCabs.data);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    setLoading(false);
  }

  const renderHeading = () => {
    return (
      <div className="col-auto py-5 me-auto">
        <h2 className="mb-2">{cabsData.length} Cabs Available </h2>
        <p>One Way &nbsp;&nbsp; · &nbsp;&nbsp; 152 kms &nbsp;&nbsp;</p>
      </div>
    )
  }

  useEffect(() => {
    console.log('useEff', state);
    if (state == null) {
      console.log('useEffinner');
      dispatch(resetHomeFunc());
    }

  }, []);

  useEffect(() => {
    console.log("Data updated: ", cabSort);
    if (cabsData && cabsData.length > 0) {
      cabSortBy(cabSort, cabsData);
    }
  }, [cabSort]);

  return (
    <>
      <CabsSearch id={"cabs-search"} loading={loading} cabsCallback={handleCabSearchFilter} />
      {
        cabsData.length > 0 ?
          <>
            <CabsFilter id={"cabs-filter"} loading={loading} toCallback={toCallback} panelClass={panelClass} cabsCallback={handleCabSearchFilter} handlePanelCallback={handlePanelCallbackParent} />
            <div className="container-xxl py-5 section-block">
              {renderHeading()}

              <div className="row mb-4 mt-4 d-flex justify-content-end">
                <div className="col-auto">
                  <div className="row g-1 align-items-center mb-2">
                    <div className="col-auto">
                      <span>Sort by:</span>
                    </div>
                    <div className="col-auto">
                      <Select id={"cabs-sort"} keyName={"cabSort"} eventType={1} options={sortOptions} classes={"form-sort"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion" id="cab-contain">
                {
                  cabsData.map((cab, index) => {
                    return (<CabContainer id={`cab-${index}`} cabData={cab} cabCardCallback={cabCardCallback} />)
                  })
                }
              </div>
            </div>
          </> : <DefaultBody />
      }
    </>
  )
};

export default Cabs;
