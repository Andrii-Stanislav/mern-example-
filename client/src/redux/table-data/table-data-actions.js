import { createAction } from '@reduxjs/toolkit'

const resetTableDataError = createAction('auth/resetTableDataError')

const fetchTableDataRequest = createAction('table/fetchRequest')
const fetchTableDataSuccess = createAction('table/fetchSuccess')
const fetchTableDataError = createAction('table/fetchError')
//
const downloadTableDataRequest = createAction('table/downloadRequest')
const downloadTableDataSuccess = createAction('table/downloadSuccess')
const downloadTableDataError = createAction('table/downloadError')
//
const addLicenseRequest = createAction('table/addLicenseRequest')
const addLicenseSuccess = createAction('table/addLicenseSuccess')
const addLicenseError = createAction('table/addLicenseError')
//
const addSubPartnerRequest = createAction('table/addSubPartnerRequest')
const addSubPartnerSuccess = createAction('table/addSubPartnerSuccess')
const addSubPartnerError = createAction('table/addSubPartnerError')
//
const deleteLicensesRequest = createAction('table/deleteLicensesRequest')
const deleteLicensesSuccess = createAction('table/deleteLicensesSuccess')
const deleteLicensesError = createAction('table/deleteLicensesError')
//
const upgradeLicensesPlanRequest = createAction(
  'table/upgradeLicensesPlanRequest'
)
const upgradeLicensesPlanSuccess = createAction(
  'table/upgradeLicensesPlanSuccess'
)
const upgradeLicensesPlanError = createAction('table/upgradeLicensesPlanError')
//
const changeLicensesStatusRequest = createAction(
  'table/changeLicensesStatusRequest'
)
const changeLicensesStatusSuccess = createAction(
  'table/changeLicensesStatusSuccess'
)
const changeLicensesStatusError = createAction(
  'table/changeLicensesStatusError'
)
//
const changeSubPartnersStatusRequest = createAction(
  'table/changeSubPartnersStatusRequest'
)
const changeSubPartnersStatusSuccess = createAction(
  'table/changeSubPartnersStatusSuccess'
)
const changeSubPartnersStatusError = createAction(
  'table/changeSubPartnersStatusError'
)
//
const updateSubPartnersLicensesRequest = createAction(
  'table/updateSubPartnersLicensesRequest'
)
const updateSubPartnersLicensesSuccess = createAction(
  'table/updateSubPartnersLicensesSuccess'
)
const updateSubPartnersLicensesError = createAction(
  'table/updateSubPartnersLicensesError'
)
//
const deleteSubPartnersRequest = createAction('table/deleteSubPartnersRequest')
const deleteSubPartnersSuccess = createAction('table/deleteSubPartnersSuccess')
const deleteSubPartnersError = createAction('table/deleteSubPartnersError')
//
const filterChanged = createAction('table/filterChanged')
//
const checkTableRow = createAction('table/checkRow')
//
const checkAllTableRows = createAction('table/checkAllRows')
//
const setFilteredTable = createAction('table/setFilteredTable')
//
export {
  resetTableDataError,
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
  setFilteredTable,
}
