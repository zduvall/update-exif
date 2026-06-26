import { Image as MantineImage } from '@mantine/core'

interface IProps {
  photo: string
  onClick: () => void
  isSelected: boolean
}

const Image = ({ photo, onClick, isSelected }: IProps) => {
  return (
    <MantineImage
      key={photo}
      src={`media://${photo}`}
      alt={photo}
      radius="md"
      fallbackSrc="https://placehold.co/600x400?text=Error"
      onClick={onClick}
      style={style(isSelected)}
    />
  )
}

export default Image

const style = (isSelected: boolean) => ({
  border: isSelected ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent'
})
