import { homedir } from 'os'

enum Pages {
  DirPicker = 'dir-picker'
}

const HOME_DIR = homedir()
// const DESKTOP_DIR = `${HOME_DIR}/Desktop`;
const CSS_FILE_PREFIX = 'file://'

/**
 * A collection of booleans indicating the current OS.
 */
const OS = {
  isMac: process.platform === 'darwin',
  isWindows: process.platform === 'win32'
  // isLinux: process.platform === 'linux',
}

/**
 * The path delimiter for the current OS.
 *
 * NOTE: duplicated in store.ts, keep in sync
 */
const PATH_DELIMITER = OS.isWindows ? '\\' : '/'

export { HOME_DIR, CSS_FILE_PREFIX, OS, PATH_DELIMITER, Pages }
