import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <MantineProvider>
      <div>
        <button onClick={ipcHandle}>Send Ping</button>
      </div>
    </MantineProvider>
  )
}

export default App
