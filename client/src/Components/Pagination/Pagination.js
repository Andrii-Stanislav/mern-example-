import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import tableSelectors from '../../redux/table-data/table-data-selectors'
import filterSelectors from '../../redux/filter/filter-selectors'
import { changePage } from '../../redux/filter/filter-actions'
import { filterChanged } from '../../redux/table-data/table-data-actions'

import Pagination from '@material-ui/lab/Pagination'
import './Pagination.css'

export default function PaginationButtons() {
  const dispatch = useDispatch()

  const page = useSelector(filterSelectors.page)
  const totalPages = useSelector(tableSelectors.totalPages)
  const isLoading = useSelector(tableSelectors.isLoading)

  const changedPage = (_, page) => {
    dispatch(changePage(page))
    dispatch(filterChanged(Date.now()))
  }

  return (
    <Pagination
      page={page}
      count={totalPages}
      onChange={changedPage}
      color="primary"
      showFirstButton
      showLastButton
      variant="outlined"
      shape="rounded"
      disabled={isLoading}
    />
  )
}
