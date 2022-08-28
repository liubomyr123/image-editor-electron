const video = document.getElementById('camera-id');
const cameraBtn = document.getElementById('camera-btn');
const cameraImg = document.getElementById('camera-img');
const resetButton = document.getElementById('reset-button');
const okButton = document.getElementById('ok-button');

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

resetButton.addEventListener('click', () => {
    cameraImg.src = '../assets/images/preview-icon.jpg';
});


okButton.addEventListener('click', () => {
    if (dataURL) {
        window.electronAPI.sendImage(dataURL);
        window.close();
    }
});

navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function success(stream) {
        video.srcObject = stream;
    });