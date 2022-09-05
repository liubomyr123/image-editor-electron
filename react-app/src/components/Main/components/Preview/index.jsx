import React from 'react';
import { useSelector } from 'react-redux';

import { getImageStyle } from '../../../../helpers';
import { fileUrlSelector, optionsSelector } from '../../../../redux/selectors';

import './index.scss';

const Preview = () => {
    const options = useSelector(optionsSelector);
    const fileUrl = useSelector(fileUrlSelector);

    return (
        <div className="preview-container">
            <img
                style={getImageStyle(options)}
                src={fileUrl}
                id="preview-img"
                alt="preview-img"
            />
        </div>
    );
};

export default Preview;
