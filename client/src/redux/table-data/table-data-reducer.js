import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
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
} from './table-data-actions'

const tableData = createReducer([], {
  [fetchTableDataSuccess]: (_, { payload }) => payload.data,
  [deleteLicensesSuccess]: (state, { payload }) => [
    ...state.filter(rowData => !payload.arrLicenses.includes(`${rowData.Id}`)),
  ],
  [deleteSubPartnersSuccess]: (state, { payload }) => [
    ...state.filter(rowData => !payload.arrUsersId.includes(`${rowData.Id}`)),
  ],
  // [setFilteredTable]: (state, { payload }) => payload,
  [checkTableRow]: (state, { payload }) => {
    const updatedState = state.map(rowData =>
      Number(rowData.Id) === Number(payload.Id)
        ? { ...rowData, checked: payload.checked }
        : rowData
    )
    return [...updatedState]
  },
  [checkAllTableRows]: (state, { payload }) => [
    ...state.map(rowData => ({ ...rowData, checked: payload.checked })),
  ],
  [changeLicensesStatusRequest]: (state, { _ }) => [
    ...state.map(rowData => ({ ...rowData, checked: false })),
  ],
  //  status, checkedRows
  [changeLicensesStatusSuccess]: (state, { payload }) => [
    ...state.map(rowData =>
      payload.checkedRows.includes(`${rowData.Id}`)
        ? { ...rowData, Status: payload.status }
        : { ...rowData }
    ),
  ],
  [changeSubPartnersStatusRequest]: (state, { _ }) => [
    ...state.map(rowData => ({ ...rowData, checked: false })),
  ],
  [changeSubPartnersStatusSuccess]: (state, { payload }) => [
    ...state.map(rowData =>
      payload.checkedRows.includes(`${rowData.Id}`)
        ? { ...rowData, Status: payload.status }
        : rowData
    ),
  ],
  [updateSubPartnersLicensesSuccess]: (state, { payload }) => [
    ...state.map(rowData =>
      rowData.Id === payload.id
        ? { ...rowData, Licenses: payload.licenses }
        : rowData
    ),
  ],
  [upgradeLicensesPlanSuccess]: (state, { payload }) => [
    ...state.map(rowData =>
      rowData.Id === Number(payload.id)
        ? { ...rowData, Plan: payload.plan.name }
        : rowData
    ),
  ],
})

const downloadData = createReducer([], {
  [downloadTableDataSuccess]: (_, { payload }) => payload,
})

const checkedData = createReducer([], {
  [checkTableRow]: (state, { payload }) =>
    payload.checked
      ? [...state, payload.Id]
      : [...state.filter(rowId => Number(rowId) !== Number(payload.Id))],
  [checkAllTableRows]: (_, { payload }) =>
    payload.checked ? payload.tableData.map(rowData => `${rowData.Id}`) : [],
  [deleteLicensesSuccess]: (_, __) => [],
  [deleteSubPartnersSuccess]: (_, __) => [],
  [changeLicensesStatusRequest]: (_, __) => [],
  [changeSubPartnersStatusRequest]: (_, __) => [],
})

const total = createReducer(1, {
  [fetchTableDataSuccess]: (_, { payload }) => payload.total,
  [deleteLicensesSuccess]: (state, { payload }) =>
    state - payload.arrLicenses.length,
  [deleteSubPartnersSuccess]: (state, { payload }) =>
    state - payload.arrUsersId.length,
})

const totalPages = createReducer(1, {
  [fetchTableDataSuccess]: (_, { payload }) => payload.totalPages,
})

const allApps = createReducer([], {
  [fetchTableDataSuccess]: (_, { payload }) => payload.allApps,
})

const licensesPlans = createReducer(1, {
  [fetchTableDataSuccess]: (_, { payload }) => payload.licensesPlans,
})

const loading = createReducer(false, {
  [fetchTableDataRequest]: () => true,
  [fetchTableDataSuccess]: () => false,
  [fetchTableDataError]: () => false,
  [downloadTableDataRequest]: () => true,
  [downloadTableDataSuccess]: () => false,
  [downloadTableDataError]: () => false,
  [addLicenseRequest]: () => true,
  [addLicenseSuccess]: () => false,
  [addLicenseError]: () => false,
  [addSubPartnerRequest]: () => true,
  [addSubPartnerSuccess]: () => false,
  [addSubPartnerError]: () => false,
  [deleteLicensesRequest]: () => true,
  [deleteLicensesSuccess]: () => false,
  [deleteLicensesError]: () => false,
  [changeLicensesStatusRequest]: () => true,
  [changeLicensesStatusSuccess]: () => false,
  [changeLicensesStatusError]: () => false,
  [upgradeLicensesPlanRequest]: () => true,
  [upgradeLicensesPlanSuccess]: () => false,
  [upgradeLicensesPlanError]: () => false,
  [changeSubPartnersStatusRequest]: () => true,
  [changeSubPartnersStatusSuccess]: () => false,
  [changeSubPartnersStatusError]: () => false,
  [updateSubPartnersLicensesRequest]: () => true,
  [updateSubPartnersLicensesSuccess]: () => false,
  [updateSubPartnersLicensesError]: () => false,
  [deleteSubPartnersRequest]: () => true,
  [deleteSubPartnersSuccess]: () => false,
  [deleteSubPartnersError]: () => false,
})

const error = createReducer(null, {
  [resetTableDataError]: (_, __) => null,
  [fetchTableDataError]: (_, { payload }) => payload,
  [downloadTableDataError]: (_, { payload }) => payload,
  [addLicenseError]: (_, { payload }) => payload,
  [addSubPartnerError]: (_, { payload }) => payload,
  [deleteLicensesError]: (_, { payload }) => payload,
  [changeLicensesStatusError]: (_, { payload }) => payload,
  [upgradeLicensesPlanError]: (_, { payload }) => payload,
  [changeSubPartnersStatusError]: (_, { payload }) => payload,
  [updateSubPartnersLicensesError]: (_, { payload }) => payload,
  [deleteSubPartnersError]: (_, { payload }) => payload,
})

const filterHasChanged = createReducer(Date.now(), {
  [filterChanged]: (_, { payload }) => payload,
})

export default combineReducers({
  tableData,
  downloadData,
  checkedData,
  total,
  totalPages,
  allApps,
  licensesPlans,
  loading,
  error,
  filterHasChanged,
})
