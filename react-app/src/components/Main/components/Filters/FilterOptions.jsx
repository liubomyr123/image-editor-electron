import React from 'react';
import {
    upperOption
} from '../../helpers';

const FilterOptions = (props) => {
    const {
        activeOption,
        options,
        onChangeOption
    } = props;

    return (
        <div className="filters-options">
            {options.filter(({ name, range }) => (name && range)).map(({ property }) => {
                return (
                    <button
                        id={property}
                        key={property}
                        className={activeOption === property ? 'active' : ''}
                        onClick={onChangeOption.bind(this, property)}
                    >
                        {upperOption(property)}
                    </button>
                )
            })}
        </div>
    );
};

export default FilterOptions;
