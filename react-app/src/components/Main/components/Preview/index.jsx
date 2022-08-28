import React from 'react';

import './index.scss';

const Preview = ({ file, imageStyles }) => {
    return (
        <div className="preview-container">
            <img
                style={imageStyles}
                src={file.url}
                id="preview-img"
                alt="preview-img"
            />
        </div>
    );
};

export default Preview;
