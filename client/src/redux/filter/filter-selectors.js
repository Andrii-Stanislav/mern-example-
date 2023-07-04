// import { createSelector } from '@reduxjs/toolkit';

const filterText = state => state.filter.filterText;
const table = state => state.filter.table;
const page = state => state.filter.page;
const app = state => state.filter.app;
const sortField = state => state.filter.sortField;
const sortDirGrow = state => state.filter.sortDirGrow;
const startDate = state => state.filter.startDate;
const endDate = state => state.filter.endDate;

// const getFilteredContacts = createSelector(
//   [filterText, table, page, app, sortField, sortDirGrow, startDate, endDate],
//   () =>
//     contacts.filter(
//       ({ name }) => name && name.toLowerCase().includes(filter.toLowerCase()),
//     ),
// );

const filterSelectors = {
  filterText,
  table,
  page,
  app,
  sortField,
  sortDirGrow,
  startDate,
  endDate,
};

export default filterSelectors;
