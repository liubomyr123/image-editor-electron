const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendImage: (dataURL) => ipcRenderer.send('set-image', dataURL)
});