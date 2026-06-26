import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
// NOTE: in react, I could do something like this:
// - `window.electron.ipcRenderer.send('dialog:openDirectory')`
// But the api object allows me to use things like `window.api.selectFolder()`
// instead, so the custom api is more abstracted.
const api = {
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  scanPhotos: (dirPath: string) => ipcRenderer.invoke('scan-photos', dirPath),
  readExif: (filePath: string) => ipcRenderer.invoke('read-exif', filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
