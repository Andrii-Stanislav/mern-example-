import React from 'react';
import styled from 'styled-components';

import styles from './UserLogo.module.css';

const StyledLogoBox = styled.div`
  width: ${props => props.width || '40px'};
  height: ${props => props.width || '40px'};
  border: ${props => props.border || '2px solid #fff'};
  cursor: pointer;
`;

function UserLogo({ userLogo, width, onClick, border }) {
  return (
    <StyledLogoBox
      onClick={onClick}
      width={width}
      className={styles.logoBox}
      border={border}
    >
      <img className={styles.logo} src={userLogo} alt="logo"></img>
    </StyledLogoBox>
  );
}

export default UserLogo;
