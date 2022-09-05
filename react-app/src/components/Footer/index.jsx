import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { optionsSelector } from '../../redux/selectors';
import { resetFilters } from '../../redux/slicers/optionsSlicer';

import './index.scss';

let i = 1;
const Footer = (props) => {
    const {
        setFile,
        file
    } = props;

    const dispatch = useDispatch();
    const refInput = useRef(null);
    const options = useSelector(optionsSelector);

    const onInputChange = (e) => {
        if (e.target.files[0]) {
            setFile({
                url: URL.createObjectURL((e.target.files[0])),
                fileObj: e.target.files[0]
            });
        };
    };

    const onChooseClick = () => {
        if (refInput.current) {
            refInput.current.click();
        };
    };

    const onSaveClick = (e) => {
        if (file.url) {
            const previewImg = document.querySelector("#preview-img");

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = previewImg.naturalWidth;
            canvas.height = previewImg.naturalHeight;

            const transform = options.filter(({ name, range }) => (!name && !range));
            const filters = options.filter(({ name, range }) => (name && range));

            const brightness = filters.filter(({ property }) => property === 'brightness')[0].value;
            const saturate = filters.filter(({ property }) => property === 'saturate')[0].value;
            const contrast = filters.filter(({ property }) => property === 'contrast')[0].value;
            const grayscale = filters.filter(({ property }) => property === 'grayscale')[0].value;
            // const opacity = filters.filter(({ property }) => property === 'opacity')[0].value;

            const rotate = transform.filter(({ property }) => property === 'rotate')[0]?.value;
            const flipHorizontal = transform.find(({ property }) => property === 'flipHorizontal')[0]?.value;
            const flipVertical = transform.find(({ property }) => property === 'flipVertical')[0]?.value;

            ctx.filter = `brightness(${brightness}%) saturate(${saturate}%) contrast(${contrast}%) grayscale(${grayscale}%) opacity(${30}%)`;
            ctx.translate(canvas.width / 2, canvas.height / 2);
            if (rotate !== 0) {
                ctx.rotate(rotate * Math.PI / 180);
            }
            ctx.scale(flipHorizontal, flipVertical);
            ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

            const nameOfFile = file?.fileObj?.name ? `${file.fileObj.name.split('.').shift()}(${i++}).png` : `newPhoto(${i++})`;

            const dataURL = canvas.toDataURL();
            const link = document.createElement("a");
            link.setAttribute('download', nameOfFile);
            link.setAttribute('href', dataURL.replace("image/**", "image/octet-stream"));
            link.click();
        };
    };

    const onResetFilters = () => dispatch(resetFilters());

    const removePreviewPhoto = () => {
        if (file.url !== '/static/media/preview-icon-bright.03494f5c52e93e3540b1.png') {
            setFile({ url: require('../../assets/png/preview-icon-bright.png'), fileObj: undefined })
        }
    };

    return (
        <footer className="app-footer">
            <div className="reset-filter">
                <div
                    className="button"
                    onClick={onResetFilters}
                >
                    Reset Filters
                </div>
            </div>
            <div className="control-container">
                <input
                    onChange={onInputChange}
                    ref={refInput}
                    type="file"
                    className="file-input"
                    accept="image/*, .png, .jpg, .jpeg"
                    hidden
                    multiple={false}
                />
                <div
                    className="control-remove"
                    onClick={removePreviewPhoto}
                >
                    Remove Image
                </div>
                <div
                    className="control-choose"
                    onClick={onChooseClick}
                >
                    Choose Image
                </div>
                <div
                    className="control-save"
                    onClick={onSaveClick}
                >
                    Save Image
                </div>
            </div>
        </footer>
    );
};

export default Footer;
