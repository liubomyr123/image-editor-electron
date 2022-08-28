import React from 'react';

import { getImageStyle } from '../../helpers';

import './index.scss';

const Preview = ({ file, options }) => {
    return (
        <div className="preview-container">
            <img
                style={getImageStyle(options)}
                src={file ? URL.createObjectURL(file) : require('./../../../../assets/png/preview-icon.jpg')}
                id="preview-img"
                alt="preview-img"
            />
        </div>
    );
};

export default Preview;
