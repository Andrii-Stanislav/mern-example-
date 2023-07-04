import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StyledTableHead from './StyledTableHead';
import Checkbox from '../Checkbox';
import SortDir from '../SortDir';

import { filterChanged } from '../../redux/table-data/table-data-actions';
import tableSelectors from '../../redux/table-data/table-data-selectors';
import tableOperations from '../../redux/table-data/table-data-operations';
import filterSelectors from '../../redux/filter/filter-selectors';
import {
  changeSortField,
  changeSortDirGrow,
} from '../../redux/filter/filter-actions';

const titleWithoutOrder = ['checkBox', 'Action'];

function TableHead({ titles }) {
  const checked = useSelector(tableSelectors.isCheckAllRows);
  const sortField = useSelector(filterSelectors.sortField);
  const sortDirGrow = useSelector(filterSelectors.sortDirGrow);
  const tableData = useSelector(tableSelectors.tableData);

  const dispatch = useDispatch();

  const handleCheckAllRows = ({ target }) => {
    dispatch(
      tableOperations.checkAllRows({
        checked: target.checked,
        tableData: tableData,
      }),
    );
  };

  const changeOrder = ({ target }) => {
    if (sortField === target.textContent) {
      dispatch(changeSortDirGrow(!sortDirGrow));
    } else {
      dispatch(changeSortField(target.textContent));
      dispatch(changeSortDirGrow(true));
    }
    dispatch(filterChanged(Date.now()));
  };

  return (
    <StyledTableHead
      checkBox={titles.includes('checkBox')}
      columns={titles.length}
    >
      {titles.map(title => {
        if (!titleWithoutOrder.includes(title)) {
          const direction = () => {
            if (title !== sortField) {
              return;
            }
            return sortDirGrow ? 'up' : 'down';
          };
          return (
            <SortDir
              key={title}
              onClick={changeOrder}
              title={title}
              direction={direction()}
            />
          );
        } else if (title === 'checkBox') {
          return (
            <div key={title}>
              <Checkbox onChange={handleCheckAllRows} checked={checked} />
            </div>
          );
        } else {
          return <div key={title}>{title}</div>;
        }
      })}
    </StyledTableHead>
  );
}

export default TableHead;
