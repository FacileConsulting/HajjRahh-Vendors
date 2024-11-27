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
import {
  resetVendorsComponentFunc
} from '../../reducers/vendorsSlice';

const PackageManagementView = ({ obj }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  let getId = '';

  const dataBinder = (data) => {
    const { content, looper } = { ...obj };
    const copy = structuredClone(content);
    getId = data?._id;
    copy[1].fields[0].value = defaultPackages[data.pilBookPackageName] || '';
    copy[1].fields[1].value = formatDate(data.pilBookFromDate) || '';
    copy[1].fields[2].value = formatDate(data.pilBookToDate) || '';
    for (let i = 0; i < data.pilBookTravelersList.length; i++) {
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
  const dats = state.data;

  const caughtDataOnClick = async (catchData, id) => {
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

  const handleBack = () => {
    history.push('/vendors/package-management-list');
  }

  useEffect(() => {
    dispatch(resetVendorsComponentFunc({ componentName: 'PilgrimageBookingNew' }));
  }, []);

  return (
    <div id="vendor-dashdd" className="vendor-dash dashboard-body">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-auto me-auto">
            <h2>View Package Management</h2>
          </div>
          <div className="col-auto">
            <a href="#!" className="btn btn-secondary btn-sm" onClick={handleBack}>Back</a>
          </div>
        </div>
        <div className="bg-white p-3">
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <h4>Package name</h4>
                <p>{dats.packMangPackageName}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <h4>Price</h4>
                <p>${dats.packMangPrice}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <h4>Group size</h4>
                <p>{dats.packMangGroupSize}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <h4>Accommodation</h4>
                <p>{dats.packMangAccomodation}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <h4>Documents required</h4>
                <p>{dats.packMangDocumentsRequired}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <h4>Transportation required</h4>
                <p>{dats.packMangTransportation}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <h4>Availability for Hajj</h4>
                <p>{dats.packMangHajjDates}</p>
              </div>
            </div>
            <div className="col-4">
              <div className="mb-3">
                <h4>Availability for Umrah</h4>
                <p>{dats.packMangUmrahDates}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <h4>Iternary</h4>
                <div className="day-itinerary">
                  {
                    dats.packMangItineraryList.map((item, index) => {
                      return (
                        <dl className={`row ${index === 0 && 'mb-4'}`}>
                          <dt className="col-sm-3">
                            <h4>{item.title}</h4>
                          </dt>
                          <dd className="col-sm-9">
                            <div className="itinerary-detail">
                              <div className="itinerary-details-line"></div>
                              <p>{item.description}</p>
                            </div>
                          </dd>
                        </dl>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <h4>Transportation guidelines</h4>
                <div className="row" id="inc-exc">
                  <div className="col-6">
                    <h4>Inclusion</h4>
                    {dats.packMangInclusion.split(".").map((inc, i) => <p key={i}><i className="bi bi-check"></i>{inc.trim()}</p>)}
                  </div>
                  <div className="col-6">
                    <h4>Exclusion</h4>
                    {dats.packMangExclusion.split(".").map((inc, i) => <p key={i}><i className="bi bi-check"></i>{inc.trim()}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageManagementView;