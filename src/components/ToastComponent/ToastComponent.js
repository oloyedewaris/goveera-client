import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastComponent = () => {
  return (
    <ToastContainer
      position='bottom-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default ToastComponent