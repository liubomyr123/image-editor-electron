import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveFilter } from '../../../../redux/slicers/optionsSlicer';

const FilterOptions = (props) => {
    const {
        filters,
        activeFilter
    } = props;

    const dispatch = useDispatch();

    const {
        active,
        property: activeProperty
    } = activeFilter;

    const setActiveOption = (filterName) => dispatch(setActiveFilter({ filterName }));

    return (
        <div className="filters-options">
            {filters.map(({ property, name }) => {
                return (
                    <button
                        id={property}
                        key={property}
                        className={(activeProperty === property) && (active) ? 'active' : ''}
                        onClick={setActiveOption.bind(this, property)}
                    >
                        {name}
                    </button>
                )
            })}
        </div>
    );
};

export default FilterOptions;
