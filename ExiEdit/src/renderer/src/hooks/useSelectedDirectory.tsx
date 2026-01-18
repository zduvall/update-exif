import { useLocalStorage } from '@mantine/hooks'

/**
 * React hook for persisting the selected directory path in local storage.
 * @returns [directory, setDirectory, removeDirectory]
 */
const useSelectedDirectory = () => {
  const [dir, setDir, removeDir] = useLocalStorage<string>({
    key: 'dir',
    defaultValue: ''
  })

  return [dir, setDir, removeDir] as const
}

export default useSelectedDirectory
