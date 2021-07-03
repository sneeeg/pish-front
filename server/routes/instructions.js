import instructions from '~/server/collections/instructions'

import { getResponse } from '~/server/utils'

/**
 * Instructions routes
 */
export default (pretender) => {
  // Get docs
  pretender.get('/api/instructions', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse({
        posts: instructions,
        categories: [],
        pagination: { current: 1, total: 1 },
      }),
    ]
  })
}
