import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  changeTextInputFilter,
  changeSortField,
  changeSortDirGrow,
  filterByApp,
  changePage,
  changeTable,
  changeDateStart,
  changeDateEnd,
} from './/filter-actions';

const filterText = createReducer('', {
  [changeTextInputFilter]: (_, { payload }) => payload,
});

const table = createReducer('extensions', {
  [changeTable]: (_, { payload }) => payload,
});

const page = createReducer(1, {
  [changePage]: (_, { payload }) => payload,
});

const app = createReducer('', {
  [filterByApp]: (_, { payload }) => payload,
});

const sortField = createReducer(null, {
  [changeSortField]: (_, { payload }) => payload,
});

const sortDirGrow = createReducer(null, {
  [changeSortDirGrow]: (_, { payload }) => payload,
});

const startDate = createReducer('', {
  [changeDateStart]: (_, { payload }) => payload,
});

const endDate = createReducer('', {
  [changeDateEnd]: (_, { payload }) => payload,
});

export default combineReducers({
  filterText,
  table,
  page,
  app,
  sortField,
  sortDirGrow,
  startDate,
  endDate,
});
