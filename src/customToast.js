import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const Banner = ({ children }) => <div>{children}</div>;

function CustomToastComponent() {
  return (
    <ToastContainer
      transition={Slide}
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      style={{ zIndex: 10000 }}
      limit={1}
      theme="colored"  // Added for better styling
    />
  );
}

const iconStyles = {
  marginRight: '8px',
  fontSize: '20px'
};

function customToast(message, type) {
  const toastContent = (
    <Banner>
      {type === 'info' && <InfoIcon sx={iconStyles} />}
      {type === 'success' && <CheckIcon sx={iconStyles} />}
      {type === 'warn' && <WarningIcon sx={iconStyles} />}
      {type === 'error' && <ErrorIcon sx={iconStyles} />}
      {message}
    </Banner>
  );

  const toastOptions = {
    icon: false,  // We're handling icons ourselves
    autoClose: 1000,
    hideProgressBar: false
  };

  switch (type) {
    case 'info':
      toast.info(toastContent, toastOptions);
      break;
    case 'success':
      toast.success(toastContent, toastOptions);
      break;
    case 'warn':
      toast.warning(toastContent, toastOptions);  // Note: 'warn' changed to 'warning'
      break;
    case 'error':
      toast.error(toastContent, toastOptions);
      break;
    default:
      toast(toastContent, toastOptions);
      break;
  }
}

export { CustomToastComponent, customToast };