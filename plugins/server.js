export default () => {
  if (process.env.NODE_ENV === 'development') {
    require('~/server')
  }
}
