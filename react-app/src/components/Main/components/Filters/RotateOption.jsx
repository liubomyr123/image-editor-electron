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

const RotateOption = () => {
    return (
        <div className="rotate-options">
            {rotateButtons.map(({ id, child }) => {
                return (
                    <div id={id} key={id}>
                        {child}
                    </div>
                )
            })}
        </div>
    );
};

export default RotateOption;
