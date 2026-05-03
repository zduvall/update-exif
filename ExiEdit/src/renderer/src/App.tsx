import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import DirPicker from './components/DirPicker'
import { useState } from 'react'
import { Page } from './constants'
import Photos from './components/Photos'

function App(): React.JSX.Element {
  const [page, setPage] = useState<Page>(Page.DirPicker)

  return (
    <MantineProvider>
      {page === Page.DirPicker && <DirPicker done={() => setPage(Page.Photos)} />}
      {page === Page.Photos && <Photos />}
    </MantineProvider>
  )
}

export default App
