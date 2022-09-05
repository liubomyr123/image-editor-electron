import { createSlice } from '@reduxjs/toolkit'

export const defaultOptions = [
    {
        type: 'filters',
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        active: true,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        active: false,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        active: false,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        active: false,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Opacity',
        property: 'opacity',
        value: 100,
        range: {
            min: 0,
            max: 100
        },
        active: false,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Invert',
        property: 'invert',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        active: false,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        active: false,
        unit: '%'
    },
    {
        type: 'filters',
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360
        },
        active: false,
        unit: 'deg'
    },
    {
        type: 'filters',
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        active: false,
        unit: 'px'
    },
    // {
    //     type: 'filters',
    //     name: 'Drop Shadow',
    //     property: 'drop-shadow',
    //     //    ??
    // },
    {
        type: 'rotateFlip',
        property: 'rotate',
        value: 0,
    },
    {
        type: 'rotateFlip',
        property: 'flipHorizontal',
        value: 1,
    },
    {
        type: 'rotateFlip',
        property: 'flipVertical',
        value: 1,
    },
]


const optionsSlicer = createSlice({
    name: 'options',
    initialState: {
        options: defaultOptions
    },
    reducers: {
        resetFilters(state) {
            state.options = defaultOptions;
        },

        updateFilters(state, action) {
            const { filterName, value } = action.payload;

            state.options = state.options.map((filter) => {
                if (filterName === filter.property) {
                    return (
                        {
                            ...filter,
                            value
                        }
                    );
                };
                return filter;
            });
        },

        setActiveFilter(state, action) {
            const { filterName } = action.payload;

            state.options = state.options.map((filter) => {
                if (filterName === filter.property) {
                    return (
                        {
                            ...filter,
                            active: true
                        }
                    );
                };
                return {
                    ...filter,
                    active: false
                };
            });

        },
    }
})

export const {
    resetFilters,
    updateFilters,
    setActiveFilter,
} = optionsSlicer.actions

export default optionsSlicer.reducer