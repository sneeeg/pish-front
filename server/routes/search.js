import search from '~/server/collections/search'
import { getResponse } from '~/server/utils'

export default (pretender) => {
  pretender.post('/api/search', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(search)]
  })
}
