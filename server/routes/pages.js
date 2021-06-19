import main from '~/server/collections/pages/s1/main'
import about from '~/server/collections/pages/s1/about'
import news from '~/server/collections/pages/s1/news'
import participation from '~/server/collections/pages/s1/participation'
import registration from '~/server/collections/pages/s1/registration'

import mainEn from '~/server/collections/pages/en/main'
import aboutEn from '~/server/collections/pages/en/about'
import newsEn from '~/server/collections/pages/en/news'
import participationEn from '~/server/collections/pages/en/participation'
import registrationEn from '~/server/collections/pages/en/registration'

import document from '~/server/collections/document'

import { getResponse } from '~/server/utils'

const pages = {
  s1: {
    main,
    about,
    news,
    participation,
    registration,
  },
  en: {
    main: mainEn,
    about: aboutEn,
    news: newsEn,
    participation: participationEn,
    registration: registrationEn,
  },
}

/**
 * Pages routes
 */
export default (pretender) => {
  // Main page
  pretender.get('/api/pages/main', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(pages[request.requestHeaders['X-Bitrix-Site-Id']].main),
    ]
  })

  // About page
  pretender.get('/api/pages/about', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(pages[request.requestHeaders['X-Bitrix-Site-Id']].about),
    ]
  })

  // News page
  pretender.get('/api/pages/news', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(pages[request.requestHeaders['X-Bitrix-Site-Id']].news),
    ]
  })

  // Participation page
  pretender.get('/api/pages/participation', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(
        pages[request.requestHeaders['X-Bitrix-Site-Id']].participation
      ),
    ]
  })

  // Registration page
  pretender.get('/api/pages/registration', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(
        pages[request.requestHeaders['X-Bitrix-Site-Id']].registration
      ),
    ]
  })

  // Document page
  pretender.get('/api/documents', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(document)]
  })
}
