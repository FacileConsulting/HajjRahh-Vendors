import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastOptions } from '../../toastify';
import {
  defaultPackages,
  formatDate
} from '../../constant/func';
import { handleAPIData } from '../../hooks/useCustomApi';
import VendorForm from '../../components/vendors/VendorForm';
import {
  resetVendorsComponentFunc
} from '../../reducers/vendorsSlice';

const PilgrimageBookingView = ({ obj }) => {
  console.log('!!!!!!!@!@!@!@', obj);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  let getId = '';
  
  const dataBinder = (data) => {
    const { content, looper } = { ...obj };
    const copy = structuredClone(content);
    getId = data?._id;
    console.log('@@#@#####', getId);
    copy[1].fields[0].value = defaultPackages[data.pilBookPackageName] || '';
    copy[1].fields[1].value = formatDate(data.pilBookFromDate) || '';
    copy[1].fields[2].value = formatDate(data.pilBookToDate) || '';
    for ( let i = 0; i < data.pilBookTravelersList.length; i++ ) {
      copy.push(looper(i + 1,
        data.pilBookTravelersList[i].name,
        data.pilBookTravelersList[i].gender.includes("Female") ? 'Female' : 'Male',
        data.pilBookTravelersList[i].mobile,
        data.pilBookTravelersList[i].email,
        data.pilBookTravelersList[i].yesFiles,
        data.pilBookTravelersList[i].noFiles
      ));
    }
    return { ...obj, content: copy };
  }
  const temp = state && state.data ? dataBinder(state.data) : obj;
  const [ob, setOb] = useState({ ...temp });

  const caughtDataOnClick = async (catchData, id) => {
    console.log('@@#@#####!!!!!!!!!!!!!!!!', getId);
    if (catchData === 'pilgrimageBookingViewBackBtn') {      
      history.push('/vendors/pilgrimage-booking-list');
    } else if (catchData === 'pilgrimageBookingViewCancelBookingBtn' && getId) {
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PILGRIMAGE_BOOKING_DELETE', pilgrimageBookingId: getId });
      console.log('/api/vendors PILGRIMAGE_BOOKING_DELETE', response); 
      if (response.status === 'success' && response.data.notFound) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.deleted) {
        toast.success(response.data.message, toastOptions);
        history.push('/vendors/pilgrimage-booking-list');
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
    } else {
      toast.error('Something went wrong. Please contact admin', toastOptions);
    }
  }

  useEffect(() => {    
    dispatch(resetVendorsComponentFunc({ componentName: 'PilgrimageBookingNew' }));
  }, []);

  return (
    <div id={ob.id} className="vendor-dash dashboard-body">
      <div className="container-fluid">
        {
          Array.isArray(ob.content) && ob.content[0] &&
          <div key="pil-booking-view-0" className={`row ${ob.content[0].class[0]}`}>
            {
              Array.isArray(ob.content[0].fields) && ob.content[0].fields.length > 0 && ob.content[0].fields.map((field, index) => {
                return (
                  <React.Fragment key={`pil-booking-view-field-${index}`}>
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
        }
        <div className="bg-white p-3">
          {
            ob.content.slice(1).map((section, sectionIndex) => (
              <div key={`pil-booking-new-${sectionIndex}`} className={`row ${section.class[0]}`}>
                {
                  section.fields.map((field, fieldIndex) => (
                    <React.Fragment key={`pil-booking-view-sub-field-${fieldIndex}`}>
                      <VendorForm
                        component={ob.component}
                        item={field}
                      />
                    </React.Fragment>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default PilgrimageBookingView;