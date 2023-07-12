import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
    const toastDark = () => toast.dark('This is Toast Notification for Dark');
    const toastInfo = () => toast.info('This is Toast Notification for Info');
    const toastSuccess = () => toast.success('This is Toast Notification for Success');
    const toastWarn = () => toast.warn('This is Toast Notification for Warn');
    const toastError = () => toast.error('This is Toast Notification for Error');
  return (
    <div>
      <h3>Toast Notification in React </h3>
      <button className="btn" onClick={toastDark}>Toast Notification for  - Dark</button><br />
      <button className="btn" onClick={toastInfo}>Toast Notification for  - Info</button><br />
      <button className="btn" onClick={toastSuccess}>Toast Notification for  - Success</button><br />
      <button className="btn" onClick={toastWarn}>Toast Notification for  - Warn</button><br />
      <button className="btn" onClick={toastError}>Toast Notification for  - Error</button>
      
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
        theme='light'
      />
    </div>
  )
}

export default ToastNotification
