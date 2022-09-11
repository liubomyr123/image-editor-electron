const { app, BrowserWindow, ipcMain, globalShortcut, webFrame } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const {
    default: installExtension,
    REDUX_DEVTOOLS,
    REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");
const MenuBuilder = require('./menu');

process.env.NODE_ENV = isDev ? 'development' : 'production';


// let prevZoomLevel = webFrame.getZoomLevel();

// const onResize = () => {
//     const newZoomLevel = webFrame.getZoomLevel();
//     if (newZoomLevel !== prevZoomLevel) {
//         // Do your thing
//     }
//     prevZoomLevel = newZoomLevel;
// };

// mainWindow.addEventListener('resize', onResize);

// let win = BrowserWindow.getFocusedWindow();

// // let win = BrowserWindow.getAllWindows()[0];

// // If reduced below Minimum value
// // Error - 'zoomFactor' must be a double greater than 0.0
// win.webContents.setZoomFactor(1.0);

// // Upper Limit is working of 500 %
// win.webContents
//     .setVisualZoomLevelLimits(1, 5)
//     .then(console.log("Zoom Levels Have been Set between 100% and 500%"))
//     .catch((err) => console.log(err));

// win.webContents.on("zoom-changed", (event, zoomDirection) => {
//     console.log(zoomDirection);
//     var currentZoom = win.webContents.getZoomFactor();
//     console.log("Current Zoom Factor - ", currentZoom);
//     // console.log('Current Zoom Level at - '
//     // , win.webContents.getZoomLevel());
//     console.log("Current Zoom Level at - ", win.webContents.zoomLevel);

//     if (zoomDirection === "in") {

//         // win.webContents.setZoomFactor(currentZoom + 0.20);
//         win.webContents.zoomFactor = currentZoom + 0.2;

//         console.log("Zoom Factor Increased to - "
//             , win.webContents.zoomFactor * 100, "%");
//     }
//     if (zoomDirection === "out") {

//         // win.webContents.setZoomFactor(currentZoom - 0.20);
//         win.webContents.zoomFactor = currentZoom - 0.2;

//         console.log("Zoom Factor Decreased to - "
//             , win.webContents.zoomFactor * 100, "%");
//     }
// });


let mainWindow;

const openPhotoWindow = () => {
    const camera = new BrowserWindow({
        maxWidth: 600,
        minWidth: 600,
        maxHeight: 320,
        minHeight: 320,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            preload: path.join(__dirname, 'takePhotoPreloader.js')
        }
    });
    camera.loadURL(url.format({
        pathname: path.join(__dirname, './takePhoto.html'),
        protocol: 'file:',
        slashes: true
    }));
    camera.once('ready-to-show', () => camera.show());
};

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 600,
        minHeight: 570,
        height: 600,
        useContentSize: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: process.env.NODE_ENV === 'development',
            preload: path.join(__dirname, 'preload.js'),
            // webSecurity: false,
            zoomFactor: 3
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.once("dom-ready", async () => {
            await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
                .then((name) => console.log(`Added Extension:  ${name}`))
                .catch((err) => console.log("An error occurred: ", err))
                .finally(() => {
                    mainWindow.webContents.openDevTools();
                });
        });
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../react-app/build/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    };

    // Open add photo modal
    globalShortcut.register('CommandOrControl+A', () => {
        openPhotoWindow();
    });

    // Check whether a shortcut is registered.
    // globalShortcut.isRegistered('CommandOrControl+A')

    mainWindow.setIcon(path.join(__dirname, '../assets/images/png-paint-icon.png'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.show();
    });

    // console.log('webFrame====', webFrame);
    // webFrame.setZoomFactor(2)
    // mainWindow.webContents.setZoomFactor(4);
    // mainWindow.webContents.setZoomFactor(3.0);
    // mainWindow.webContents.on('resize', (e) => {
    //     console.log('===================', e);
    // });

    // mainWindow.webContents.on('wheel', zoom, { passive: false });

    // mainWindow.webContents.on('zoom-changed', (e) => {

    //     console.log('=================', e);
    //     const factor = e.sender.getZoomLevel();
    //     console.log('====', factor);
    //     // mainWindow.webContents.setZoomFactor(1);
    // });
    const menuBuilder = MenuBuilder(mainWindow, app.name, { openPhotoWindow });
    menuBuilder.buildMenu();
};

// function zoom (e) {
//     console.log('event.deltaY====', e.deltaY);
// }

app.on('ready', () => {
    createWindow();

    ipcMain.on('set-image', (e, dataURL) => {
        mainWindow.webContents.send('get-image', dataURL);
    });

    ipcMain.on('set-zoom', (e, deltaY) => {
        mainWindow.webContents.setZoomFactor(deltaY);
        // const zoomFactor = mainWindow.webContents.getZoomFactor();
        // console.log('mainWindow.webContents====', mainWindow.webContents.getZoomFactor());
        // console.log('deltaY====', deltaY);
        // mainWindow.webContents.send('get-zoom', zoomFactor);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null || BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    };
});
