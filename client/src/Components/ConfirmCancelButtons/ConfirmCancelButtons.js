import React from 'react';

import styles from './ConfirmCancelButtons.module.css';

function ConfirmCancelButtons({ confirm, cancel }) {
  return (
    <div className={styles.buttonsBox}>
      <div onClick={cancel} className={styles.buttonCancel}>
        Cancel
      </div>
      <div onClick={confirm} className={styles.buttonConfirm}>
        Confirm
      </div>
    </div>
  );
}

export default ConfirmCancelButtons;
