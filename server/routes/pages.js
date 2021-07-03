import main from '~/server/collections/pages/s1/main'
import about from '~/server/collections/pages/s1/about'
import news from '~/server/collections/pages/s1/news'
import participation from '~/server/collections/pages/s1/participation'
import registration from '~/server/collections/pages/s1/registration'
import documents from '~/server/collections/pages/s1/documents'
import contacts from '~/server/collections/pages/s1/contacts'
// import participants from '~/server/collections/pages/s1/participants'
// import universities from '~/server/collections/pages/s1/universities'
import instructions from '~/server/collections/pages/s1/instructions'

import mainEn from '~/server/collections/pages/en/main'
import aboutEn from '~/server/collections/pages/en/about'
import newsEn from '~/server/collections/pages/en/news'
import participationEn from '~/server/collections/pages/en/participation'
import registrationEn from '~/server/collections/pages/en/registration'
import documentsEn from '~/server/collections/pages/en/documents'
import contactsEn from '~/server/collections/pages/en/contacts'
// import participantsEn from '~/server/collections/pages/en/participants'
// import universitiesEn from '~/server/collections/pages/en/universities'
import instructionsEn from '~/server/collections/pages/en/instructions'

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
    // participants,
    // universities,
    instructions,
  },
  en: {
    main: mainEn,
    about: aboutEn,
    news: newsEn,
    participation: participationEn,
    registration: registrationEn,
    documents: documentsEn,
    contacts: contactsEn,
    // participants: participantsEn,
    // universities: universitiesEn,
    instructions: instructionsEn,
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

  // Universities page
  pretender.get('/api/pages/universities', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(
        pages[request.requestHeaders['X-Bitrix-Site-Id']].universities
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

  // Participants page
  pretender.get('/api/pages/participants', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(
        pages[request.requestHeaders['X-Bitrix-Site-Id']].participants
      ),
    ]
  })

  // Instructions page
  pretender.get('/api/pages/instructions', (request) => {
    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(
        pages[request.requestHeaders['X-Bitrix-Site-Id']].instructions
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
