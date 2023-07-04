// import { createSelector } from '@reduxjs/toolkit';

const tableData = state => state.tableData.tableData;

const downloadData = state => state.tableData.downloadData;

const tableDataLength = state => tableData(state)?.length;

const checkedData = state => state.tableData.checkedData;

const allApps = state => state.tableData.allApps;

const licensesPlans = state => state.tableData.licensesPlans;

const isLoading = state => state.tableData.loading;

const filterChanged = state => state.tableData.filterHasChanged;

const page = state => state.tableData.page;

const total = state => state.tableData.total;

const totalPages = state => state.tableData.totalPages;

const error = state => state.tableData.error;

// const getFilteredContacts = createSelector(
//   [getTableData, getFilter],
//   (contacts, filter) =>
//     contacts.filter(
//       ({ name }) => name && name.toLowerCase().includes(filter.toLowerCase()),
//     ),
// );

const selectedRows = state =>
  tableData(state).filter(rowData => rowData.checked);

const isSelectedAnyRows = state => selectedRows(state)?.length > 0;

const isAllSelectedRowsActive = state =>
  selectedRows(state).reduce(
    (acc, rowData) => acc && rowData.Status === 'Active',
    true,
  );

const isAllSelectedRowsInactive = state =>
  selectedRows(state).reduce(
    (acc, rowData) => acc && rowData.Status === 'Inactive',
    true,
  );

const isCheckAllRows = state => {
  const currentTableData = tableData(state);
  if (currentTableData.length === 0) {
    return false;
  }
  return currentTableData.reduce((acc, rowData) => {
    return acc && rowData.checked;
  }, true);
};

const tableSelectors = {
  tableData,
  downloadData,
  tableDataLength,
  checkedData,
  allApps,
  licensesPlans,
  isLoading,
  filterChanged,
  page,
  total,
  totalPages,
  error,
  isCheckAllRows,
  selectedRows,
  isSelectedAnyRows,
  isAllSelectedRowsActive,
  isAllSelectedRowsInactive,
};

export default tableSelectors;
