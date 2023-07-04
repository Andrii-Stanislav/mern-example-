import styled from 'styled-components';

// props {checked, index, firstData, lastData}
const StyledGridData = styled.div`
  color: ${props =>
    props.checked
      ? '#805928;'
      : `${props.index % 2 === 0 ? '#E8F3FE' : '#F3F9FF'}`};
  background-color: ${props => (props.checked ? '#fff' : '')};

  border-top: ${props =>
    props.checked ? '1px solid #f1b750' : '1px solid transparent'};
  border-bottom: ${props =>
    props.checked ? '1px solid #f1b750' : '1px solid transparent'};
  border-left: ${props =>
    props.firstData
      ? props.checked
        ? '1px solid #f1b750'
        : '1px solid transparent'
      : '1px solid transparent'};
  border-right: ${props =>
    props.lastData
      ? props.checked
        ? '1px solid #f1b750'
        : '1px solid transparent'
      : '1px solid transparent'};

  padding: 12.5px 0 16.5px 30px;
  transition: all 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export default StyledGridData;
