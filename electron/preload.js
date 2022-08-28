const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getImage: (callback) => ipcRenderer.on('get-image', callback)
});