import { getResponse } from '~/server/utils'
import faqCategories from '~/server/collections/faq-categories'

/**
 * FAQ routes
 */
export default (pretender) => {
  // Form
  pretender.post('/api/sendQuestion', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(null)]
  })

  //
  pretender.get('/api/faq', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse({
        posts: [],
        categories: faqCategories,
        pagination: { current: 1, total: 1 },
      }),
    ]
  })
}
