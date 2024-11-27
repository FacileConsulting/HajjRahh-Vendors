import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { handleAPIData } from '../../hooks/useCustomApi';
import VendorForm from '../../components/vendors/VendorForm';
import { toast } from 'react-toastify';
import { toastOptions } from '../../toastify';
import {
  defaultPackages,
  formatDate
} from '../../constant/func';
import {
  resetVendorsComponentFunc
} from '../../reducers/vendorsSlice';
import { responseHandler } from '../../constant/func';

const PilgrimageBookingList = ({ obj }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ob, setOb] = useState({ ...obj });

  const updateTbodyValue = (value) => {
    ob.content[1].fields[2].value.tbody = value;
    setOb({ ...ob });
  }

  const createResponse = (data) => {
    let tbody = [];
    for (let i = 0; i < data.length; i++) {
      tbody.push([
        `${defaultPackages[data[i].pilBookPackageName]}^${data[i]._id}` || '',
        data[i].pilBookVendorName || '',
        data[i].pilBookVendorCount || 0,
        formatDate(data[i].pilBookFromDate) || '',
        formatDate(data[i].pilBookToDate) || '',
        data[i].pilBookEmail || '',
        data[i].pilBookDocumentStatus || '',
        data[i].pilBookStatus || '',
        `Actions^${data[i]._id}`
      ]);
    }
    updateTbodyValue(tbody);
  }

  const fetchAllPilgrimageBooking = async (loadingFlag) => {
    if (loadingFlag) updateTbodyValue('loading');
    let response = await handleAPIData('POST', '/api/vendors', { type: 'PILGRIMAGE_BOOKING_FETCH_ALL' });
    console.log('/api/vendors PILGRIMAGE_BOOKING_FETCH_ALL', response);
    updateTbodyValue([]);
    const returned = responseHandler(response);
    if (returned) createResponse(returned);
  }

  const caughtDataOnClick = async (catchData, id) => {
    if (catchData === 'pilgrimageBookingListEditBtn') {
      updateTbodyValue('loading');
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PILGRIMAGE_BOOKING_FETCH', pilgrimageBookingId: id });
      console.log('/api/vendors PILGRIMAGE_BOOKING_FETCH', response);
      if (response.status === 'success' && response.data.noPackage) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.data) {
        history.push({
          pathname: '/vendors/pilgrimage-booking-new',
          state: { from: 'Edit Icon Package Click', data: response.data.data }
        });
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
    } else if (catchData === 'pilgrimageBookingListNewBookingBtn') {
      // history.push('/vendors/pilgrimage-booking-new');
      history.push({
        pathname: '/vendors/pilgrimage-booking-new',
        state: 'createNewPilgrimageBooking' 
      });
    } else if (catchData === 'pilgrimageBookingListDeleteBtn' && id) {
      updateTbodyValue('loading');
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PILGRIMAGE_BOOKING_DELETE', pilgrimageBookingId: id });
      console.log('/api/vendors PILGRIMAGE_BOOKING_DELETE', response);
      if (response.status === 'success' && response.data.notFound) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.deleted) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
      fetchAllPilgrimageBooking();
    } else if (catchData === 'pilgrimageBookingListOpenBtn' && id) {
      updateTbodyValue('loading');
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PILGRIMAGE_BOOKING_FETCH', pilgrimageBookingId: id });
      console.log('/api/vendors PILGRIMAGE_BOOKING_FETCH', response);
      if (response.status === 'success' && response.data.noPackage) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.data) {
        history.push({
          pathname: '/vendors/pilgrimage-booking-view',
          state: { from: 'dsafffffff View Details click', data: response.data.data }
        });
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
      fetchAllPilgrimageBooking();
    }
  }

  useEffect(() => {
    dispatch(resetVendorsComponentFunc({ componentName: 'PilgrimageBookingNew' }));
    fetchAllPilgrimageBooking(true);
  }, []);

  return (
    <div id={ob.id} className="vendor-dash dashboard-body">
      <div className="container-fluid">
        {
          Array.isArray(ob.content) && ob.content.length > 0 && ob.content.map((o, ind) => {
            return (
              <div key={`pil-booking-list-${ind}`} className={`row ${o.class[0]}`}>
                {
                  Array.isArray(o.fields) && o.fields.length > 0 && o.fields.map((field, index) => {
                    console.log('field, field', field);
                    return (
                      <React.Fragment key={`pil-booking-list-field-${index}`}>
                        <VendorForm
                          component={ob.component}
                          item={field}
                          caughtDataOnClick={caughtDataOnClick}
                        />
                      </React.Fragment>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PilgrimageBookingList;