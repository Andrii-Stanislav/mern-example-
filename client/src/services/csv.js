import { writeToBuffer } from '@fast-csv/format'
import fileDownload from 'js-file-download'

const downloadCSV = (titles, tableData, fileName = 'CloudKi') => {
  const dataForDownload = [
    titles,
    ...tableData.map(rowData =>
      titles.reduce((acc, title) => [...acc, rowData[title]], [])
    ),
  ]
  writeToBuffer(dataForDownload).then(data =>
    fileDownload(data, `${fileName}.csv`)
  )
}

export default downloadCSV
