import config from '~/server/config/index'
import { getResponse } from '~/server/utils'

/**
 * Base routes
 */
export default (pretender) => {
  // Config
  pretender.get('/api/config', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(config)]
  })
}
