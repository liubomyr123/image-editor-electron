import React, { useRef } from 'react';

import './index.scss';

const Footer = (props) => {
    const {
        setFile,
        // file
    } = props;
    const refInput = useRef(null);

    const onInputChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const onChooseClick = () => {
        if (refInput.current) {
            refInput.current.click();
        }
    };

    const onSaveClick = (e) => {
        const previewImg = document.querySelector("#preview-img");

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
        
        const dataURL = canvas.toDataURL();
        const link = document.createElement("a");
        link.setAttribute('download', 'CameraPhotoTest.png');
        link.setAttribute('href', dataURL.replace("image/**", "image/octet-stream"));
        link.click();

        // console.log('file====', file);
        // var link = document.createElement('a');
        // link.href = file.path;
        // link.download = 'Download.jpg';
        // document.body.appendChild(link);
        // link.click();
        // const reader = new FileReader();

        // reader.readAsDataURL(file);
        // reader.onload = (e) => {
        //     // const canvas = document.createElement("canvas");
        //     // const image = new Image();
        //     // image.src = e.target.result;
        //     // image.onload = (e) => {
        //     //     const height = e.target.height;
        //     //     const width = e.target.width;
        //     //     const canvas = document.createElement("canvas");
        //     //     const ctx = canvas.getContext("2d");
        //     //     canvas.width = width;
        //     //     canvas.height = height;

        //     //     // ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
        //     //     // ctx.translate(canvas.width / 2, canvas.height / 2);
        //     //     // if(rotate !== 0) {
        //     //     //     ctx.rotate(rotate * Math.PI / 180);
        //     //     // }
        //     //     // ctx.scale(flipHorizontal, flipVertical);
        //     //     // ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        //     //     const link = document.createElement("a");
        //     //     link.download = "image.jpg";
        //     //     link.href = canvas.toDataURL();
        //     //     link.click();

        //     //     console.log("Uploaded image has valid Height and Width.", height, width);
        //     //     return true;
        //     // };
        // };
    };


    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    // canvas.width = previewImg.naturalWidth;
    // canvas.height = previewImg.naturalHeight;

    // ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    // if(rotate !== 0) {
    //     ctx.rotate(rotate * Math.PI / 180);
    // }
    // ctx.scale(flipHorizontal, flipVertical);
    // ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    // const link = document.createElement("a");
    // link.download = "image.jpg";
    // link.href = canvas.toDataURL();
    // link.click();


    return (
        <footer className="app-footer">
            <div className="reset-filter">
                <div className="button">
                    Reset Filters
                </div>
            </div>
            <div className="control-container">
                <input
                    onChange={onInputChange}
                    ref={refInput}
                    type="file"
                    className="file-input"
                    accept="image/*"
                    hidden
                    multiple={false}
                />
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
