import React from 'react';

import {
  StyledContainer,
  StyledBox,
  StyledHeader,
  Icon,
  Margin,
  CloseButton,
} from './StyledAddModal';
import styles from './AddModalBox.module.css';

function AddModalBox({ size, bgColor, title, icon, children, onCloseClick }) {
  return (
    <StyledContainer size={size}>
      <StyledHeader size={size} bgColor={bgColor}>
        <div className={styles.iconBox}>
          {icon && <Icon>{icon}</Icon>}
          {title && icon && <Margin />}
        </div>
        <div className={styles.titleBox}>
          <div className={styles.titleBox}>{title}</div>
          {onCloseClick && (
            <CloseButton onClick={onCloseClick} bgColor={bgColor} />
          )}
        </div>
      </StyledHeader>
      <StyledBox size={size}>{children}</StyledBox>
    </StyledContainer>
  );
}

export default AddModalBox;
