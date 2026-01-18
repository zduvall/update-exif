import { useLocalStorage } from '@mantine/hooks'

/**
 * React hook for persisting the selected directory path in local storage.
 * @returns [directory, setDirectory, resetDirectory]
 */
const useSelectedDirectory = () => {
  const [dir, setDir, resetDir] = useLocalStorage<string | null>({
    key: 'dir',
    defaultValue: null
  })

  return [dir, setDir, resetDir] as const
}

export default useSelectedDirectory
