import { Button, Group, Text, Code, Flex } from '@mantine/core'
import useSelectedDirectory from '@renderer/hooks/useSelectedDirectory'

interface IProps {
  done: () => void
}

const DirPicker = ({ done }: IProps): React.JSX.Element => {
  const [dir, setDir, resetDir] = useSelectedDirectory()

  const handleSelect = async (): Promise<void> => {
    // window.api is defined in preload script and exposed to the renderer process
    const selectedPath = await window.api.selectFolder()
    if (!selectedPath) return
    setDir(selectedPath)
  }

  return (
    <Flex justify="center" align="center" direction="column" style={{ height: '100vh' }} gap={'sm'}>
      <Group justify="center">
        <Button onClick={handleSelect}>Select Directory</Button>
      </Group>

      {dir && (
        <>
          <Code block style={{ textAlign: 'center' }}>
            {dir}
          </Code>
          <Group justify="center">
            <Button variant="outline" color="red" disabled={!dir} onClick={resetDir}>
              Reset
            </Button>
            <Button onClick={done}>Continue</Button>
          </Group>
        </>
      )}
    </Flex>
  )
}

export default DirPicker
