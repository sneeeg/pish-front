import config from '~/assets/js/api/modules/config'

export default ($axios) => ({
  config: config($axios),
})
