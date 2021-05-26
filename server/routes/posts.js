import posts from '~/server/collections/posts'
import universityPosts from '~/server/collections/university-posts'
import postsCategories from '~/server/collections/posts-categories'

import { getResponse } from '~/server/utils'

/**
 * Posts routes
 */
export default (pretender) => {
  // Get posts
  pretender.get('/api/posts', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse({
        posts,
        categories: postsCategories,
        pagination: { current: 1, total: 5 },
      }),
    ]
  })

  // Get post by slug
  pretender.get('/api/posts/item', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(posts[0])]
  })

  // Get university posts
  pretender.get('/api/posts/university', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse({
        posts: universityPosts,
        categories: [],
        pagination: { current: 1, total: 5 },
      }),
    ]
  })

  // Get university post by slug
  pretender.get('/api/posts/university/item', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(universityPosts[0]),
    ]
  })
}
