const { app, BrowserWindow, Menu, shell } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

const isMac = process.platform === 'darwin';
process.env.NODE_ENV = isDev ? 'development' : 'production';

let mainWindow;
let addWindow;

const createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 200,
        height: 300,
        title: 'Add new item'
    });
    addWindow.loadURL('http://localhost:3000');
    addWindow.on('closed', () => {
        addWindow = null;
    });
};

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add photo',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    }
];

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
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
    }


    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.show();
    })
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null || BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

// if mac, we should add an empty object at the beginning of items list
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
};

// add devtools if we in dev mode
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push(
        {
            label: 'Developer tools',
            submenu: [
                {
                    label: 'Toggle Developer tools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    },
                },
                {
                    label: 'Open Containing folder',
                    click() {
                        shell.showItemInFolder(__dirname)
                    }
                },
                {
                    role: 'reload',
                },
            ]
        }
    )
}
