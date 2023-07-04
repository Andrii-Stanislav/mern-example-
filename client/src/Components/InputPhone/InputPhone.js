import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import './InputPhone.css'

function InputPhone({ value, onChange, name, disabled }) {
  return (
    <PhoneInput
      inputClass="custom-phone-input"
      buttonClass="custom-phone-dropdown"
      placeholder="+1201 XXX - XX - XX "
      name={name}
      country={'us'}
      value={value}
      onChange={onChange}
      disabled={disabled}
      // isValid={value => {
      //   console.log('isValid')
      //   console.log('value: ', value)
      //   if (value.length < 11) {
      //     return 'Invalid value: ' + value + ', '
      //   } else {
      //     return true
      //   }
      // }}
      inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true,
      }}
    />
  )
}

export default InputPhone
