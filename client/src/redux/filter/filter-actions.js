import { createAction } from '@reduxjs/toolkit';

export const changeTextInputFilter = createAction('filter/textInputChanged');
export const changeSortField = createAction('filter/sortFieldChanged');
export const changeSortDirGrow = createAction('filter/sortDirChanged');
export const filterByApp = createAction('filter/appChanged');
export const changePage = createAction('filter/pageChanged');
export const changeTable = createAction('filter/tableChanged');
export const changeDateStart = createAction('filter/startDateChanged');
export const changeDateEnd = createAction('filter/endDateChanged');
