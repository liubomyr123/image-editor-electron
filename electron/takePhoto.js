const video = document.getElementById('camera-id');
const cameraBtn = document.getElementById('camera-btn');
// const link = document.getElementById('link');
const cameraImg = document.getElementById('camera-img');
const resetButton = document.getElementById('reset-button');
// const cameraDownload = document.getElementById('camera-download');

video.setAttribute('autoplay', '');
video.style.width = '400px';
video.style.height = '500px';
let dataURL;
cameraBtn.addEventListener('click', () => {
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);

    dataURL = canvas.toDataURL();

    cameraImg.src = dataURL;
    // new Notification('Photo taken', {
    //     body: 'You take new photo'
    // });
});

// cameraDownload.addEventListener('click', () => {
//     link.setAttribute('download', 'CameraPhotoTest.png');
//     link.setAttribute('href', dataURL.replace("image/png", "image/octet-stream"));
//     link.click();
//     // window.close();
// });

resetButton.addEventListener('click', () => {
    cameraImg.src = '../assets/images/preview-icon.jpg';
});

navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function success(stream) {
        video.srcObject = stream;
    });