import { Image as MantineImage } from '@mantine/core'

const Image = ({ photo }: { photo: string }) => {
  return (
    <MantineImage
      key={photo}
      src={`media://${photo}`}
      alt={photo}
      radius="md"
      fallbackSrc="https://placehold.co/600x400?text=Error"
    />
  )
}

export default Image
