export const upperOption = (option) => option.charAt(0).toUpperCase() + option.slice(1);
// export const filtersOptions = ['brightness', 'saturation', 'inversion', 'grayscale'];
export const defaultOptions = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        property: 'rotate',
        value: 0,
    },
    {
        property: 'flipHorizontal',
        value: 1,
    },
    {
        property: 'flipVertical',
        value: 1,
    },
    // {
    //     name: 'Sepia',
    //     property: 'sepia',
    //     value: 0,
    //     range: {
    //         min: 0,
    //         max: 100
    //     },
    //     unit: '%'
    // },
    // {
    //     name: 'Hue Rotate',
    //     property: 'hue-rotate',
    //     value: 0,
    //     range: {
    //         min: 0,
    //         max: 360
    //     },
    //     unit: 'deg'
    // },
    // {
    //     name: 'Blur',
    //     property: 'blur',
    //     value: 0,
    //     range: {
    //         min: 0,
    //         max: 20
    //     },
    //     unit: 'px'
    // }
]


export function getImageStyle(options) {
    const transform = options.filter(({ name, range }) => (!name && !range));
    const filters = options.filter(({ name, range }) => (name && range));
    const rotate = transform.find(({ property }) => property === 'rotate');
    const flipHorizontal = transform.find(({ property }) => property === 'flipHorizontal');
    const flipVertical = transform.find(({ property }) => property === 'flipVertical');

    return {
        filter: filters.map((option) => `${option.property}(${option.value}${option.unit})`).join(' '),
        transform: `rotate(${rotate.value}deg) scale(${flipHorizontal.value}, ${flipVertical.value})`
    }
};