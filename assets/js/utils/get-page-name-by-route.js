export default (routeName) => {
  const str = routeName.split('_')[0]

  return str === 'index' ? 'main' : str
}
