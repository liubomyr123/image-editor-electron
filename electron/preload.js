const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getImage: (callback) => ipcRenderer.on('get-image', callback),
    getZoom: (callback) => ipcRenderer.on('get-zoom', callback),
    setZoom: (deltaY) => ipcRenderer.send('set-zoom', deltaY)
});