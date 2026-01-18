import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import DirPicker from './components/DirPicker'
import { useState } from 'react'
import { Pages } from './constants'

function App(): React.JSX.Element {
  const [page, setPage] = useState<Pages>(Pages.DirPicker)

  return (
    <MantineProvider>
      {page === Pages.DirPicker && <DirPicker done={() => setPage(Pages.Photos)} />}
      {page === Pages.Photos && <div>Photos</div>}
    </MantineProvider>
  )
}

export default App
