import '@mantine/core/styles.css'
import { MantineProvider, Button } from '@mantine/core'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <MantineProvider>
      <div>
        <Button onClick={ipcHandle}>Send Ping</Button>
      </div>
    </MantineProvider>
  )
}

export default App
