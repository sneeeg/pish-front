import config from '~/assets/js/api/modules/config'
import pages from '~/assets/js/api/modules/pages'
import posts from '~/assets/js/api/modules/posts'
import reviews from '~/assets/js/api/modules/reviews'

export default ($axios) => ({
  config: config($axios),
  pages: pages($axios),
  posts: posts($axios),
  reviews: reviews($axios),
})
