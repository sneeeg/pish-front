import { PAGES } from '~/assets/js/constants'

export default ($axios) =>
  PAGES.reduce((acc, item) => {
    item === 'new'
      ? (acc[item] = () => $axios.$get(`/api/v2/pages/${item}`))
      : (acc[item] = () => $axios.$get(`/api/pages/${item}`))

    return acc
  }, {})
