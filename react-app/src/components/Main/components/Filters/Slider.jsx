import React from 'react';
import { useState } from 'react';
import { upperOption } from '../../helpers';

const Slider = (props) => {
    const {
        activeOption
    } = props;

    const [rangeValue, setRangeValue] = useState(0);

    const onChangeRange = (e) => {
        setRangeValue(e.target.value);
    };

    return (
        <div className="slider">
            <div className="filter-info">
                <p className="name">
                    {upperOption(activeOption)}
                </p>
                <p className="value">
                    {`${rangeValue}%`}
                </p>
            </div>
            <div className="filter-range">
                <input
                    onChange={onChangeRange}
                    value={rangeValue}
                    type="range"
                    min="0"
                    max="200"
                />
            </div>
        </div>
    );
};

export default Slider;
