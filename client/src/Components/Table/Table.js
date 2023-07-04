import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TableLoading from '../TableLoading'
import Pagination from '../Pagination'
import EmptyTable from '../EmptyTable'

import styles from './Table.module.css'
import tableSelectors from '../../redux/table-data/table-data-selectors'
import tableOperations from '../../redux/table-data/table-data-operations'

function Table({ titles }) {
  const tableData = useSelector(tableSelectors.tableData)
  const tableDataLength = useSelector(tableSelectors.tableDataLength)
  const isLoading = useSelector(tableSelectors.isLoading)

  const dispatch = useDispatch()
  const checkOneRow = ({ target }) => {
    dispatch(tableOperations.checkRow(target.name, target.checked))
  }
  const filterChanged = useSelector(tableSelectors.filterChanged)

  useEffect(() => {
    // get current tabledata
    dispatch(tableOperations.fetchFilteredTableData())
  }, [filterChanged, dispatch])

  if (!tableData) {
    return <></>
  } else {
    return (
      <>
        {isLoading && <TableLoading />}
        {!isLoading && (
          <>
            <div className={styles.table}>
              <TableHead titles={titles}></TableHead>
              {tableData.map((rowData, index) => (
                <TableRow
                  key={rowData.Id}
                  titles={titles}
                  checked={rowData.checked}
                  rowData={rowData}
                  index={index}
                  onChange={checkOneRow}
                />
              ))}
            </div>
            {tableDataLength === 0 && <EmptyTable />}
          </>
        )}
        {tableDataLength !== 0 && !isLoading && <Pagination />}
      </>
    )
  }
}

export default Table
