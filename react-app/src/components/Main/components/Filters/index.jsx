import React from 'react';
import { useSelector } from 'react-redux';

import FilterOptions from './FilterOptions';
import RotateOption from './RotateOption';
import Slider from './Slider';
import { optionsSelector } from '../../../../redux/selectors';

import './index.scss';

const Filters = () => {
    const options = useSelector(optionsSelector);

    const filters = options.filter(({ type }) => type === 'filters');
    const activeFilter = filters.find(({ active }) => active);

    const rotateFlips = options.filter(({ type }) => type === 'rotateFlip');

    return (
        <div className='filters-container'>

            <div className="filters">
                <div className="filters-title">
                    <label>Filters</label>
                </div>
                <FilterOptions
                    filters={filters}
                    activeFilter={activeFilter}
                />
                <Slider
                    activeFilter={activeFilter}
                />
            </div>

            <div className="rotate">
                <div className="rotate-title">
                    <label>Rotate & Flip</label>
                </div>
                <RotateOption
                    rotateFlips={rotateFlips}
                />
            </div>
        </div>
    );
};

export default Filters;
