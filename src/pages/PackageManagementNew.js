import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import VendorForm from '../components/VendorForm';
import { handleAPIData } from '../hooks/useCustomApi';
import {
  resetVendorsComponentFunc,
  resetVendorsFunc,
  updateVendorsFunc
} from '../reducers/vendorsSlice';
import { vData } from '../constant/vendor';


const PackageManagementNew = ({ obj }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const { PackageManagementNew } = useSelector(state => state.vendors);

  const dispatched = (keyName, val, isReturn) => {
    dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName, value: val || '' }));
    if (isReturn) return val;
  }
  const rawItinerary = (num, obs) => {

    return [
      {
        id: `package-management-new-itinerary-title-${num}`,
        label: `Itinerary ${num}`,
        keyName: `packageManagementNewItineraryTitle_${num}`,
        type: "text",
        description: "input with label text",
        value: obs ? dispatched(`packageManagementNewItineraryTitle_${num}`, obs.title, true) : "",
        htmlFor: `package-management-new-itinerary-title-${num}-for`,
        placeholder: "Title",
        class: [["mb-2"]]
      },
      {
        id: `package-management-new-itinerary-description-${num}`,
        keyName: `packageManagementNewItineraryDescription_${num}`,
        label: "",
        type: "textarea",
        description: "textarea without label text",
        value: obs ? dispatched(`packageManagementNewItineraryDescription_${num}`, obs.description, true) : "",
        htmlFor: `package-management-new-itinerary-description-${num}-for`,
        placeholder: "Description",
        class: [["mb-2"]]
      }
    ]
  }

  const createEditObj = (oneRecord) => {
    const {
      packMangPackageName,
      packMangPrice,
      packMangGroupSize,
      packMangAccomodation,
      packMangDocumentsRequired,
      packMangTransportation,
      packMangHajjDates,
      packMangUmrahDates,
      packMangInclusion,
      packMangExclusion,
      packMangItineraryList
    } = oneRecord;
    obj.content[0].fields[0].label = 'Edit Package Management';
    obj.content[0].fields[1].entity[1].label = 'Update';
    let getContent = [...obj.content];
    const lastButtons = getContent[2].fields[0].fields[getContent[2].fields[0].fields.length - 1];
    // const lastContent = getContent.pop();
    // getContent.pop();
    getContent[1].fields[0].value = packMangPackageName || '';
    dispatched('packageManagementId', oneRecord._id);
    dispatched(getContent[1].fields[0].keyName, packMangPackageName);
    // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: 'packageManagementId', value: oneRecord._id || '' }));
    // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[0].keyName, value: packMangPackageName || '' }));
    if (packMangPrice) {
      getContent[1].fields[1].value = packMangPrice || '';      
      dispatched(getContent[1].fields[1].keyName, packMangPrice);
      // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[1].keyName, value: packMangPrice || '' }));
    }
    if (packMangGroupSize) {
      getContent[1].fields[2].value = packMangGroupSize || '';          
      dispatched(getContent[1].fields[2].keyName, packMangGroupSize);
      // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[2].keyName, value: packMangGroupSize || '' }));
    }
    if (packMangAccomodation) {
      getContent[1].fields[3].value = packMangAccomodation || '';         
      dispatched(getContent[1].fields[3].keyName, packMangAccomodation);
      // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[3].keyName, value: packMangAccomodation || '' }));
    }
    if (packMangDocumentsRequired) {
      const arr = packMangDocumentsRequired.split(',');
      if (arr.length && arr.includes('Visa')) {
        getContent[1].fields[4].fields[0].value = true;       
        dispatched(getContent[1].fields[4].fields[0].keyName, true);
        // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[4].fields[0].keyName, value: true || false }));
      } else {
        getContent[1].fields[4].fields[0].value = false;
      }
      if (arr.length && arr.includes('Passport')) {
        getContent[1].fields[4].fields[1].value = true;     
        dispatched(getContent[1].fields[4].fields[1].keyName, true);
        // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[4].fields[1].keyName, value: true || false }));
      } else {
        getContent[1].fields[4].fields[1].value = false;
      }
      if (arr.length && arr.includes('Medical')) {
        getContent[1].fields[4].fields[2].value = true;   
        dispatched(getContent[1].fields[4].fields[2].keyName, true);
        // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[4].fields[2].keyName, value: true || false }));
      } else {
        getContent[1].fields[4].fields[2].value = false;
      }
    }
    if (packMangTransportation) {
      if (packMangTransportation === 'Yes') {
        getContent[1].fields[5].value = getContent[1].fields[5].fields[0].value;
      } else if (packMangTransportation === 'No') {
        getContent[1].fields[5].value = getContent[1].fields[5].fields[1].value;
      } 
      dispatched(getContent[1].fields[5].keyName, packMangTransportation);
      // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[5].keyName, value: packMangTransportation || '' }));
    }
    if (packMangHajjDates) {
      getContent[1].fields[6].value = packMangHajjDates || '';
      dispatched(getContent[1].fields[6].keyName, packMangHajjDates);
      // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[6].keyName, value: packMangHajjDates || '' }));
    }
    if (packMangUmrahDates) {
      getContent[1].fields[7].value = packMangUmrahDates || '';
      dispatched(getContent[1].fields[7].keyName, packMangHajjDates);
      // dispatch(updateVendorsFunc({ componentName: 'PackageManagementNew', keyName: getContent[1].fields[7].keyName, value: packMangUmrahDates || '' }));
    }
    
    if (packMangInclusion) {
      const arr = packMangInclusion.split(',');
      if (arr.length && arr.includes('Hajj Visa')) {
        getContent[2].fields[1].fields[1].fields[0].value = true;       
        dispatched(getContent[2].fields[1].fields[1].fields[0].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[0].value = false;
      }
      if (arr.length && arr.includes('Ticket')) {
        getContent[2].fields[1].fields[1].fields[1].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[1].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[1].value = false;
      }
      if (arr.length && arr.includes('Hajj Kit')) {
        getContent[2].fields[1].fields[1].fields[2].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[2].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[2].value = false;
      }
      if (arr.length && arr.includes('Stay')) {
        getContent[2].fields[1].fields[1].fields[3].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[3].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[3].value = false;
      }
      if (arr.length && arr.includes('Transportation')) {
        getContent[2].fields[1].fields[1].fields[4].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[4].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[4].value = false;
      }
      if (arr.length && arr.includes('3 Times Buffet Indian Food')) {
        getContent[2].fields[1].fields[1].fields[5].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[5].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[5].value = false;
      }
      if (arr.length && arr.includes('Ziyarat of Makkahh and Madina')) {
        getContent[2].fields[1].fields[1].fields[6].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[6].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[6].value = false;
      }
      if (arr.length && arr.includes('Laundry')) {
        getContent[2].fields[1].fields[1].fields[7].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[7].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[7].value = false;
      }
      if (arr.length && arr.includes('Zam Zam 5 litres')) {
        getContent[2].fields[1].fields[1].fields[8].value = true;     
        dispatched(getContent[2].fields[1].fields[1].fields[8].keyName, true);
      } else {
        getContent[2].fields[1].fields[1].fields[8].value = false;
      }

    }
    if (packMangExclusion) {
      const arr = packMangExclusion.split(',');
      if (arr.length && arr.includes('Excess Bagggage')) {
        getContent[2].fields[1].fields[2].fields[0].value = true;       
        dispatched(getContent[2].fields[1].fields[2].fields[0].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[0].value = false;
      }
      if (arr.length && arr.includes('Tawaf-e-Ziyarat')) {
        getContent[2].fields[1].fields[2].fields[1].value = true;     
        dispatched(getContent[2].fields[1].fields[2].fields[1].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[1].value = false;
      }
      if (arr.length && arr.includes('Room Services')) {
        getContent[2].fields[1].fields[2].fields[2].value = true;     
        dispatched(getContent[2].fields[1].fields[2].fields[2].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[2].value = false;
      }
      if (arr.length && arr.includes('Porter Services')) {
        getContent[2].fields[1].fields[2].fields[3].value = true;     
        dispatched(getContent[2].fields[1].fields[2].fields[3].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[3].value = false;
      }
      if (arr.length && arr.includes('Individual Transfer')) {
        getContent[2].fields[1].fields[2].fields[4].value = true;     
        dispatched(getContent[2].fields[1].fields[2].fields[4].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[4].value = false;
      }
      if (arr.length && arr.includes('Qurbani')) {
        getContent[2].fields[1].fields[2].fields[5].value = true;     
        dispatched(getContent[2].fields[1].fields[2].fields[5].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[5].value = false;
      }
      if (arr.length && arr.includes('GST & TCS')) {
        getContent[2].fields[1].fields[2].fields[6].value = true;     
        dispatched(getContent[2].fields[1].fields[2].fields[6].keyName, true);
      } else {
        getContent[2].fields[1].fields[2].fields[6].value = false;
      }
    }
    getContent[2].fields[0].fields = [];
    for (let i = 0; i < packMangItineraryList.length; i++) {
      let mainObj = rawItinerary(i + 1, packMangItineraryList[i]);  
      getContent[2].fields[0].fields.push(mainObj[0]);
      getContent[2].fields[0].fields.push(mainObj[1]);    
    }    
    getContent[2].fields[0].fields.push(lastButtons);
    return { ...obj, content: [...getContent] };
  }

  const forceReset = (obj) => {
    let getContent = [...obj.content];
    getContent[0].fields[0].label = 'Add Package Management';
    getContent[0].fields[1].entity[1].label = 'Create';
    getContent[1].fields[0].value = '';
    getContent[1].fields[1].value = [];
    getContent[1].fields[2].value = '';
    getContent[1].fields[3].value = [];
    getContent[1].fields[4].fields[0].value = false;
    getContent[1].fields[4].fields[1].value = false;
    getContent[1].fields[4].fields[2].value = false;
    getContent[1].fields[5].value = '';
    getContent[1].fields[6].value = '';
    getContent[1].fields[7].value = '';    
    getContent[2].fields[1].fields[1].fields[0].value = false;
    getContent[2].fields[1].fields[1].fields[1].value = false;
    getContent[2].fields[1].fields[1].fields[2].value = false;
    getContent[2].fields[1].fields[1].fields[3].value = false;
    getContent[2].fields[1].fields[1].fields[4].value = false;
    getContent[2].fields[1].fields[1].fields[5].value = false;
    getContent[2].fields[1].fields[1].fields[6].value = false;
    getContent[2].fields[1].fields[1].fields[7].value = false;
    getContent[2].fields[1].fields[1].fields[8].value = false;
    getContent[2].fields[1].fields[2].fields[0].value = false;
    getContent[2].fields[1].fields[2].fields[1].value = false;
    getContent[2].fields[1].fields[2].fields[2].value = false;
    getContent[2].fields[1].fields[2].fields[3].value = false;
    getContent[2].fields[1].fields[2].fields[4].value = false;
    getContent[2].fields[1].fields[2].fields[5].value = false;
    getContent[2].fields[1].fields[2].fields[6].value = false;

    let lastButtons = getContent[2].fields[0].fields.pop();
    let fisrtTitle = getContent[2].fields[0].fields[0];
    fisrtTitle.value = '';
    let fisrtDescription = getContent[2].fields[0].fields[1];
    fisrtDescription.value = '';
    getContent[2].fields[0].fields = []; 
    getContent[2].fields[0].fields = [fisrtTitle, fisrtDescription, lastButtons];
    return getContent;
    // return { ...obj, content: [...getContent] };
  }

  const objLength = Object.keys(PackageManagementNew).length;

  let renderWith = {};
  if (state?.data && !objLength) {
    renderWith = createEditObj(state.data);
  } else if (state === 'createNewPackage') {
    let getForceReset = forceReset(obj);
    renderWith = { ...obj, content: [...getForceReset] };
  } else {
    renderWith = obj;
  }

  const [ob, setOb] = useState({ ...renderWith });
  const [loading, setLoading] = useState(false);  
  const [itineraryNumber, setItineraryNumber] = useState(state?.data ? state.data.packMangItineraryList.length : 1);
  

  const createPackagesAPICall = async (payload, num) => {
    setLoading(true);
    let response = await handleAPIData('POST', '/api/vendors', payload);
    if (response.status === 'success' && (response.data.created || response.data.updated)) {
      toast.success(response.data.message, toastOptions);
      history.push('/package-management-list');
    } else if (response.status === 'success' && response.data.notUpdated) {
      toast.info(response.data.message, toastOptions);
    } else if (response.status === 'error' && response.message) {
      toast.error(response.message, toastOptions);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    dispatch(resetVendorsComponentFunc({ componentName: 'PackageManagementNew' }));
    setLoading(false);
    setItineraryNumber(num);
  }

  const caughtDataOnClick = (catchData, id, value) => {
    let getContent = [...ob.content];
    const lastButtons = getContent[2].fields[0].fields[getContent[2].fields[0].fields.length - 1];
    if (catchData === 'packageManagementNewAddNewPackageBtn') {
      let mainObj = rawItinerary( Math.ceil(getContent[2].fields[0].fields.length / 2) );
      setItineraryNumber(Math.ceil(getContent[2].fields[0].fields.length / 2));
      getContent[2].fields[0].fields.pop();
      getContent[2].fields[0].fields.push(mainObj[0]);
      getContent[2].fields[0].fields.push(mainObj[1]);
      getContent[2].fields[0].fields.push(lastButtons);
      setOb({ ...ob, content: [...getContent ] });
    } else if (catchData === 'packageManagementNewDeleteBtn') {
      if (getContent[2].fields[0].fields.length > 3) {
        value[getContent[2].fields[0].fields[getContent[2].fields[0].fields.length - 2].keyName] = '';
        value[getContent[2].fields[0].fields[getContent[2].fields[0].fields.length - 3].keyName] = '';
        getContent[2].fields[0].fields.pop();
        getContent[2].fields[0].fields.pop();
        getContent[2].fields[0].fields.pop();
        getContent[2].fields[0].fields.push(lastButtons);
        setItineraryNumber(Math.floor(getContent[2].fields[0].fields.length / 2));
        setOb({ ...ob, content: [ ...getContent ] });
      }
    } else if (catchData === 'packageManagementNewCreateBtn') {
      let iterNumber = itineraryNumber;

      if (Object.keys(PackageManagementNew).length > 0) {
        const {
          packageManagementId,
          packageManagementNewPackageName,
          packageManagementNewPrice,
          packageManagementNewGroupSize,
          packageManagementNewAccomodation,
          packageManagementVisa,
          packageManagementPassport,
          packageManagementMedical,
          packageManagementTransportationRequired,
          packageManagementNewHajjDates,
          packageManagementNewUmrahDates,
          packageManagementHajjVisa,
          packageManagementTicket,
          packageManagementHajjKit,
          packageManagementStay,
          packageManagementTransportation,
          packageManagementBuffet,
          packageManagementZiyarat,
          packageManagementLaundry,
          packageManagementZamZam,
          packageManagementExcessBagggage,
          packageManagementTawafeZiyarat,
          packageManagementRoomServices,
          packageManagementPorterServices,
          packageManagementIndividualTransfer,
          packageManagementQurbani,
          packageManagementGSTTCS
        } = PackageManagementNew;

        const array = Array.from({ length: iterNumber }, (_, i) => i + 1);
        let packageManagementItineraryList = [];
        for (let i = 0; i < array.length; i++) {

          const o = {
            number: array[i],
            title: PackageManagementNew[`packageManagementNewItineraryTitle_${array[i]}`],
            description: PackageManagementNew[`packageManagementNewItineraryDescription_${array[i]}`]
          };

          // any block is empty          
          if (o.number && !o.title && !o.description) {
            iterNumber = iterNumber - 1;
          } else {
            packageManagementItineraryList.push(o);
          }
        }

        const getDocs = () => {
          let docs = [];
          if (packageManagementVisa) {
            docs.push('Visa');
          }
          if (packageManagementPassport) {
            docs.push('Passport');
          }
          if (packageManagementMedical) {
            docs.push('Medical');
          }
          return docs.length ? docs.join(',') : '';
        } 

        const getInclusion = () => {
          let inclusion = [];
          if (packageManagementHajjVisa) {
            inclusion.push('Hajj Visa');
          }
          if (packageManagementTicket) {
            inclusion.push('Ticket');
          }
          if (packageManagementHajjKit) {
            inclusion.push('Hajj Kit');
          }
          if (packageManagementStay) {
            inclusion.push('Stay');
          }
          if (packageManagementTransportation) {
            inclusion.push('Transportation');
          }
          if (packageManagementBuffet) {
            inclusion.push('3 Times Buffet Indian Food');
          }
          if (packageManagementZiyarat) {
            inclusion.push('Ziyarat of Makkahh and Madina');
          }
          if (packageManagementLaundry) {
            inclusion.push('Laundry');
          }
          if (packageManagementZamZam) {
            inclusion.push('Zam Zam 5 litres');
          }
          return inclusion.length ? inclusion.join(',') : '';
        } 

        const getExclusion = () => {
          let exclusion = [];
          if (packageManagementExcessBagggage) {
            exclusion.push('Excess Bagggage');
          }
          if (packageManagementTawafeZiyarat) {
            exclusion.push('Tawaf-e-Ziyarat');
          }
          if (packageManagementRoomServices) {
            exclusion.push('Room Services');
          }
          if (packageManagementPorterServices) {
            exclusion.push('Porter Services');
          }
          if (packageManagementIndividualTransfer) {
            exclusion.push('Individual Transfer');
          }
          if (packageManagementQurbani) {
            exclusion.push('Qurbani');
          }
          if (packageManagementGSTTCS) {
            exclusion.push('GST & TCS');
          }
          return exclusion.length ? exclusion.join(',') : '';
        }

        const inex = {
          dc: getDocs(),
          in: getInclusion(),
          ex: getExclusion()
        };
        if (!packageManagementNewPackageName) {
          toast.info('Please fill Package Name', toastOptions);
          return;
        } else if (!packageManagementNewGroupSize) {
          toast.info('Please fill Group Size', toastOptions);
          return;
        } else if (!packageManagementNewAccomodation  || packageManagementNewAccomodation.length === 0) {
          toast.info('Please select Accomodation', toastOptions);
          return;
        } else if (inex.dc == '') {
          toast.info('Please select the documents required', toastOptions);
          return;
        } else if (!packageManagementNewPrice || packageManagementNewPrice.length === 0) {
          toast.info('Please select Price', toastOptions);
          return;
        } else if (!packageManagementTransportationRequired) {
          toast.info('Please select Transportation Required', toastOptions);
          return;
        } else if (!packageManagementNewHajjDates) {
          toast.info('Please fill Hajj Dates', toastOptions);
          return;
        } else if (!packageManagementNewUmrahDates) {
          toast.info('Please fill Umrah Dates', toastOptions);
          return;
        } else if (packageManagementItineraryList.length === 0) {          
          toast.info('Please fill Itinerary', toastOptions);
          return;
        } else if (packageManagementItineraryList.length > 0) {
          for (let k = 0; k < packageManagementItineraryList.length; k++) {
            if (!packageManagementItineraryList[k].title) {
              toast.info('Please fill Title', toastOptions);
              return;
            }
            if (!packageManagementItineraryList[k].description) {
              toast.info('Please fill Description', toastOptions);
              return;
            }
          }
        } 
        if (inex.in == '') {
          toast.info('Please select the inclusion', toastOptions);
          return;
        } else if (inex.ex == '') {
          toast.info('Please select the exclusion', toastOptions);
          return;
        } 

        const payload = {
          type: 'PACKAGE_MANAGEMENT_CREATE',
          userMobile: localStorage.getItem('loggedMobile'),
          packMangPackageName: packageManagementNewPackageName,
          packMangPrice: packageManagementNewPrice,
          packMangGroupSize: packageManagementNewGroupSize,
          packMangAccomodation: packageManagementNewAccomodation,
          packMangDocumentsRequired: getDocs(),
          packMangTransportation: packageManagementTransportationRequired === 'packageManagementYes' ? 'Yes' : 'No',
          packMangHajjDates: packageManagementNewHajjDates,
          packMangUmrahDates: packageManagementNewUmrahDates,
          packMangInclusion: inex.in,
          packMangExclusion: inex.ex,
          packMangItineraryList: packageManagementItineraryList
        }

        if (packageManagementId) {
          payload.packageManagementId = packageManagementId;
          payload.type = 'PACKAGE_MANAGEMENT_UPDATE';
        }

        if (payload.userMobile) {
          createPackagesAPICall(payload, iterNumber);
        } else {
          toast.info('Please Log In', toastOptions);
          dispatch(resetVendorsFunc());
          history.push('/');
        }
      } else {
        toast.info('Please fill the fields.', toastOptions);
      }
    } else if (catchData === 'packageManagementNewBackBtn') {
      dispatch(resetVendorsComponentFunc({ componentName: 'PackageManagementNew' }));
      history.push('/package-management-list');
    }
  }

  return (
    <div id={ob.id} className="vendor-dash dashboard-body">
      <div className="container-fluid overlay-major">
        {
          loading ?
            <div className="overlay-spinner">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> :
            Array.isArray(ob.content) && ob.content.length > 0 && ob.content.map((o, ind) => {
              return (
                <div key={`package-management-new-${ind}`} className={`row ${o.class[0]}`}>
                  {
                    Array.isArray(o.fields) && o.fields.length > 0 && o.fields.map((field, index) => {
                      return (
                        <React.Fragment key={`package-management-new-field-${index}`}>
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

export default PackageManagementNew;