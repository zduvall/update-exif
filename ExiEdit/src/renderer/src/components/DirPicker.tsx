import { Button, Group, Text, Code, Flex } from '@mantine/core'
import useSelectedDirectory from '@renderer/hooks/useSelectedDirectory'

const DirPicker = (): React.JSX.Element => {
  const [dir, setDir, resetDir] = useSelectedDirectory()

  const handleSelect = async (): Promise<void> => {
    // window.api is defined in preload script and exposed to the renderer process
    const selectedPath = await window.api.selectFolder()
    if (!selectedPath) return
    setDir(selectedPath)
  }

  return (
    <Flex justify="center" align="center" direction="column" style={{ height: '100vh' }}>
      <Group justify="center">
        <Button onClick={handleSelect}>Select Directory</Button>

        <Button variant="outline" color="red" disabled={!dir} onClick={resetDir}>
          Reset
        </Button>
      </Group>

      {dir && (
        <div style={{ marginTop: '1rem' }}>
          <Text size="xs" c="dimmed" ta="center" mb={5}>
            Selected Path:
          </Text>
          <Code block style={{ textAlign: 'center' }}>
            {dir}
          </Code>
        </div>
      )}
    </Flex>
  )
}

export default DirPicker
