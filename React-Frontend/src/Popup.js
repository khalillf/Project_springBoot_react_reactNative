import React from 'react';

const Popup = ({ message, onOk, onRetry }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={onOk}>OK</button>
                <button onClick={onRetry}>Retry</button>
            </div>
        </div>
    );
};

export default Popup;
