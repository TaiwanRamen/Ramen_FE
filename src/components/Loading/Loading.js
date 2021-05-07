import React from 'react';
import loadingSpinner from '../../static/Spinner-1s-200px.svg';
import './Loading.css'
const Loading = () => {
    return (
        <div className="col-md-12 loading">
            <img className="spinner" src={loadingSpinner}  />
            <p className="loading-message">載入中，請稍等</p>
        </div>
    );
};

export default Loading;
