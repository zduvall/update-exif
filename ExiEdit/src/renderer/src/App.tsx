import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import DirPicker from './components/DirPicker'
import { useState } from 'react'
import { Pages } from './constants'

function App(): React.JSX.Element {
  return (
    <MantineProvider>
      <DirPicker />
    </MantineProvider>
  )
}

export default App
