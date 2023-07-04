import React from 'react';

import styles from './MainContainer.module.css';

function MainContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default MainContainer;
