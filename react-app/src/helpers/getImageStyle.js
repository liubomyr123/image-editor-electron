export function getImageStyle(options) {
    const transform = options.filter(({ name, range }) => (!name && !range));
    const filters = options.filter(({ name, range }) => (name && range));
    const rotate = transform.find(({ property }) => property === 'rotate');
    const flipHorizontal = transform.find(({ property }) => property === 'flipHorizontal');
    const flipVertical = transform.find(({ property }) => property === 'flipVertical');

    return {
        // width: '100%',
        // height: '100%',
        filter: filters.map((option) => `${option.property}(${option.value}${option.unit})`).join(' '),
        transform: `rotate(${rotate.value}deg) scale(${flipHorizontal.value}, ${flipVertical.value})`
    }
};