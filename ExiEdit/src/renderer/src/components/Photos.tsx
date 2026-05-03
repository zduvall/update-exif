import { useEffect, useState } from 'react'
import useSelectedDirectory from '@renderer/hooks/useSelectedDirectory'
import {
  SimpleGrid,
  Image,
  Slider,
  Text,
  Box,
  Container,
  Button,
  Group,
  Paper,
  Code
} from '@mantine/core'
import { useStore } from '../store'
import { Page } from '../constants'

/**
 * This component displays the photos in the selected directory `dir`.
 * The photos are displayed in a grid with a configurable number of columns.
 */
const Photos = () => {
  const [dir] = useSelectedDirectory()
  const [photos, setPhotos] = useState<string[]>([])
  const [columns, setColumns] = useState<number>(4)
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
      <Paper
        shadow="xs"
        p="md"
        withBorder
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'var(--mantine-color-body)'
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            <Group>
              <Button variant="subtle" onClick={() => setPage(Page.DirPicker)}>
                ← Back
              </Button>
              <Box>
                <Text size="xs" c="dimmed" fw={500} lts={1} tt="uppercase">
                  Directory
                </Text>
                <Code color="blue.1" c="blue.9">
                  {dir}
                </Code>
              </Box>
            </Group>

            <Box w={250}>
              <Text size="xs" mb={5} fw={500}>
                Grid Columns: {columns}
              </Text>
              <Slider
                min={1}
                max={10}
                step={1}
                value={columns}
                onChange={setColumns}
                label={(value) => `${value} cols`}
              />
            </Box>
          </Group>
        </Container>
      </Paper>

      <Container size="xl" py="md">
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
      </Container>
    </Box>
  )
}

export default Photos
