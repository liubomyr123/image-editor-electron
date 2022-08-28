import React from 'react';

import './index.scss';

const Preview = ({ file }) => {
    return (
        <div className="preview-container">
            <img
                id="preview-img"
                src={file ? URL.createObjectURL(file) : require('./../../../../assets/png/preview-icon.jpg')}
                alt="preview-img"
            />
        </div>
    );
};

export default Preview;
