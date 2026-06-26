import { useEffect, useState } from 'react'
import useSelectedDirectory from '@renderer/hooks/useSelectedDirectory'
import { SimpleGrid, Text, Box, Container, Button, Group } from '@mantine/core'
import { useStore } from '../../store'
import { Page } from '../../constants'
import Header from './Header'
import Image from './Image'

/**
 * This component displays the photos in the selected directory `dir`.
 * The photos are displayed in a grid with a configurable number of columns.
 */
const Photos = () => {
  const [dir] = useSelectedDirectory()
  const [photos, setPhotos] = useState<string[]>([])
  const [columns, setColumns] = useState<number>(4)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const setPage = useStore((state) => state.setPage)

  useEffect(() => {
    if (dir) {
      window.api.scanPhotos(dir).then(setPhotos)
    }
  }, [dir])

  if (!dir) {
    return (
      <Container size="xl" py="xl">
        <Text ta="center">No directory selected.</Text>
        <Group justify="center" mt="md">
          <Button onClick={() => setPage(Page.DirPicker)}>Go Back</Button>
        </Group>
      </Container>
    )
  }

  return (
    <Box>
      <Header
        dir={dir}
        columns={columns}
        setColumns={setColumns}
        onBack={() => setPage(Page.DirPicker)}
      />

      <Container size="xl" py="md">
        <SimpleGrid cols={columns} spacing="md">
          {photos.map((photo) => (
            <Image
              key={photo}
              photo={photo}
              onClick={() => setSelectedPhoto(photo)}
              isSelected={selectedPhoto === photo}
            />
          ))}
        </SimpleGrid>

        {photos.length === 0 && (
          <Text c="dimmed" ta="center" py="xl">
            No photos found in this directory.
          </Text>
        )}
      </Container>
    </Box>
  )
}

export default Photos
