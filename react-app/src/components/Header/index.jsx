import React from 'react';
import { ReactComponent as InfoIcon } from './../../assets/svg/info-icon-circle.svg';

import './index.scss';

const Header = () => {
    const titleText = 'Use combination of CTRL + Mouse wheel to zoom in/out'
    return (
        <header className="app-header">
            <span>Image Editor</span>
            <div className="info-icon" title={titleText}>
                <InfoIcon />
            </div>
        </header>
    );
};

export default Header;
