const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
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
        show: false,
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            preload: path.join(__dirname, 'preload.js')
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

    const menuBuilder = MenuBuilder(mainWindow, app.name, { openPhotoWindow });
    menuBuilder.buildMenu();
};

app.on('ready', () => {
    createWindow();

    ipcMain.on('set-image', (e, dataURL) => {
        mainWindow.webContents.send('get-image', dataURL);
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
