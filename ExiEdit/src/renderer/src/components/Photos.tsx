import { useEffect, useState } from 'react'
import useSelectedDirectory from '@renderer/hooks/useSelectedDirectory'
import { SimpleGrid, Image, Slider, Stack, Text, Box, Container } from '@mantine/core'

/**
 * This component displays the photos in the selected directory `dir`.
 * The photos are displayed in a grid with a configurable number of columns.
 */
const Photos = () => {
  const [dir] = useSelectedDirectory()
  const [photos, setPhotos] = useState<string[]>([])
  const [columns, setColumns] = useState<number>(4)

  useEffect(() => {
    if (dir) {
      window.api.scanPhotos(dir).then(setPhotos)
    }
  }, [dir])

  if (!dir) {
    return (
      <Container size="xl" py="xl">
        <Text ta="center">No directory selected.</Text>
      </Container>
    )
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="md">
        <Box maw={400}>
          <Text size="sm" mb="xs" fw={500}>
            Columns: {columns}
          </Text>
          <Slider
            min={1}
            max={10}
            step={1}
            value={columns}
            onChange={setColumns}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' }
            ]}
            mb="xl"
          />
        </Box>

        <SimpleGrid cols={columns} spacing="md">
          {photos.map((photo) => (
            <Image
              key={photo}
              src={`media://${photo}`}
              alt={photo}
              radius="md"
              fallbackSrc="https://placehold.co/600x400?text=Error"
            />
          ))}
        </SimpleGrid>

        {photos.length === 0 && (
          <Text c="dimmed" ta="center" py="xl">
            No photos found in this directory.
          </Text>
        )}
      </Stack>
    </Container>
  )
}

export default Photos
