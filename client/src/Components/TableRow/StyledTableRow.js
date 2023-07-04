import styled from 'styled-components'
import { colors } from '../../styles/variables'
// props {checkBox, columns, index, checked, inactive}
const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.checkBox
      ? `80px repeat(${props.columns - 1}, 1fr)`
      : `repeat(${props.columns}, 1fr)`};
  background-color: ${props =>
    props.checked ? '#e7f4ff' : props.index % 2 === 0 ? '#F6FBFF' : '#FDFEFF'};

  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.checked ? '#004AAD' : 'transparent')};
  width: 100%;

  color: ${props => (props.inactive ? `${colors.lightGrey}` : 'inherit')};
  ${props =>
    props.inactive &&
    `& select {
      pointer-events: none;
    }`}

  font-weight: 400;
  font-size: 14px;
  line-height: 1.17;
  transition: all 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
`
const TableData = styled.div`
  padding: 12.5px 0 16.5px 30px;
  overflow-x: hidden;
  color: ${props => {
    switch (props.color) {
      case 'green':
        return '#27ae60'
      default:
        return 'inherit'
    }
  }};
`

const HiddenData = styled.span`
  cursor: pointer;
`

const HoveredEmail = styled.div`
  padding: 12px 16px;

  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 74, 173, 0.18);
  border-radius: 16px;
  color: ${colors.darkBlue};
`

export { StyledTableRow, TableData, HiddenData, HoveredEmail }

// color: ${props => {switch (props.color) {

// }}}
