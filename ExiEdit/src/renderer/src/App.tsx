import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import DirPicker from './components/DirPicker'
import { Page } from './constants'
import Photos from './components/Photos'
import { useStore } from './store'

function App(): React.JSX.Element {
  const { page, setPage } = useStore()

  return (
    <MantineProvider>
      {page === Page.DirPicker && <DirPicker done={() => setPage(Page.Photos)} />}
      {page === Page.Photos && <Photos />}
    </MantineProvider>
  )
}

export default App

// FIXME
// I added in all the fs utils
//
// [x] Need to make a directory picker
// [ ] Need to read all photos in the directory and display them in a grid
// [ ] Need to add in this package: "exiftool-vendored": "^34.3.0"
// [ ] Need to add in the ability to edit the exif data of the photos
// [ ] Need to add in the ability to save the edited exif data back to the photos
