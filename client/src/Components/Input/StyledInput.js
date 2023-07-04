import styled from 'styled-components'
import { colors } from '../../styles/variables'

const StyledInput = styled.input`
  display: block;
  height: ${props => props.height || '40px'};
  max-width: ${props => props.maxWidth || '100%'};
  width: ${props => props.width || 'auto'};
  padding: ${props => (props.icon ? '12px 16px 12px 38px' : '12px 16px')};
  border: 1px solid #b3c9e6;
  border-radius: 4px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.17;
  color: ${colors.darkBlue};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`

const StyledInputBox = styled.div`
  position: relative;
  width: ${props => props.width || 'auto'};
`

const StyledIconBox = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;

  input:focus ~ & path {
    fill: ${colors.darkBlue};
  }
`

export { StyledInput, StyledInputBox, StyledIconBox }
