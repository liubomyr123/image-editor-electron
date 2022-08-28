import React from 'react';
import { useState } from 'react';
import { filtersOptions } from '../../helpers';
import FilterOptions from './FilterOptions';

import RotateOption from './RotateOption';
import Slider from './Slider';

import './index.scss';

const Filters = () => {
    const [activeOption, setActiveOption] = useState(filtersOptions[0]);

    const onChangeOption = (option) => {
        setActiveOption(option);
    };

    return (
        <div className='filters-container'>

            <div className="filters">
                <div className="filters-title">
                    <label>Filters</label>
                </div>
                <FilterOptions
                    onChangeOption={onChangeOption}
                    activeOption={activeOption}
                />
                <Slider
                    activeOption={activeOption}
                />
            </div>

            <div className="rotate">
                <div className="rotate-title">
                    <label>Rotate & Flip</label>
                </div>
                <RotateOption />
            </div>
        </div>
    );
};

export default Filters;
