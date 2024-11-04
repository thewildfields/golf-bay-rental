// electron/main.mjs
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Can be `preload.mjs` if using ES modules here too
            contextIsolation: true,
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:5173/kiosk' // Vite's default dev server port
            : `file://${path.join(__dirname, '../dist/index.html')}`
    );
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});