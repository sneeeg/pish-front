import posts from '~/server/collections/posts'
import universityPosts from '~/server/collections/university-posts'
import postsCategories from '~/server/collections/posts-categories'
import docs from '~/server/collections/docs'
import docsCategories from '~/server/collections/docs-categories'

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

  // Get docs
  pretender.get('/api/docs', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse({
        posts: docs,
        categories: docsCategories,
        pagination: { current: 1, total: 1 },
      }),
    ]
  })

  // Get post by slug
  pretender.get('/api/posts/item', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(posts[0])]
  })

  // Get university posts
  pretender.get('/api/university', () => {
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
  pretender.get('/api/university/item', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(universityPosts[0]),
    ]
  })
}
