export default (routeName) => {
  if (!routeName) return

  const str = routeName.split('_')[0]

  return str === 'index' ? 'main' : str
}
