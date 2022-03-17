import { getResponse } from '~/server/utils'
import commissionExpert from '~/server/collections/commission-expert'

export default (pretender) => {
  pretender.get('/api/commission/expert', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(commissionExpert),
    ]
  })
}
