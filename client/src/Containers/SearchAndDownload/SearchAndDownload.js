import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from '../../Components/Button'
import Input from '../../Components/Input'

import Search from '../../Components/svg/Search'
import Download from '../../Components/svg/Download'

import styles from './SearchAndDownload.module.css'
// import useDebouncedFunction from '../../Hooks/useDebouncedFunction'
import routes from '../../routes'
import tableTitles from '../../constants/tableTitles'
import downloadCSV from '../../services/csv'

import {
  changeTextInputFilter,
  changePage,
} from '../../redux/filter/filter-actions'
import { filterChanged } from '../../redux/table-data/table-data-actions'
import tableOperations from '../../redux/table-data/table-data-operations'
import tableSelectors from '../../redux/table-data/table-data-selectors'

function SearchAndDownload() {
  const [inputValue, setInputValue] = useState('')

  const dispatch = useDispatch()
  // const debouncedValueLogging = useDebouncedFunction(newValue => {
  //   dispatch(changeTextInputFilter(newValue))
  //   dispatch(changePage(1))
  //   dispatch(filterChanged(Date.now()))
  // }, 300)

  const heandleInputChange = ({ target }) => {
    setInputValue(target.value)
    // debouncedValueLogging(target.value)
  }

  const searchQuery = () => {
    dispatch(changeTextInputFilter(inputValue))
    dispatch(changePage(1))
    dispatch(filterChanged(Date.now()))
  }

  let history = useHistory()
  const downloadCsvFile = () => {
    dispatch(tableOperations.downloadTableData())
  }
  const downloadData = useSelector(tableSelectors.downloadData)
  useEffect(() => {
    if (downloadData.length > 0) {
      const titles = Object.entries(routes).find(route => {
        return route[1] === history.location.pathname
      })[0]
      const tableNames = tableTitles[titles].filter(
        title => title !== 'checkBox'
      )
      downloadCSV(tableNames, downloadData)
      dispatch(tableOperations.clearDownloadData())
    }
  }, [downloadData, history, dispatch])

  return (
    <div className={styles.container}>
      <Input
        value={inputValue}
        onChange={heandleInputChange}
        type="text"
        placeholder="Enter a keyword"
        maxWidth="220px"
      />
      <Button
        onClick={searchQuery}
        bgColor="darkBlue"
        icon={<Search />}
      ></Button>
      <Button
        bgColor="darkBlue"
        icon={<Download />}
        onClick={downloadCsvFile}
        width="185px"
      >
        Download CSV
      </Button>
    </div>
  )
}

export default SearchAndDownload
