import { PAGES } from '~/assets/js/constants'

export default ($axios) =>
  PAGES.reduce((acc, item) => {
    acc[item] = () => $axios.$get(`/api/v2/pages/${item}`)

    return acc
  }, {})
