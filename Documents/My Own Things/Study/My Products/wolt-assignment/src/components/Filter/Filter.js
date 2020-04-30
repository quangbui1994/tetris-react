import React, { useState } from 'react';
import styles from './Filter.module.css';
import { TextField, Button } from '@material-ui/core';

const Filter = ({ sortAlphabetically, searchRestaurant }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeHandler = searchQuery => {
        setSearchQuery(searchQuery);
        searchRestaurant(searchQuery);
    }

    return (
        <div className={styles.Filter}>
            <TextField 
                InputProps={{style: { color: '#868780', fontSize: 20, fontWeight: 300 }}} 
                label="Search" variant="standard" 
                onChange={e => onChangeHandler(e.target.value)} />
            <button style={{ fontSize: 10 }} onClick={sortAlphabetically}>Sort</button>
        </div>
    )
}

export default Filter;