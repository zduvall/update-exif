import { Slider, Text, Box, Container, Button, Group, Paper, Code } from '@mantine/core'

interface IProps {
  dir: string
  columns: number
  setColumns: (value: number) => void
  onBack: () => void
}

const Header = ({ dir, columns, setColumns, onBack }: IProps) => {
  return (
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
      {/* Thinking about moving header into seperate component */}
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Group>
            <Button variant="subtle" onClick={onBack}>
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
  )
}

export default Header
