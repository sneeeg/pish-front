import cloneDeep from 'lodash-es/cloneDeep'
import uniqueId from 'lodash-es/uniqueId'
import { getResponse } from '~/server/utils'
import member from '~/server/collections/member'

export default (pretender) => {
  pretender.get('/api/v0/priority/:type/:slug', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(member)]
  })

  pretender.get('/api/v0/priority/expert/list', () => {
    const result = []

    for (let i = 0; i < 12; i++) {
      const item = cloneDeep(member)
      item.slug = uniqueId()

      result.push(item)
    }

    return [200, { 'Content-Type': 'application/json' }, getResponse(result)]
  })
}
