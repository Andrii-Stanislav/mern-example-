import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import authSelectors from '../../redux/auth/auth-selectors'
import { resetAuthError } from '../../redux/auth/auth-actions'
import tableSelectors from '../../redux/table-data/table-data-selectors'
import { resetTableDataError } from '../../redux/table-data/table-data-actions'

const notifyErrorOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function Error() {
  const tableError = useSelector(tableSelectors.error)
  const authError = useSelector(authSelectors.authError)

  const dispatch = useDispatch()
  useEffect(() => {
    if (authError) {
      toast.error(authError, notifyErrorOptions)
      dispatch(resetAuthError())
    }
  }, [authError, dispatch])

  useEffect(() => {
    if (tableError) {
      toast.error(tableError, notifyErrorOptions)
      dispatch(resetTableDataError())
    }
  }, [tableError, dispatch])

  return (
    <div>
      <ToastContainer newestOnTop rtl={false} pauseOnFocusLoss={false} />
    </div>
  )
}

export default Error
