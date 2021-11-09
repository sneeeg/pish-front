import { getResponse } from '~/server/utils'
import document from '~/server/collections/document'

export default (pretender) => {
  pretender.get('/api/documents', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(document)]
  })
}
