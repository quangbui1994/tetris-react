import React from 'react';
import './NotFoundPage.css';
import NotFoundImage from '../../assets/img/error2.jpg';

const NotFoundPage = () => (
    <div className="NotFoundPage">
        <h2>Oops! We could not find any results</h2>
        <img src={NotFoundImage} alt="Not Found"/>
    </div>
);

export default NotFoundPage;