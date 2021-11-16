export default (fileName) => {
  const split = fileName.split('.')

  if (!split.length || split.length < 2) return

  return split.pop()
}
