import React from 'react'

import { StyledInput, StyledInputBox, StyledIconBox } from './StyledInput'

function Input({
  placeholder,
  type,
  width,
  maxWidth,
  height,
  name,
  onChange,
  value,
  required,
  min,
  step,
  icon,
}) {
  return (
    <StyledInputBox width={width}>
      <StyledInput
        onChange={onChange}
        value={value}
        name={name}
        width={width}
        maxWidth={maxWidth}
        height={height}
        type={type}
        min={type === 'number' ? min : ''}
        minLength={min}
        step={step}
        placeholder={placeholder}
        required={required}
        icon={icon}
      />
      <StyledIconBox>{icon}</StyledIconBox>
    </StyledInputBox>
  )
}

export default Input
