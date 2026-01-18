import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import DirPicker from './components/DirPicker'

function App(): React.JSX.Element {
  return (
    <MantineProvider>
      <DirPicker />
    </MantineProvider>
  )
}

export default App
