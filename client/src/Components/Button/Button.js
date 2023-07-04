import React from 'react'

import { colors } from '../../styles/variables'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  background-color: ${props => {
    switch (props.bgColor) {
      case 'white':
        return '#fff'
      case 'darkBlue':
        return '#004AAD'
      case 'lightBlue':
        return '#188BF6'
      case 'transparent':
        return 'rgba(0, 0, 0, 0)'
      case 'black':
        return '#000'
      case 'red':
        return 'rgba(233, 61, 61, 1)'
      default:
        return '#fff'
    }
  }};
  color: ${props => {
    switch (props.bgColor) {
      case 'white':
        return colors.lightBlue
      case 'darkBlue':
        return '#ffffff'
      case 'lightBlue':
        return '#ffffff'
      case 'transparent':
        return props.color ? props.color : 'rgba(21, 25, 32, 0.5)'
      case 'black':
        return '#fff'
      case 'red':
        return '#fff'
      default:
        return '#004AAD'
    }
  }};
  border: ${props => {
    switch (props.bgColor) {
      case 'white':
        return `1px solid ${colors.lightBlue}`
      case 'transparent':
        return props.color
          ? '1px solid #E8F3FE'
          : '1px solid rgba(226, 226, 226, 1)'
      default:
        return 'none'
    }
  }};
  width: ${props => props.width || 'max-content'};
  font-weight: ${props => (props.thick ? 500 : 400)};

  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height || '40px'};

  font-weight: 400;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.215, 0.61, 0.355, 1);

  &:hover {
    font-weight: 500;
    ${props => {
      switch (props.bgColor) {
        // case 'white':
        //   return '#fff'
        // case 'darkBlue':
        //   return 'background-color: #188BF6'
        // case 'lightBlue':
        //   return 'background-color: #004AAD'
        case 'transparent':
          return `border: 1px solid ${colors.darkBlue};`
        default:
          return ''
      }
    }};
  }

  &:active {
    ${props => {
      switch (props.bgColor) {
        // case 'white':
        //   return '#fff'
        case 'darkBlue':
          return `background-color: ${colors.lightBlue};`
        case 'lightBlue':
          return 'background-color: #004AAD;'
        case 'transparent':
          return `border-color: ${colors.lightBlue};
                  color: ${colors.lightBlue};`
        default:
          return ''
      }
    }}
  }
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

const Margin = styled.span`
  margin-left: 10px;
`

const TextBox = styled.span`
  position: relative;
  width: max-content;
`

const HiddenText = styled.span`
  opacity: 0;
  font-weight: 400 !important;
`

const Text = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
`

function Button({
  type,
  bgColor,
  onClick,
  icon,
  width,
  height,
  children,
  disabled,
}) {
  const heandleClick = event => {
    onClick && onClick(event)
  }

  return (
    <StyledButton
      type={type}
      bgColor={bgColor}
      width={width}
      height={height}
      onClick={heandleClick}
      disabled={disabled}
    >
      {icon && <Icon>{icon}</Icon>}
      {children && icon && <Margin />}
      <TextBox>
        <HiddenText>{children}</HiddenText>
        <Text>{children}</Text>
      </TextBox>
    </StyledButton>
  )
}

export default Button
