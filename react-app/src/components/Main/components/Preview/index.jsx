import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { fileUrlSelector, optionsSelector } from '../../../../redux/selectors';

import './index.scss';

const Preview = ({ canvasRef }) => {
    const options = useSelector(optionsSelector);
    const fileUrl = useSelector(fileUrlSelector);
    const imageRef = useRef(null);

    const image = imageRef.current;
    const canvas = canvasRef.current;

    useEffect(() => {
        updateCanvasImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    function updateCanvasImage() {
        if (image && canvas) {
            const ctx = canvas.getContext('2d');

            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            const rotateFlips = options.filter(({ type }) => type === 'rotateFlip');
            const filters = options.filter(({ type }) => type === 'filters');
            const filtersResult = filters.map((option) => `${option.property}(${option.value}${option.unit})`).join(' ');

            const rotate = rotateFlips.find(({ property }) => property === 'rotate')?.value;
            const flipHorizontal = rotateFlips.find(({ property }) => property === 'flipHorizontal')?.value;
            const flipVertical = rotateFlips.find(({ property }) => property === 'flipVertical')?.value;

            ctx.filter = filtersResult;

            ctx.translate(canvas.width / 2, canvas.height / 2);

            const ratio = image.naturalWidth / image.naturalHeight;

            ctx.scale(flipHorizontal, flipVertical);

            const is90Degrees = rotate % 360 === 90 && rotate === 90;
            const isRightRotate = [90, -90].includes(rotate % 360);

            if ([90, -90, 270, -270].includes(rotate % 360)) {
                canvas.height = image.naturalWidth;
                canvas.width = image.naturalHeight;

                if (rotate > 0) {
                    if (is90Degrees) {
                        ctx.rotate(-rotate * Math.PI / 180);
                    } else {
                        ctx.rotate(rotate * Math.PI / 180);
                    }
                } else {
                    ctx.rotate(-rotate * Math.PI / 180);
                }

                if (isRightRotate) { // right
                    console.log('right====');

                    if (is90Degrees) {
                        ctx.drawImage(
                            image,
                            (-canvas.width * ratio),
                            (-canvas.height / 1000),
                            canvas.height,
                            canvas.width,
                        );
                    }

                    ctx.drawImage(
                        image,
                        (-canvas.height / -1000),
                        (-canvas.width),
                        canvas.height,
                        canvas.width,
                    );
                } else { // left

                    ctx.drawImage(
                        image,
                        (-canvas.width * ratio),
                        (-canvas.height / 1000),
                        canvas.height,
                        canvas.width,
                    );
                }

            } else {
                if (rotate !== 0) {
                    ctx.rotate(rotate * Math.PI / 180);
                };
                ctx.drawImage(
                    image,
                    (-canvas.width / 2),
                    (-canvas.height / 2),
                    canvas.width,
                    canvas.height
                );
            }
        }
    }

    return (
        <div className="preview-container">
            <canvas
                ref={canvasRef}
                style={{
                    maxWidth: '100%',
                }}
                id="canvas"
            />
            <div style={{ display: 'none' }}>
                <img
                    ref={imageRef}
                    src={fileUrl}
                    onLoad={updateCanvasImage}
                    id="preview-img"
                    alt="preview-img"
                />
            </div>
        </div>
    );
};

export default Preview;
