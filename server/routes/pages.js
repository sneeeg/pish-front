import main from '~/server/collections/pages/main'
import about from '~/server/collections/pages/about'
import news from '~/server/collections/pages/news'
import participation from '~/server/collections/pages/participation'

import { getResponse } from '~/server/utils'

/**
 * Pages routes
 */
export default (pretender) => {
  // Main page
  pretender.get('/api/pages/main', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(main)]
  })

  // About page
  pretender.get('/api/pages/about', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(about)]
  })

  // News page
  pretender.get('/api/pages/news', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(news)]
  })

  // Participation page
  pretender.get('/api/pages/participation', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(participation),
    ]
  })
}
