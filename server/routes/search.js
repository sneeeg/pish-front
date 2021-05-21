import searchResults from '~/server/collections/search-results'
import { getResponse } from '~/server/utils'

/**
 * Search routes
 */
export default (pretender) => {
  // Get search results
  pretender.get('/api/search', () => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(searchResults),
    ]
  })
}
