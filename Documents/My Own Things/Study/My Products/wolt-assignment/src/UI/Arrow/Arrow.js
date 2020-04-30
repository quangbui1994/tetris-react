import React from 'react';
import './Arrow.css';

const Arrow = ({ clickHandler }) => (
    <div className="center-con">   
        <div className="round" onClick={clickHandler}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

export default Arrow;