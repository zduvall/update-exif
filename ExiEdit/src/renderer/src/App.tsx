import '@mantine/core/styles.css'
import { MantineProvider, Button, Flex } from '@mantine/core'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <MantineProvider>
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Button onClick={ipcHandle}>Send Ping</Button>
      </Flex>
    </MantineProvider>
  )
}

export default App
