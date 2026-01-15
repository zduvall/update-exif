import fs from 'fs'
import { ipcRenderer } from 'electron'
import Path from 'node:path'
import { PATH_DELIMITER as PD } from './constants'

// ================================= fs utils ==================================

// // currently not used, but might be useful in the future
// function getSubDirs(parentDir: string) {
//   // return all directories in parentDir
//   return fs
//     .readdirSync(parentDir, { withFileTypes: true })
//     .filter((dirent) => dirent.isDirectory())
//     .map((dirent) => dirent.name);
// }

function makeDirIfNew(path: string) {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path)
    return true
  } catch (err) {
    alert(`Unable to make a folder with path "${path}"`)
    return false
  }
}

function getImgPaths(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((name) =>
      // TODO: any other file types?
      ['.jpg', '.gif', '.png', 'apng', 'avif', 'webp'].some((char) => name.endsWith(char))
    )
    .map((fileName) => Path.join(dir, fileName))
}

/**
 * Checks if a file already exists at `path` and alerts the user if it does.
 *
 * @param path the path to check if a file already exists
 * @returns `true` if a file already exists at `path`, otherwise `false`
 */
const pathExistsAlert = (path: string) => {
  if (!fs.existsSync(path)) return false

  const pathObj = Path.parse(path)
  alert(`A file called "${pathObj.base}" already exists in "${pathObj.dir}"`)
  return true
}

/**
 * Moves a file from `oldPath` to `newPath`.
 *
 * If `newPath` already exists or the file cannot be moved due to another error,
 * an alert will be shown, the file will not be moved, and `false` is returned.
 *
 * @param oldPath path to the file to be moved
 * @param newPath path to the destination
 * @returns `true` if the file was moved successfully, otherwise `false`
 */
function moveFile(oldPath: string, newPath: string) {
  if (pathExistsAlert(newPath)) return false
  try {
    fs.renameSync(oldPath, newPath)
    return true
  } catch (err) {
    alert(`Unable to move from "${oldPath}" to "${newPath}"`)
    return false
  }
}

/**
 * Copies a file from `oldPath` to `newPath`.
 *
 * If `newPath` already exists or the file cannot be copied due to another error,
 * an alert will be shown, the file will not be copied, and `false` is returned.
 *
 * @param oldPath path to the file to be copied
 * @param newPath path to the destination
 * @returns `true` if the file was copied successfully, otherwise `false`
 */
function copyFile(oldPath: string, newPath: string) {
  if (pathExistsAlert(newPath)) return false
  try {
    fs.copyFileSync(oldPath, newPath)
    return true
  } catch (err) {
    alert(`Unable to copy from "${oldPath}" to "${newPath}"`)
    return false
  }
}

function deleteFile(path: string) {
  if (!fs.existsSync(path)) alert(`File "${path}" does not exist`)
  try {
    fs.unlinkSync(path)
    return true
  } catch (err) {
    alert(`Unable to delete file "${path}"`)
    return false
  }
}

function isDir(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
}

// ================================ path utils =================================
/**
 * If `targetDir` starts with "./", then it is relative to `srcDir`, so combine the
 * two and return the result. If `targetDir` does not start with "./", then treat
 * it as an absolute path, and return as is.
 *
 * @param srcDir - the directory to resolve `targetDir` relative to
 * @param targetDir - the directory to resolve
 * @returns the resolved directory
 */
function resolveDir(srcDir: string, targetDir: string) {
  if (targetDir.startsWith(`.${PD}`)) return `${srcDir}${targetDir.slice(1)}`
  return targetDir
}

// ================================= ipc utils =================================
function getStoreVal(key: string) {
  return ipcRenderer.sendSync('get-store-val', key)
}
function setStoreVal(key: string, val: any) {
  return ipcRenderer.sendSync('set-store-val', key, val)
}
function resetStore() {
  return ipcRenderer.sendSync('reset-store')
}

export {
  // getSubDirs,
  makeDirIfNew,
  getImgPaths,
  moveFile,
  copyFile,
  deleteFile,
  isDir,
  resolveDir,
  getStoreVal,
  setStoreVal,
  resetStore
}
