import React from 'react';
import { filtersOptions, upperOption } from '../../helpers';

const FilterOptions = (props) => {
    const {
        activeOption,
        onChangeOption
    } = props;

    return (
        <div className="filters-options">
            {filtersOptions.map((option) => {
                return (
                    <button
                        id={option}
                        key={option}
                        className={activeOption === option ? 'active' : ''}
                        onClick={onChangeOption.bind(this, option)}
                    >
                        {upperOption(option)}
                    </button>
                )
            })}
        </div>
    );
};

export default FilterOptions;
