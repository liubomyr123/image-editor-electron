import React from 'react';
import { useSelector } from 'react-redux';
import { optionsSelector } from '../../../../redux/selectors';
import { getImageStyle } from '../../helpers';

import './index.scss';

const Preview = ({ file }) => {
    const options = useSelector(optionsSelector);

    return (
        <div className="preview-container">
            <img
                style={getImageStyle(options)}
                src={file.url}
                id="preview-img"
                alt="preview-img"
            />
        </div>
    );
};

export default Preview;
