import config from '~/assets/js/api/modules/config'
import pages from '~/assets/js/api/modules/pages'
import posts from '~/assets/js/api/modules/posts'
import reviews from '~/assets/js/api/modules/reviews'
import search from '~/assets/js/api/modules/search'
import registration from '~/assets/js/api/modules/registration'
import comments from '~/assets/js/api/modules/comments'
// import participants from '~/assets/js/api/modules/participants'
import instructions from '~/assets/js/api/modules/instructions'
import faq from '~/assets/js/api/modules/faq'

export default ($axios) => ({
  config: config($axios),
  pages: pages($axios),
  posts: posts($axios),
  reviews: reviews($axios),
  search: search($axios),
  registration: registration($axios),
  comments: comments($axios),
  // participants: participants($axios),
  instructions: instructions($axios),
  faq: faq($axios),
})
