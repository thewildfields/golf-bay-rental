// electron/preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    // Define functions to expose
});