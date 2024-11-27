import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';

export const defaultPackages = {
  package1: 'Package 1',
  package2: 'Package 2',
  package3: 'Package 3'
};

export const formatDate = (dateString) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [day, month, year] = dateString.split("-");
  const monthAbbreviation = months[parseInt(month, 10) - 1];
  return `${day}-${monthAbbreviation}-${year}`;
};

export const responseHandler = (response) => {
  let returned;
  if (response.status === 'success' && response.data.failed) {
    toast.success(response.data.message, toastOptions);
  } else if (response.status === 'success' && response.data.data.length > 0) {
    // createResponse(response.data.data);
    returned = response.data.data;
  } else if (response.status === 'error' && response.message) {
    toast.error(response.message, toastOptions);
  } else {
    toast.error('Something went wrong. Please try again.', toastOptions);
  }
  return returned;
};