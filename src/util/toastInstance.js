import { toast } from 'react-toastify'

const toastInstance = (text, danger) =>
  toast(text, {
    style: ({ width: '100%', backgroundColor: danger && 'red', color: danger && 'white' }),
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  })

export default toastInstance;