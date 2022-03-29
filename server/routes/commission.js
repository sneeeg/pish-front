import { getResponse } from '~/server/utils'
import member from '~/server/collections/member'

export default (pretender) => {
  pretender.get('/api/v0/priority/:type/:slug', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(member)]
  })
}
