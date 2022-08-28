import React from 'react';
import { upperOption } from '../../helpers';

const Slider = (props) => {
    const {
        activeOption,
        currentOption,
        handleSliderChange,
    } = props;

    return (
        <div className="slider">
            <div className="filter-info">
                <p className="name">
                    {upperOption(activeOption)}
                </p>
                <p className="value">
                    {`${currentOption.value}%`}
                </p>
            </div>
            <div className="filter-range">
                <input
                    onChange={handleSliderChange}
                    value={currentOption.value}
                    type="range"
                    min={currentOption.range.min}
                    max={currentOption.range.max}
                />
            </div>
        </div>
    );
};

export default Slider;
