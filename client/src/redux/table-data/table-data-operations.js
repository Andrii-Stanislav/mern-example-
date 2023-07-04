import api from '../../services/api'

import {
  fetchTableDataRequest,
  fetchTableDataSuccess,
  fetchTableDataError,
  downloadTableDataRequest,
  downloadTableDataSuccess,
  downloadTableDataError,
  addLicenseRequest,
  addLicenseSuccess,
  addLicenseError,
  addSubPartnerRequest,
  addSubPartnerSuccess,
  addSubPartnerError,
  deleteLicensesRequest,
  deleteLicensesSuccess,
  deleteLicensesError,
  changeLicensesStatusRequest,
  changeLicensesStatusSuccess,
  changeLicensesStatusError,
  upgradeLicensesPlanRequest,
  upgradeLicensesPlanSuccess,
  upgradeLicensesPlanError,
  changeSubPartnersStatusRequest,
  changeSubPartnersStatusSuccess,
  changeSubPartnersStatusError,
  updateSubPartnersLicensesRequest,
  updateSubPartnersLicensesSuccess,
  updateSubPartnersLicensesError,
  deleteSubPartnersRequest,
  deleteSubPartnersSuccess,
  deleteSubPartnersError,
  //
  filterChanged,
  checkTableRow,
  checkAllTableRows,
} from './table-data-actions'

import errorHeandler from '../../services/errorHeandler'

const fetchFilteredTableData = () => async (dispatch, getState) => {
  api.table.cancelPrevAppsRequest()

  const { filter } = getState()
  const {
    auth: { token: persistedToken },
  } = getState()

  if (!persistedToken) {
    return
  }

  api.token.set(persistedToken)
  dispatch(fetchTableDataRequest())
  try {
    const { data } = await api.table.getFiltered(filter)
    dispatch(fetchTableDataSuccess(data))
  } catch (error) {
    if (error.message === api.table.cancelMessage) {
      return
    }

    const err = errorHeandler(error)
    if (err) {
      return dispatch(fetchTableDataError(err.response?.data.message))
    }
    return dispatch(fetchTableDataError(null))
  }
}

const downloadTableData = () => async (dispatch, getState) => {
  const { filter } = getState()
  dispatch(downloadTableDataRequest())

  try {
    const { data } = await api.table.getAllForDownload(filter.table)
    dispatch(downloadTableDataSuccess(data.data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(downloadTableDataError(err.response?.data.message))
    }
    return dispatch(downloadTableDataError(null))
  }
}

const clearDownloadData = () => dispatch => {
  dispatch(downloadTableDataSuccess([]))
}

//  Licenses

const addLicense = newLicense => async dispatch => {
  dispatch(addLicenseRequest())

  try {
    const { data } = await api.table.addLicense(newLicense)
    dispatch(addLicenseSuccess(data))
    dispatch(filterChanged(Date.now()))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(addLicenseError(err.response?.data.message))
    }
    return dispatch(addLicenseError(null))
  }
}

const changeLicensesStatus =
  ({ status, checkedRows }) =>
  async dispatch => {
    dispatch(changeLicensesStatusRequest())
    try {
      await api.table.changeLicensesStatus(status, checkedRows)
      console.log({ status, checkedRows })
      dispatch(changeLicensesStatusSuccess({ status, checkedRows }))
    } catch (error) {
      const err = errorHeandler(error)
      if (err) {
        return dispatch(changeLicensesStatusError(err.response?.data.message))
      }
      return dispatch(changeLicensesStatusError(null))
    }
  }

const upgradeLicensesPlan = (name, plan, different) => async dispatch => {
  dispatch(upgradeLicensesPlanRequest())
  try {
    await api.table.upgradeLicensesPlan(name, plan)
    dispatch(upgradeLicensesPlanSuccess({ plan, id: name, different }))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(upgradeLicensesPlanError(err.response?.data.message))
    }
    return dispatch(upgradeLicensesPlanError(null))
  }
}

const deleteLicenses = arrLicenses => async dispatch => {
  dispatch(deleteLicensesRequest())
  try {
    const { data } = await api.table.deleteLicenses(arrLicenses)
    dispatch(deleteLicensesSuccess({ arrLicenses, ...data }))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(deleteLicensesError(err.response?.data.message))
    }
    return dispatch(deleteLicensesError(null))
  }
}

// Sub-Partners

/*
    const { data } = await api.table.addLicense(newLicense)
    dispatch(addLicenseSuccess(data))
    dispatch(filterChanged(Date.now()))
*/

const addSubPartner = newSubPartner => async dispatch => {
  dispatch(addSubPartnerRequest())

  try {
    const { data } = await api.table.addSubPartner(newSubPartner)
    dispatch(addSubPartnerSuccess(data))
    dispatch(filterChanged(Date.now()))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(addSubPartnerError(err.response?.data.message))
    }
    return dispatch(addSubPartnerError(null))
  }
}

const changeSubPartnrsStatus =
  ({ status, checkedRows }) =>
  async dispatch => {
    dispatch(changeSubPartnersStatusRequest())
    try {
      await api.table.changeSubPartnrsStatus(status, checkedRows)
      dispatch(changeSubPartnersStatusSuccess({ status, checkedRows }))
    } catch (error) {
      const err = errorHeandler(error)
      if (err) {
        return dispatch(
          changeSubPartnersStatusError(err.response?.data.message)
        )
      }
      return dispatch(changeSubPartnersStatusError(null))
    }
  }

const updateSubPartnersLicenses =
  ({ subPartnerId, count }) =>
  async dispatch => {
    dispatch(updateSubPartnersLicensesRequest())

    try {
      const { data } = await api.table.updateSubPartnersLicenses({
        subPartnerId,
        count,
      })
      dispatch(
        updateSubPartnersLicensesSuccess({
          id: subPartnerId,
          licenses: count,
          ...data,
        })
      )
      dispatch(filterChanged(Date.now()))
    } catch (error) {
      const err = errorHeandler(error)
      if (err) {
        return dispatch(
          updateSubPartnersLicensesError(err.response?.data.message)
        )
      }
      return dispatch(updateSubPartnersLicensesError(null))
    }
  }

const deleteSubPartners = arrUsersId => async dispatch => {
  dispatch(deleteSubPartnersRequest())
  try {
    const { data } = await api.table.deleteSubPartners(arrUsersId)
    dispatch(deleteSubPartnersSuccess({ arrUsersId, ...data }))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(deleteSubPartnersError(err.response?.data.message))
    }
    return dispatch(deleteSubPartnersError(null))
  }
}

// row events

const checkRow = (Id, checked) => async dispatch => {
  dispatch(checkTableRow({ Id, checked }))
}

const checkAllRows = checked => async dispatch => {
  dispatch(checkAllTableRows(checked))
}

const tableOperations = {
  fetchFilteredTableData,
  downloadTableData,
  clearDownloadData,

  addLicense,
  changeLicensesStatus,
  upgradeLicensesPlan,
  deleteLicenses,

  addSubPartner,
  changeSubPartnrsStatus,
  updateSubPartnersLicenses,
  deleteSubPartners,

  checkRow,
  checkAllRows,
}

export default tableOperations
