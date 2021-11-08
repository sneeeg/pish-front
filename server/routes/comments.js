import comments from '~/server/collections/comments'
import { getResponse } from '~/server/utils'

/**
 * Reviews routes
 */
export default (pretender) => {
  // Get reviews
  pretender.get('/api/comments', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse({
        posts: comments,
        categories: [],
        pagination: { current: 1, total: 5 },
      }),
    ]
  })

  // Get review by slug
  pretender.get('/api/comments/item', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(comments[0]),
    ]
  })
}
