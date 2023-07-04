import React from 'react';

import styles from './ButtonActions.module.css';

function ButtonActions({ onClick, icon, children }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>{icon}</span>
      {children}
    </button>
  );
}

export default ButtonActions;
