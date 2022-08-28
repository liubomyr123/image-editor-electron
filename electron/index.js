const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

const MenuBuilder = require('./menu');

process.env.NODE_ENV = isDev ? 'development' : 'production';

let mainWindow;

const openPhotoWindow = () => {
    const camera = new BrowserWindow({
        width: 600,
        height: 600,
        show: false,
        autoHideMenuBar: true
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
        show: false
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../react-app/build/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    };

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.show();
    });

    const menuBuilder = MenuBuilder(mainWindow, app.name, { openPhotoWindow });
    menuBuilder.buildMenu();
};

app.on('ready', createWindow);

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
