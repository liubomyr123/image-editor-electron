import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from '../../../../redux/slicers/optionsSlicer';

const Slider = (props) => {
    const {
        activeFilter
    } = props;

    const {
        value,
        property,
        range,
        name
    } = activeFilter;

    const dispatch = useDispatch();

    const handleSliderChange = ({ target }) => dispatch(updateFilters({ filterName: target.name, value: target.value }));

    return (
        <div className="slider">
            <div className="filter-info">
                <p className="name">
                    {name}
                </p>
                <p className="value">
                    {`${value}%`}
                </p>
            </div>
            <div className="filter-range">
                <input
                    onChange={handleSliderChange}
                    name={property}
                    value={value}
                    min={range.min}
                    max={range.max}
                    type="range"
                />
            </div>
        </div>
    );
};

export default Slider;
