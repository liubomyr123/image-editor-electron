import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from '../../../../redux/slicers/optionsSlicer';
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
        id: 'flipHorizontal',
        child: <FlipHorizontal />
    },
    {
        id: 'flipVertical',
        child: <FlipVertically />
    },
];

const RotateOption = (props) => {
    const {
        rotateFlips
    } = props;

    const dispatch = useDispatch();

    const onClickHandle = (id) => {
        const isLeft = id === "left";
        const isRight = id === "right";
        const isFlipHorizontal = id === 'flipHorizontal';

        if (isLeft || isRight) {
            const rotateValue = rotateFlips.find(({ property }) => property === 'rotate').value;

            dispatch(updateFilters({ filterName: 'rotate', value: rotateValue + (isLeft ? -90 : 90) }));
        } else {
            const flipVertical = rotateFlips.find(({ property }) => property === 'flipVertical').value === 1 ? -1 : 1;
            const flipHorizontal = rotateFlips.find(({ property }) => property === 'flipHorizontal').value === 1 ? -1 : 1;

            dispatch(updateFilters(
                {
                    filterName: id,
                    value: isFlipHorizontal ? flipHorizontal : flipVertical
                }
            ));
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
