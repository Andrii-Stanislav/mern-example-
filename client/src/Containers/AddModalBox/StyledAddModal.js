import styled from 'styled-components'

import { colors } from '../../styles/variables'

const StyledContainer = styled.div`
  width: ${props => {
    switch (props.size) {
      case 'small':
        return '300px'
      case 'medium':
        return '400px'
      case 'large':
        return '800px'
      default:
        return '300px'
    }
  }};
  border-radius: 4px;
  overflow: hidden;
`

const StyledBox = styled.div`
  padding: ${props => {
    switch (props.size) {
      case 'small':
        return '0'
      case 'medium':
        return '32px'
      case 'large':
        return '24px'
      default:
        return '0'
    }
  }};
  font-size: 16px;
  line-height: 1.17;
`

const StyledHeader = styled.div`
  display: flex;
  height: ${props => {
    switch (props.size) {
      case 'small':
        return '77px'
      case 'medium':
        return '56px'
      case 'large':
        return '64px'
      default:
        return 'auto'
    }
  }};
  background-color: ${props =>
    props.bgColor === 'darkBlue' ? colors.darkBlue : '#fff'};
  border: 1px solid #e8f3fe;
  box-shadow: 0px 4px 18px rgba(0, 74, 173, 0.05);

  font-size: 20px;
  line-height: 1.17;
  padding: 32px;
  color: ${props => (props.bgColor === 'darkBlue' ? '#fff' : colors.lightBlue)};
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Margin = styled.span`
  margin-left: 10px;
`

const CloseButton = styled.div`
  position: relative;
  width: 13px;
  height: 13px;
  cursor: pointer;

  &::after,
  &::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 8px;
    display: block;
    height: 2px;
    width: 16px;
    border-radius: 1px;
    background-color: ${props =>
      props.bgColor === 'darkBlue' ? '#ffffff' : colors.darkBlue};
  }

  &::after {
    transform: rotate(45deg);
  }

  &::before {
    transform: rotate(-45deg);
  }
`

export { StyledContainer, StyledBox, StyledHeader, Icon, Margin, CloseButton }
