import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      /** Prompt user to select a folder */
      selectFolder: () => Promise<string | null>
    }
  }
}
