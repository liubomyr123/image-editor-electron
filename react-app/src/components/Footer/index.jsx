import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fileSelector, optionsSelector } from '../../redux/selectors';
import { defaultFileState, updateFile } from '../../redux/slicers/fileSlicer';
import { resetFilters } from '../../redux/slicers/optionsSlicer';

import './index.scss';

const Footer = ({ canvasRef }) => {
    const dispatch = useDispatch();

    const file = useSelector(fileSelector);
    const options = useSelector(optionsSelector);
    // console.log('options====', options);
    const refInput = useRef(null);

    const onInputChange = (e) => {
        if (e.target.files[0]) {
            const {
                name,
                // size,
                // type,
                // lastModified,
                // path
            } = e.target.files[0];

            dispatch(updateFile({
                file: {
                    fileUrl: URL.createObjectURL((e.target.files[0])),
                    fileObj: {
                        name
                    },
                    isDefault: false
                }
            }));
        };
    };

    const onChooseClick = () => {
        if (refInput.current) {
            refInput.current.click();
        };
    };

    const onSaveClick = (e) => {
        console.log('flipHorizontal====');
        if (file.fileUrl === '/static/media/preview-icon-bright.03494f5c52e93e3540b1.png') return;
        if (file.fileUrl && canvasRef?.current) {
            const dataURL = canvasRef.current.toDataURL();
            const nameOfFile = file?.fileObj?.name ? `${file.fileObj.name.split('.').shift()}.png` : `newPhoto`;

            const link = document.createElement("a");
            link.setAttribute('download', nameOfFile);
            link.setAttribute('href', dataURL.replace("image/**", "image/octet-stream"));
            link.click();
        };
    };

    const removePreviewPhoto = () => {
        if (!file.isDefault) {
            dispatch(updateFile({ file: defaultFileState }));
        }
    };

    const onResetFilters = () => dispatch(resetFilters());

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
