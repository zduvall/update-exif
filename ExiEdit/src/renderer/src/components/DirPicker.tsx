import { useState } from 'react'
import { Button, Group, Text, Paper, Code } from '@mantine/core'

const DirPicker = (): React.JSX.Element => {
  const [path, setPath] = useState<string | null>(null)

  const handleSelect = async (): Promise<void> => {
    // We use window.api because that is where we attached selectFolder
    const selectedPath = await window.api.selectFolder()
    if (selectedPath) {
      setPath(selectedPath)
    }
  }

  return (
    <Paper p="md">
      <Group justify="center">
        <Button onClick={handleSelect}>Select Directory</Button>

        <Button variant="outline" color="red" disabled={!path} onClick={() => setPath(null)}>
          Reset
        </Button>
      </Group>

      {path && (
        <div style={{ marginTop: '1rem' }}>
          <Text size="xs" c="dimmed" ta="center" mb={5}>
            Selected Path:
          </Text>
          <Code block style={{ textAlign: 'center' }}>
            {path}
          </Code>
        </div>
      )}
    </Paper>
  )
}

export default DirPicker
