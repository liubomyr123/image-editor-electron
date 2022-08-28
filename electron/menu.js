const { Menu, shell } = require("electron");
const isMac = process.platform === "darwin";

const MenuBuilder = function (mainWindow, appName, { openPhotoWindow }) {
    // https://electronjs.org/docs/api/menu#main-process
    const getTemplate = () => {
        return [
            // if mac
            // ...(isMac ? [{}] : []),
            // { role: "appMenu" }
            // ...(isMac
            //     ? [
            //         {
            //             label: appName,
            //             submenu: [
            //                 {
            //                     role: "about",
            //                     label: "About"
            //                 },
            //                 {
            //                     type: "separator"
            //                 },
            //                 {
            //                     role: "quit",
            //                     label: "Quit"
            //                 }
            //             ]
            //         }
            //     ]
            //     : []),
            // { role: "fileMenu" }
            {
                label: "File",
                submenu: [
                    {
                        label: 'Take photo',
                        click() {
                            openPhotoWindow();
                        }
                    },
                    {
                        type: 'separator'
                    },
                    ...(isMac
                        ? [{
                            role: "close",
                            accelerator: 'Command+Q',
                            label: "Quit"
                        }]
                        : [{
                            role: "quit",
                            accelerator: 'Ctrl+Q',
                            label: "Exit"
                        }]),
                ]
            },
            // { role: "viewMenu" }
            // {
            //     label: "View",
            //     submenu: [
            //         // {
            //         //     role: "reload",
            //         //     label: "Reload"
            //         // },
            //         // {
            //         //     role: "forcereload",
            //         //     label: "Force Reload"
            //         // },
            //         // {
            //         //     role: "toggledevtools",
            //         //     label: "Toggle Developer Tools"
            //         // },
            //         // {
            //         //     type: "separator"
            //         // },
            //         // {
            //         //     role: "resetzoom",
            //         //     label: "Reset Zoom"
            //         // },
            //         // {
            //         //     role: "zoomin",
            //         //     label: "Zoom In"
            //         // },
            //         // {
            //         //     role: "zoomout",
            //         //     label: "Zoom Out"
            //         // },
            //         // {
            //         //     type: "separator"
            //         // },
            //         // {
            //         //     role: "togglefullscreen",
            //         //     label: "Toggle Fullscreen"
            //         // }
            //     ]
            // },
            // { role: "windowMenu" }
            {
                label: "Window",
                submenu: [
                    {
                        role: "minimize",
                        label: "Minimize"
                    },
                    {
                        role: "togglefullscreen",
                        accelerator: process.platform == 'darwin' ? 'Command+F' : 'Ctrl+F',
                        label: "Toggle Fullscreen"
                    },
                    ...(isMac
                        ? [
                            {
                                type: "separator"
                            },
                            {
                                role: "front",
                                label: "Front"
                            },
                            {
                                type: "separator"
                            },
                            {
                                role: "window",
                                label: "Window"
                            }
                        ]
                        : [

                        ])
                ]
            },
            {
                role: "help",
                label: "Help",
                submenu: [
                    {
                        label: "Learn More",
                        click: async () => {
                            await shell.openExternal("https://electronjs.org");
                        }
                    }
                ]
            },
            // add devtools if we in dev mode
            ...(process.env.NODE_ENV !== 'production' ? [{
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
            }] : [])
        ];
    };

    return {
        buildMenu: () => {
            const menu = Menu.buildFromTemplate(getTemplate());
            Menu.setApplicationMenu(menu);
            return menu;
        }
    };
};

module.exports = MenuBuilder;
