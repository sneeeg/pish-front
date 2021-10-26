import { getResponse } from '~/server/utils'
import analytics from '~/server/collections/analytics'

/**
 * Analytics routes
 */
export default (pretender) => {
  // Getting data
  pretender.get('/api/analytics', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(analytics)]
  })
}
