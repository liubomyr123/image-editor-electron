import React from 'react';

import FilterOptions from './FilterOptions';
import RotateOption from './RotateOption';
import Slider from './Slider';

import './index.scss';

const Filters = (props) => {
    const {
        options,
        activeOption,
        setActiveOption,
        handleSliderChange,
        handleRotateChange
    } = props;

    const currentOption = options.find(({ property }) => property === activeOption);

    return (
        <div className='filters-container'>

            <div className="filters">
                <div className="filters-title">
                    <label>Filters</label>
                </div>
                <FilterOptions
                    options={options}
                    onChangeOption={setActiveOption}
                    activeOption={activeOption}
                />
                <Slider
                    currentOption={currentOption}
                    activeOption={activeOption}
                    handleSliderChange={handleSliderChange}
                />
            </div>

            <div className="rotate">
                <div className="rotate-title">
                    <label>Rotate & Flip</label>
                </div>
                <RotateOption
                    handleRotateChange={handleRotateChange}
                    options={options.filter(({ name, range }) => (!name && !range))}
                />
            </div>
        </div>
    );
};

export default Filters;
