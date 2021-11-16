import { getResponse } from '~/server/utils'

export default (pretender) => {
  /**
   * Sending feedback form
   */
  pretender.post('/api/feedback', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(null)]
  })
}
