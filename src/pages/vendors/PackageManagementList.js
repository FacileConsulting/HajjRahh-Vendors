import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { handleAPIData } from '../../hooks/useCustomApi';
import VendorForm from '../../components/vendors/VendorForm';
import { toast } from 'react-toastify';
import { toastOptions } from '../../toastify';
import {
  defaultPackages
} from '../../constant/func';
import {
  resetVendorsComponentFunc
} from '../../reducers/vendorsSlice';
import { responseHandler } from '../../constant/func';

const PackageManagementList = ({ obj }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ob, setOb] = useState({ ...obj });

  const updateTbodyValue = (value) => {
    ob.content[1].fields[2].value.tbody = value;
    setOb({ ...ob });
  }

  const fetchAllPackageManagement = async (loadingFlag) => {
    if (loadingFlag) updateTbodyValue('loading');
    let response = await handleAPIData('POST', '/api/vendors', { type: 'PACKAGE_MANAGEMENT_FETCH_ALL' });
    console.log('/api/vendors PACKAGE_MANAGEMENT_FETCH_ALL', response);
    updateTbodyValue([]);
    const returned = responseHandler(response);
    if (returned) createResponse(returned);
  }
  
  const caughtDataOnClick = async (catchData, id) => {
    if (catchData === 'packageManagementListEditBtn') {
      updateTbodyValue('loading');
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PACKAGE_MANAGEMENT_FETCH', packageManagementId: id });
      console.log('/api/vendors PACKAGE_MANAGEMENT_FETCH', response);
      if (response.status === 'success' && response.data.noPackage) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.data) {
        history.push({
          pathname: '/vendors/package-management-new',
          state: { from: 'Edit Icon Package Click', data: response.data.data }
        });
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
    } else if (catchData === 'packageManagementListNewPackageBtn') {      
      // history.push('/vendors/package-management-new');      
      history.push({
        pathname: '/vendors/package-management-new',
        state: 'createNewPackage'
      });
    } else if (catchData === 'packageManagementListDeleteBtn' && id) {
      updateTbodyValue('loading');
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PACKAGE_MANAGEMENT_DELETE', packageManagementId: id });
      console.log('/api/vendors PACKAGE_MANAGEMENT_DELETE', response);
      if (response.status === 'success' && response.data.notFound) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.deleted) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
      fetchAllPackageManagement();
    } else if (catchData === 'packageManagementListOpenBtn' && id) {
      updateTbodyValue('loading');
      let response = await handleAPIData('POST', '/api/vendors', { type: 'PACKAGE_MANAGEMENT_FETCH', packageManagementId: id });
      console.log('/api/vendors PACKAGE_MANAGEMENT_FETCH', response);
      if (response.status === 'success' && response.data.noPackage) {
        toast.success(response.data.message, toastOptions);
      } else if (response.status === 'success' && response.data.data) {
        history.push({
          pathname: '/vendors/package-management-view',
          state: { from: 'View Details click', data: response.data.data }
        });
      } else if (response.status === 'error' && response.message) {
        toast.error(response.message, toastOptions);
      } else {
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
      fetchAllPackageManagement();
    }
  }

  const createResponse = (data) => {
    let tbody = [];
    for (let i = 0; i < data.length; i++) {
      tbody.push([
        `${data[i].packMangPackageName}^${data[i]._id}` || '',
        data[i].packMangItineraryList && data[i].packMangItineraryList.length ? 'Itinerary Details' : 'No Itinerary',
        data[i].packMangPrice || '',
        data[i].packMangGroupSize || '',
        data[i].packMangDocumentsRequired || '',
        data[i].packMangAccomodation || '',
        data[i].packMangTransportation || '',
        `Actions^${data[i]._id}`
      ]);
    }
    updateTbodyValue(tbody);
  }

  

  useEffect(() => {
    dispatch(resetVendorsComponentFunc({ componentName: 'PackageManagementNew' }));
    fetchAllPackageManagement(true);
  }, []);


  return (
    <div id={ob.id} className="vendor-dash dashboard-body">
      <div className="container-fluid">
        {
          Array.isArray(ob.content) && ob.content.length > 0 && ob.content.map((o, ind) => {
            return (
              <div key={`package-management-list-${ind}`} className={`row ${o.class[0]}`}>
                {
                  Array.isArray(o.fields) && o.fields.length > 0 && o.fields.map((field, index) => {
                    return (
                      <React.Fragment key={`package-management-list-field-${index}`}>
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

export default PackageManagementList;