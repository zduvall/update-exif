import useSelectedDirectory from '@renderer/hooks/useSelectedDirectory'

/** */
const Photos = () => {
  const [dir] = useSelectedDirectory()

  return <div>{dir}</div>
}

export default Photos
