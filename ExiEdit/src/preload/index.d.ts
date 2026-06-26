import { ElectronAPI } from '@electron-toolkit/preload'
import { Tags } from 'exiftool-vendored'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      /** Prompt user to select a folder */
      selectFolder: () => Promise<string | null>
      /** Scan folder for photos */
      scanPhotos: (dirPath: string) => Promise<string[]>
      /** Read EXIF tags from a photo file */
      readExif: (filePath: string) => Promise<Tags>
    }
  }
}
