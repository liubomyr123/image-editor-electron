import React from 'react';
import { ReactComponent as FlipHorizontal } from './../../../../assets/svg/flip-horizontal.svg';
import { ReactComponent as FlipVertically } from './../../../../assets/svg/flip-vertically.svg';
import { ReactComponent as RotateClockwise } from './../../../../assets/svg/rotate-clockwise.svg';
import { ReactComponent as RotateCounterclockwise } from './../../../../assets/svg/rotate-counterclockwise.svg';

const rotateButtons = [
    {
        id: 'right',
        child: <RotateCounterclockwise />
    },
    {
        id: 'left',
        child: <RotateClockwise />
    },
    {
        id: 'horizontal',
        child: <FlipHorizontal />
    },
    {
        id: 'vertical',
        child: <FlipVertically />
    },
]

const RotateOption = ({ options, handleRotateChange }) => {
    const onClickHandle = (id, e) => {
        if (id === "left") {
            const rotateValue = options.find(({ property }) => property === 'rotate').value;
            handleRotateChange({ id: 'rotate', value: rotateValue - 90 });
        } else if (id === "right") {
            const rotateValue = options.find(({ property }) => property === 'rotate').value;
            handleRotateChange({ id: 'rotate', value: rotateValue + 90 });
        } else if (id === "horizontal") {
            const horizontal = options.find(({ property }) => property === 'flipHorizontal')
            handleRotateChange({ id: 'flipHorizontal', value: horizontal.value === 1 ? -1 : 1 });
        } else {
            const vertical = options.find(({ property }) => property === 'flipVertical')
            console.log('vertical====', vertical);
            handleRotateChange({ id: 'flipVertical', value: vertical.value === 1 ? -1 : 1 });
        };
    };

    return (
        <div className="rotate-options">
            {rotateButtons.map(({ id, child }) => {
                return (
                    <div
                        id={id}
                        key={id}
                        onClick={onClickHandle.bind(this, id)}
                    >
                        {child}
                    </div>
                )
            })}
        </div>
    );
};

export default RotateOption;
