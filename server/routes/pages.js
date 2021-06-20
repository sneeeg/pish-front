import main from '~/server/collections/pages/s1/main'
import about from '~/server/collections/pages/s1/about'
import news from '~/server/collections/pages/s1/news'
import participation from '~/server/collections/pages/s1/participation'
import registration from '~/server/collections/pages/s1/registration'
import documents from '~/server/collections/pages/s1/documents'
import contacts from '~/server/collections/pages/s1/contacts'

import mainEn from '~/server/collections/pages/en/main'
import aboutEn from '~/server/collections/pages/en/about'
import newsEn from '~/server/collections/pages/en/news'
import participationEn from '~/server/collections/pages/en/participation'
import registrationEn from '~/server/collections/pages/en/registration'
import documentsEn from '~/server/collections/pages/en/documents'
import contactsEn from '~/server/collections/pages/en/contacts'

import document from '~/server/collections/document'

import { getResponse } from '~/server/utils'

const pages = {
  s1: {
    main,
    about,
    news,
    participation,
    registration,
    documents,
    contacts,
  },
  en: {
    main: mainEn,
    about: aboutEn,
    news: newsEn,
    participation: participationEn,
    registration: registrationEn,
    documents: documentsEn,
    contacts: contactsEn,
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

  // Documents page
  pretender.get('/api/pages/documents', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(pages[request.requestHeaders['X-Bitrix-Site-Id']].documents),
    ]
  })

  // Contacts page
  pretender.get('/api/pages/contacts', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(pages[request.requestHeaders['X-Bitrix-Site-Id']].contacts),
    ]
  })

  // Document page
  pretender.get('/api/documents', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(document)]
  })
}
