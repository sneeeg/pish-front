import { getResponse } from '~/server/utils'
import analytics from '~/server/collections/analytics'
import university from '~/server/collections/university'

/**
 * Analytics routes
 */
export default (pretender) => {
  // Getting data
  pretender.get('/api/analytics', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(analytics)]
  })

  // Getting university
  pretender.get('/api/organization', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(university),
    ]
  })
}
