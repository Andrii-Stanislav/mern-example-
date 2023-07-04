import React from 'react';

import logo from '../../images/logo.png';
import styles from './Logo.module.css';

function Logo() {
    return (
        <div className={styles.logoBox}>
            <img className={styles.logo} src={logo} alt="logo"></img>
        </div>
    );
}

export default Logo;
