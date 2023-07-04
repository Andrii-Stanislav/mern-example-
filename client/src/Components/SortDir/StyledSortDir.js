import styled from 'styled-components'
import { colors } from '../../styles/variables'

const StyledSortDir = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
  // color: ${props => (props.direction ? colors.darkBlue : 'inherit')};

  &::after {
    content: '';
    position: absolute;
    left: calc(100% + 10px);
    top: 40%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    
    ${props => {
      switch (props.direction) {
        case 'up':
          return `border-bottom: 8px solid ${colors.darkBlue}`
        case 'down':
          return `border-top: 8px solid ${colors.darkBlue}`
        default:
          return `border-bottom: 8px solid ${colors.darkBlue}`
      }
    }};  
    }
  }
`

export { StyledSortDir }
