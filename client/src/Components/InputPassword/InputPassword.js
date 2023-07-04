import React, { useState } from 'react'

import Input from '../Input'
import Password from '../../Components/svg/Password'
import ShowPassword from '../../Components/svg/ShowPassword'

import styles from './InputPassword.module.css'

export default function InputPassword({ width, ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  //
  return (
    <span className={styles.container} style={{ width: width }}>
      <Input
        {...props}
        width={width}
        type={showPassword ? 'text' : 'password'}
        placeholder="******"
        min="6"
        icon={<Password />}
      />
      <span
        className={
          showPassword
            ? `${styles.showPassword} ${styles.showPasswordTrue}`
            : styles.showPassword
        }
        onMouseDown={() => setShowPassword(true)}
        onMouseUp={() => setShowPassword(false)}
      >
        <ShowPassword />
      </span>
    </span>
  )
}
