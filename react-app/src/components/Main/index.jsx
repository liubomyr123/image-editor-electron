import React, { useState } from 'react';
import { Filters, Preview } from './components';
import { defaultOptions, getImageStyle } from './helpers';

import './index.scss';

const Main = ({ file, setOptions, options }) => {
    const [activeOption, setActiveOption] = useState(defaultOptions[0].property);

    function handleSliderChange({ target }) {
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                if (option.property !== activeOption) return option;
                return { ...option, value: target.value };
            });
        });
    };

    function handleRotateChange({ id, value }) {
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                if (option.property !== id) return option;
                return { ...option, value: value };
            });
        });
    };

    const imageStyles = getImageStyle(options);

    return (
        <main className="app-main">
            <Filters
                options={options}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                handleSliderChange={handleSliderChange}
                handleRotateChange={handleRotateChange}
            />
            <Preview
                imageStyles={imageStyles}
                file={file}
            />
        </main>
    );
};

export default Main;
