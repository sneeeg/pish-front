import { getResponse } from '~/server/utils'
import analytics from '~/server/collections/analytics'
import indicators from '~/server/collections/analytics-indicators'
import organization from '~/server/collections/organization'

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
      getResponse(organization),
    ]
  })

  // Getting university indicators
  pretender.get('/api/v0/priority/asda/indicators', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(indicators),
    ]
  })
}
