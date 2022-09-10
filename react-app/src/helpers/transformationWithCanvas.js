export const transformationWithCanvas = (previewImg, options) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    const filters = options.filter(({ type }) => type === 'filters');
    const rotateFlips = options.filter(({ type }) => type === 'rotateFlip');

    const filtersResult = filters.map((option) => `${option.property}(${option.value}${option.unit})`).join(' ');

    const rotate = rotateFlips.find(({ property }) => property === 'rotate')?.value;
    const flipHorizontal = rotateFlips.find(({ property }) => property === 'flipHorizontal')?.value;
    const flipVertical = rotateFlips.find(({ property }) => property === 'flipVertical')?.value;

    ctx.filter = filtersResult;

    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    };

    ctx.scale(flipHorizontal, flipVertical);

    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL();

    return dataURL;
};
