import React from 'react';

import './index.scss';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="reset-filter">
                <div className="button">
                    Reset Filters
                </div>
            </div>
            <div className="control-container">
                <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    hidden
                />
                <div className="control-choose">
                    Choose Image
                </div>
                <div className="control-save">
                    Save Image
                </div>
            </div>
        </footer>
    );
};

export default Footer;
