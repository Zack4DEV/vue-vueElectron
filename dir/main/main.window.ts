import { join } from 'node:path'
import { BrowserWindow, app } from 'electron'

// Window Appearance
const isDev = !app.isPackaged
export async function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {

      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, './preload/index.ts'),
      devTools: isDev,
    },
  })

  win.Maximize()

if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
} else {
  win.loadFile(path.join(__dirname, `../render/index.php.html`));
}
  
  if (isDev)
    win.webContents.openDevTools()

  else
    win.removeMenu()

  win.on('closed', () => {
    win.destroy()
  })

  return win
}

export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined)
    window = await createWindow()

  if (window.isMinimized())
    window.restore()

  window.focus()
}
