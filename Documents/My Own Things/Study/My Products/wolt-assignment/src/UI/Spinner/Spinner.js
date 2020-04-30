import React from 'react';

import styles from './Spinner.module.css';

const Spinner = ({ isAuthenticating }) => (
    <div className={styles.Spinner} style={{ visibility: isAuthenticating ? 'visible' : 'hidden' }}></div>
)

export default Spinner;