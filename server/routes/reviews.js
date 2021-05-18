import reviews from '~/server/collections/reviews'
import { getResponse } from '~/server/utils'

/**
 * Reviews routes
 */
export default (pretender) => {
  // Get reviews
  pretender.get('/api/reviews', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(reviews)]
  })
}
