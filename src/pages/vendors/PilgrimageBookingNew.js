import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../../toastify';
import VendorForm from '../../components/vendors/VendorForm';
import { handleAPIData } from '../../hooks/useCustomApi';
import {
  resetVendorsComponentFunc,
  resetVendorsFunc,
  updateVendorsFunc
} from '../../reducers/vendorsSlice';


const PilgrimageBookingNew = ({ obj }) => {
  const rawTraveler = (num, obs) => {
    const dispatched = (keyName, val) => {
      dispatch(updateVendorsFunc({ componentName: 'PilgrimageBookingNew', keyName, value: val || '' }));
      return val;
    }

    return {
      class: [""],
      fields: [
        {
          id: `pilgrimage-booking-new-heading-traveler-${num}`,
          label: `Traveler ${num}`,
          type: "h4",
          description: "h4 text",
          htmlType: 1,
          class: [["col-12"], ["mt-3 mb-3"]]
        },
        {
          id: `pilgrimage-booking-new-heading-name-${num}`,
          keyName: `pilgrimageBookingNewTravelerName_${num}`,
          label: "Traveller name",
          type: "text",
          description: "input with label text",
          htmlType: 4,
          value: obs ? dispatched(`pilgrimageBookingNewTravelerName_${num}`, obs.name) : "",
          htmlFor: `pilgrimage-booking-new-traveler-name-for-${num}`,
          placeholder: "",
          class: [["col-3"]]
        },
        {
          id: `pilgrimage-booking-new-gender-${num}`,
          label: "Gender",
          type: "radio",
          name: `pilBookGender_${num}`,
          description: "input with label text",
          htmlType: 6,
          value: obs ? dispatched(`pilgrimageBookingNewGender_${num}`, obs.gender) : "",
          keyName: `pilgrimageBookingNewGender_${num}`,
          class: [["col-3"]],
          fields: [
            {
              id: `pilgrimage-booking-new-gender-male-${num}`,
              label: "Male",
              value: `pilBookGenderMale_${num}`,
              htmlFor: `pilgrimage-booking-new-gender-male-for-${num}`,
            },
            {
              id: `pilgrimage-booking-new-gender-female-${num}`,
              label: "Female",
              value: `pilBookGenderFemale_${num}`,
              htmlFor: `ppilgrimage-booking-new-gender-female-for-${num}`,
            }
          ]
        },
        {
          id: `pilgrimage-booking-new-mobile-number-${num}`,
          label: "Mobile Number",
          type: "text",
          keyName: `pilgrimageBookingNewMobileNumber_${num}`,
          actualType: "number",
          description: "input with label text",
          htmlType: 4,
          value: obs ? dispatched(`pilgrimageBookingNewMobileNumber_${num}`, obs.mobile) : "",
          htmlFor: `pilgrimage-booking-new-mobile-number-for-${num}`,
          placeholder: "",
          class: [["col-3"]]
        },
        {
          id: `pilgrimage-booking-new-email-id-${num}`,
          label: "Email ID",
          type: "email",
          keyName: `pilgrimageBookingNewEmailId_${num}`,
          description: "input with label text",
          htmlType: 4,
          value: obs ? dispatched(`pilgrimageBookingNewEmailId_${num}`, obs.email) : "",
          htmlFor: `pilgrimage-booking-new-email-id-for-${num}`,
          placeholder: "",
          class: [["col-3"]]
        },
        {
          id: `pilgrimage-booking-new-upload-visa-${num}`,
          label: "Upload Visa",
          type: "file",
          keyName: `pilgrimageBookingNewUploadVisa_${num}`,
          description: "input with label text",
          htmlType: 4,
          value: null,
          htmlFor: `pilgrimage-booking-new-upload-visa-for-${num}`,
          class: [["col-3"]]
        },
        {
          id: `pilgrimage-booking-new-upload-passport-${num}`,
          label: "Upload Passport",
          type: "file",
          keyName: `pilgrimageBookingNewUploadPassport_${num}`,
          description: "input with label text",
          htmlType: 4,
          value: null,
          htmlFor: `pilgrimage-booking-new-upload-passport-for-${num}`,
          class: [["col-3"]]
        },
        {
          id: `pilgrimage-booking-new-upload-medical-${num}`,
          label: "Upload Medical",
          type: "file",
          keyName: `pilgrimageBookingNewUploadMedical_${num}`,
          description: "input with label text",
          htmlType: 4,
          value: null,
          htmlFor: `pilgrimage-booking-new-upload-medical-for-${num}`,
          class: [["col-3"]]
        },
      ]
    }
  }

  const createEditObj = (oneRecord) => {
    const {
      pilBookPackageName,
      pilBookFromDate,
      pilBookToDate,
      pilBookTravelersList
    } = oneRecord;
    obj.content[0].fields[0].label = 'Edit Piligrimage Booking';
    obj.content[0].fields[1].entity[1].label = 'Update Booking';   
    let getContent = [...obj.content];
    const lastContent = getContent.pop();
    getContent.pop();
    getContent[1].fields[0].value = pilBookPackageName || '';
    dispatch(updateVendorsFunc({ componentName: 'PilgrimageBookingNew', keyName: 'pilgrimageBookingId', value: oneRecord._id || '' }));
    dispatch(updateVendorsFunc({ componentName: 'PilgrimageBookingNew', keyName: getContent[1].fields[0].keyName, value: pilBookPackageName || '' }));
    if (pilBookFromDate) {
      getContent[1].fields[1].value = new Date(Number(pilBookFromDate.split('-')[2]), Number(pilBookFromDate.split('-')[1]) - 1, Number(pilBookFromDate.split('-')[0]));
      dispatch(updateVendorsFunc({ componentName: 'PilgrimageBookingNew', keyName: getContent[1].fields[1].keyName, value: pilBookFromDate || '' }));
    }
    if (pilBookToDate) {
      getContent[1].fields[2].value = new Date(Number(pilBookToDate.split('-')[2]), Number(pilBookToDate.split('-')[1]) - 1, Number(pilBookToDate.split('-')[0]));
      dispatch(updateVendorsFunc({ componentName: 'PilgrimageBookingNew', keyName: getContent[1].fields[2].keyName, value: pilBookToDate || '' }));
    }
    let mainArr = [];
    for (let i = 0; i < pilBookTravelersList.length; i++) {
      mainArr.push(rawTraveler(i + 1, pilBookTravelersList[i]));
    }
    return { ...obj, content: [...getContent, ...mainArr, lastContent] };
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const { PilgrimageBookingNew } = useSelector(state => state.vendors);

  const objLength = Object.keys(PilgrimageBookingNew).length;

  const forceReset = (obj) => {
    obj.content[0].fields[0].label = 'New Piligrimage Booking';
    obj.content[0].fields[1].entity[1].label = 'Book';
    obj.content[1].fields[0].value = '';
    obj.content[1].fields[1].value = null;
    obj.content[1].fields[2].value = null;
    obj.content[0].fields[1].entity[1].class[0][1] = '';
    return { ...obj };
  }

  let renderWith = {};
  if (state?.data && !objLength) {
    renderWith = createEditObj(state.data);
  } else if (state === 'createNewPilgrimageBooking') {
    let getForceReset = forceReset(obj);
    renderWith = { ...obj, content: [getForceReset] };
  } else {
    renderWith = obj;
  }


  // const renderWith = state?.data && !objLength ? createEditObj(state.data) : forceReset(obj);  
  const [ob, setOb] = useState({ ...renderWith });
  const [loading, setLoading] = useState(false);
  const [travelerNumber, setTravelerNumber] = useState(state?.data && !objLength ? state.data.pilBookTravelersList.length : 1);
  



  const base64ToFile = (base64String, fileName, mimeType) => {
    // Decode Base64 string
    const byteString = atob(base64String.split(",")[1]);

    // Create an ArrayBuffer and populate it with binary data
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: mimeType });

    // Create a File object
    return new File([blob], fileName, { type: mimeType });
  };

  const attachFileToInput = (base64String, fileName, mimeType, inputElementId) => {
    // Convert Base64 string to a File object
    const file = base64ToFile(base64String, fileName, mimeType);

    // Create a DataTransfer object
    const dataTransfer = new DataTransfer();

    // Append the file to the DataTransfer object
    dataTransfer.items.add(file);

    // Assign the FileList to the input element
    const fileInput = document.getElementById(inputElementId);
    fileInput.files = dataTransfer.files;
  };

  const bookPackagesAPICall = async (payload, num) => {
    setLoading(true);
    let response = await handleAPIData('POST', '/api/vendors', payload);
    if (response.status === 'success' && (response.data.created || response.data.updated)) {
      toast.success(response.data.message, toastOptions);
      history.push('/vendors/pilgrimage-booking-list');
    } else if (response.status === 'success' && response.data.notUpdated) {
      toast.info(response.data.message, toastOptions);
    } else if (response.status === 'error' && response.message) {
      toast.error(response.message, toastOptions);
    } else {
      toast.error('Something went wrong. Please try again.', toastOptions);
    }
    dispatch(resetVendorsComponentFunc({ componentName: 'PilgrimageBookingNew' }));
    setLoading(false);
    setTravelerNumber(num);
  }

  const caughtDataOnClick = (catchData) => {
    let getContent = [...ob.content];
    const lastContent = getContent.pop();
    if (catchData === 'pilgrimageBookingNewAddNewTravelerBtn') {
      const mainObj = rawTraveler(getContent.length - 2);
      setTravelerNumber(getContent.length - 2);
      setOb({ ...ob, content: [...getContent, mainObj, lastContent] });
    } else if (catchData === 'pilgrimageBookingNewDeleteBtn') {
      if (getContent.length > 4) {
        getContent.pop();
        setTravelerNumber(getContent.length - 3);
        setOb({ ...ob, content: [...getContent, lastContent] });
      }
    } else if (catchData === 'pilgrimageBookingNewResetBtn') {
      dispatch(resetVendorsComponentFunc({ componentName: 'PilgrimageBookingNew' }));
      setOb(forceReset(obj));
    } else if (catchData === 'pilgrimageBookingNewBookBtn') {
      let travelNumber = travelerNumber;

      if (Object.keys(PilgrimageBookingNew).length > 0) {
        const {
          pilgrimageBookingId,
          pilgrimageBookingNewPackage,
          pilgrimageBookingNewFromDate,
          pilgrimageBookingNewToDate
        } = PilgrimageBookingNew;

        const array = Array.from({ length: travelNumber }, (_, i) => i + 1);
        let pilBookTravelersList = [];
        let count = 0;
        let pilBookDocumentStatus = '';
        for (let i = 0; i < array.length; i++) {

          const filesDescribe = (visa, passport, medical) => {
            let arr = [];
            let noArr = [];
            const defaultStr = 'related documents yet to upload';
            if (visa) {
              arr.push('Visa');
            } else {
              noArr.push('Visa');
            }
            if (passport) {
              arr.push('Passport');
            } else {
              noArr.push('Passport');
            }
            if (medical) {
              arr.push('Medical');
            } else {
              noArr.push('Medical');
            }
            const str1 = arr.length ? arr.join(', ') : '';
            let str2 = '';
            if (arr.length === 0) str2 = '*None of the documents are uploaded';
            if (arr.length === 3) str2 = '';
            if (arr.length === 1 || arr.length === 2) str2 = `*${noArr.join(', ')} ${defaultStr}`
            return { str1, str2 };
          }

          const o = {
            number: array[i],
            name: PilgrimageBookingNew[`pilgrimageBookingNewTravelerName_${array[i]}`],
            gender: PilgrimageBookingNew[`pilgrimageBookingNewGender_${array[i]}`],
            mobile: PilgrimageBookingNew[`pilgrimageBookingNewMobileNumber_${array[i]}`],
            email: PilgrimageBookingNew[`pilgrimageBookingNewEmailId_${array[i]}`],
            visa: PilgrimageBookingNew[`pilgrimageBookingNewUploadVisa_${array[i]}`],
            passport: PilgrimageBookingNew[`pilgrimageBookingNewUploadPassport_${array[i]}`],
            medical: PilgrimageBookingNew[`pilgrimageBookingNewUploadMedical_${array[i]}`],
          };

          const { str1, str2 } = filesDescribe(o.visa, o.passport, o.medical);
          o.yesFiles = str1;
          o.noFiles = str2;

          count = o.visa ? count + 1 : count;
          count = o.passport ? count + 1 : count;
          count = o.medical ? count + 1 : count;

          // any block is empty          
          if (o.number && !o.name && !o.gender && !o.mobile && !o.email && !o.visa && !o.passport && !o.medical) {
            travelNumber = travelNumber - 1;
          } else {
            pilBookTravelersList.push(o);
          }
        }

        if (count === 0) {
          pilBookDocumentStatus = 'No Documents';
        } else if (count === travelNumber * 3) {
          pilBookDocumentStatus = 'Complete Documents';
        } else {
          pilBookDocumentStatus = 'Partial Documents';
        }
        
        if (!pilgrimageBookingNewPackage) {
          toast.info('Please select Package', toastOptions);
          return;
        } else if (!pilgrimageBookingNewFromDate) {
          toast.info('Please select From Date', toastOptions);
          return;
        } else if (!pilgrimageBookingNewToDate) {
          toast.info('Please select To Date', toastOptions);
          return;
        } else if (pilBookTravelersList.length === 0) {          
          toast.info('Please fill user details fields. Files are optional.', toastOptions);
          return;
        } else if (pilBookTravelersList.length > 0) {
          for (let k = 0; k < pilBookTravelersList.length; k++) {
            if (!pilBookTravelersList[k].name) {
              toast.info('Please fill Traveler Name', toastOptions);
              return;
            } else if (!pilBookTravelersList[k].gender) {
              toast.info('Please select Gender', toastOptions);
              return;
            } else if (!pilBookTravelersList[k].mobile) {
              toast.info('Please fill Mobile Number', toastOptions);
              return;
            } else if (pilBookTravelersList[k].mobile) {
              const intlMobilePattern = /^\+?[1-9]\d{1,14}$/; 
              if (!intlMobilePattern.test(pilBookTravelersList[k].mobile)) {
                toast.info('Please fill valid Mobile Number', toastOptions);
                return;
              }
            } else if (!pilBookTravelersList[k].email) {
              toast.info('Please fill Email', toastOptions);
              return;
            } else if (pilBookTravelersList[k].email) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(pilBookTravelersList[k].email)) {
                toast.info('Please fill valid Email ID', toastOptions);
                return;
              }
            }
          }
        }

        const payload = {
          type: 'PILGRIMAGE_BOOKING_CREATE',
          pilBookVendorName: pilBookTravelersList[0].name,
          pilBookMobile: pilBookTravelersList[0].mobile,
          pilBookEmail: pilBookTravelersList[0].email,
          pilBookDocumentStatus,
          pilBookStatus: 'Active',
          pilBookVendorCount: travelNumber,
          pilBookPackageName: pilgrimageBookingNewPackage,
          pilBookFromDate: pilgrimageBookingNewFromDate,
          pilBookToDate: pilgrimageBookingNewToDate,
          pilBookTravelersList
        }

        if (pilgrimageBookingId) {
          payload.pilgrimageBookingId = pilgrimageBookingId;
          payload.type = 'PILGRIMAGE_BOOKING_UPDATE';

        }
        bookPackagesAPICall(payload, travelNumber);
      } else {
        toast.info('Please fill the fields.', toastOptions);
      }
    } else if (catchData === 'pilgrimageBookingNewBackBtn') {
      dispatch(resetVendorsComponentFunc({ componentName: 'PilgrimageBookingNew' }));
      history.push('/vendors/pilgrimage-booking-list');
    }
  }

  useEffect(() => {
    if (state?.data && !objLength && state?.data.pilBookTravelersList.length > 0) {
      for (let i = 0; i < state.data.pilBookTravelersList.length; i++) {
        const checkFiles = ['visa', 'passport', 'medical'];
        for (let j = 0; j < checkFiles.length; j++) {
          if (state.data.pilBookTravelersList[i][checkFiles[j]]) {
            const dataURL = state.data.pilBookTravelersList[i][checkFiles[j]].dataURL;
            const fileName = state.data.pilBookTravelersList[i][checkFiles[j]].fileName;
            const fileType = state.data.pilBookTravelersList[i][checkFiles[j]].fileType;
            const fileId = `pilgrimage-booking-new-upload-${checkFiles[j]}-${i + 1}`;
            const pascal = checkFiles[j].charAt(0).toUpperCase() + checkFiles[j].slice(1);
            const keyName = `pilgrimageBookingNewUpload${pascal}_${i + 1}`;
            dispatch(updateVendorsFunc({ componentName: 'PilgrimageBookingNew', keyName, value: { dataURL, fileName, fileType } }));
            attachFileToInput(dataURL, fileName, fileType, fileId);
          }
        }
      }
    }
  }, []);

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
              <div key={`pil-booking-new-${ind}`} className={`row ${o.class[0]}`}>
                {
                  Array.isArray(o.fields) && o.fields.length > 0 && o.fields.map((field, index) => {
                    return (
                      <React.Fragment key={`pil-booking-new-field-${index}`}>
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

export default PilgrimageBookingNew;