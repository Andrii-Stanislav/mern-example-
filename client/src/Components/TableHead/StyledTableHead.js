import styled from 'styled-components'
import { colors } from '../../styles/variables'

import { StyledTableRow } from '../TableRow/StyledTableRow'

// props {checkBox, columns}
const StyledTableHead = styled(StyledTableRow)`
  position: relative;
  background-color: ${colors.white};
  font-weight: 500;
  color: ${colors.darkBlue};
  box-shadow: 0px 4px 15px rgba(0, 74, 173, 0.1);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  & > * {
    padding: 12.5px 0 16.5px 30px;
  }
`

export default StyledTableHead
