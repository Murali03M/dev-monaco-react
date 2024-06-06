// src/components/NotificationProvider.js

import { ToastContainer } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

const NotificationProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
           position="bottom-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
            theme="dark"
         />


    </>
  );
};


export default NotificationProvider;
