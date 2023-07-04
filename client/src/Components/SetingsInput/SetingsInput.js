import React from 'react';

import styles from './SetingsInput.module.css';

function SetingsInput({ value, onChange, type, editMode, name, placeholder }) {
  return (
    <input
      className={styles.input}
      type={type || 'text'}
      name={name}
      value={value}
      onChange={onChange}
      maxLength="26"
      disabled={!editMode}
      placeholder={placeholder}
    />
  );
}

export default SetingsInput;
